/* ==========================================================================
   DATAQUEST MAIN APPLICATION CONTROLLER
   - 16:9 Proportional Viewport Engine (Zero Vertical Scroll)
   - Auto-Save Progress (localStorage)
   - Gamification (XP, Levels, Badges, Toast Celebrations)
   ========================================================================== */

(function () {
  const STORAGE_KEY = 'dataquest_adventure_save_v1';

  function getDefaultState() {
    return {
      currentScene: 1,
      highestUnlocked: 1,
      completedScenes: [],
      playerName: '',
      avatarId: 'av1',
      playerRole: DQData.ROLES[0],
      xp: 0,
      badges: [],
      wrongAttempts: {},
      teacherUnlockAll: false,
      dismissPortraitOnce: false,
      audioPrefs: {
        bgmEnabled: true,
        sfxEnabled: true,
        voiceEnabled: true,
        bgmVolume: 0.25,
        sfxVolume: 0.65
      }
    };
  }

  const App = {
    state: getDefaultState(),

    init() {
      this.loadState();
      DQAudio.loadPrefs(this.state.audioPrefs);

      this.bindShellEvents();
      this.updateViewportScale();
      window.addEventListener('resize', () => this.updateViewportScale());
      window.addEventListener('orientationchange', () => setTimeout(() => this.updateViewportScale(), 120));

      const params = new URLSearchParams(window.location.search);
      const qScene = Number(params.get('scene'));
      const initialScene = (qScene >= 1 && qScene <= 15) ? qScene : (this.state.currentScene || 1);
      this.goToScene(initialScene, false);
    },

    /* ---------------- 16:9 ZERO-SCROLL PROPORTIONAL SCALER ---------------- */
    updateViewportScale() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const targetW = 1920;
      const targetH = 1080;

      const scaleX = (vw - 12) / targetW;
      const scaleY = (vh - 12) / targetH;
      const scale = Math.max(0.22, Math.min(scaleX, scaleY));
      document.documentElement.style.setProperty('--stage-scale', scale.toFixed(4));

      // Portrait check for phones/tablets (height noticeably taller than width)
      const portraitEl = document.getElementById('portrait-overlay');
      if (portraitEl) {
        const isPortrait = vh > vw * 1.06 && !this.state.dismissPortraitOnce;
        portraitEl.classList.toggle('visible', isPortrait);
      }
    },

    /* ---------------- PERSISTENCE (AUTO-SAVE) ---------------- */
    loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          this.state = Object.assign(getDefaultState(), parsed);
        }
      } catch (e) {
        this.state = getDefaultState();
      }
    },

    saveState() {
      try {
        this.state.audioPrefs = DQAudio.getPrefs();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {}
    },

    resetAllProgress() {
      DQAudio.stopSpeech();
      localStorage.removeItem(STORAGE_KEY);
      this.state = getDefaultState();
      this.goToScene(1, true);
    },

    /* ---------------- HELPERS & GAMIFICATION ---------------- */
    escapeHtml(str) {
      return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    },

    getCurrentAvatar() {
      return DQData.AVATARS.find(a => a.id === this.state.avatarId) || DQData.AVATARS[0];
    },

    getCurrentSceneObj() {
      return DQData.SCENES.find(s => s.id === this.state.currentScene) || DQData.SCENES[0];
    },

    getLevelInfo() {
      const xp = this.state.xp || 0;
      const thresholds = [
        { level: 1, min: 0, max: 200, title: 'Intern Designer' },
        { level: 2, min: 200, max: 550, title: 'Junior Designer' },
        { level: 3, min: 550, max: 1000, title: 'Associate Designer' },
        { level: 4, min: 1000, max: 1600, title: 'Schema Engineer' },
        { level: 5, min: 1600, max: 2300, title: 'ERD Specialist' },
        { level: 6, min: 2300, max: 3000, title: 'Senior SQL Engineer' },
        { level: 7, min: 3000, max: 3700, title: 'Lead Data Architect' },
        { level: 8, min: 3700, max: 4500, title: 'Master Database Designer' }
      ];
      let cur = thresholds[0];
      for (const t of thresholds) {
        if (xp >= t.min) cur = t;
      }
      const span = Math.max(1, cur.max - cur.min);
      const pct = Math.min(100, Math.round(((xp - cur.min) / span) * 100));
      return { ...cur, pct };
    },

    recordWrongAttempt(sceneId) {
      this.state.wrongAttempts[sceneId] = (this.state.wrongAttempts[sceneId] || 0) + 1;
      this.saveState();
    },

    showToast(text, icon = '✨') {
      const wrap = document.getElementById('toast-container');
      if (!wrap) return;
      const el = document.createElement('div');
      el.className = 'xp-toast';
      el.innerHTML = `<span style="font-size:24px;">${icon}</span><span>${this.escapeHtml(text)}</span>`;
      wrap.appendChild(el);
      setTimeout(() => el.remove(), 2900);
    },

    unlockBadge(badgeId) {
      if (!this.state.badges.includes(badgeId)) {
        this.state.badges.push(badgeId);
        const b = DQData.BADGES.find(x => x.id === badgeId);
        if (b) {
          this.showToast(`Badge Baru: ${b.title}!`, b.icon);
        }
        this.saveState();
      }
    },

    completeScene(sceneId, playChime = true) {
      const sc = DQData.SCENES.find(s => s.id === sceneId);
      const firstTime = !this.state.completedScenes.includes(sceneId);
      if (firstTime) {
        this.state.completedScenes.push(sceneId);
        if (sc && sc.xpReward > 0) {
          this.state.xp += sc.xpReward;
          this.showToast(`+${sc.xpReward} XP • Misi ${sc.code} Selesai!`, '⭐');
        }
        if (playChime) DQAudio.playSuccess();
      }
      if (sceneId + 1 <= 15 && this.state.highestUnlocked < sceneId + 1) {
        this.state.highestUnlocked = sceneId + 1;
      }
      this.saveState();
      this.updateHUD();
    },

    /* ---------------- SCENE NAVIGATION & RENDERING ---------------- */
    goToScene(sceneId, speakNarration = true) {
      const target = Math.max(1, Math.min(15, Number(sceneId) || 1));
      this.state.currentScene = target;
      if (target > this.state.highestUnlocked) {
        this.state.highestUnlocked = target;
      }
      this.saveState();

      const sc = this.getCurrentSceneObj();
      const bgLayer = document.getElementById('stage-bg-layer');
      if (bgLayer && sc.bg) {
        bgLayer.style.backgroundImage = `url('${sc.bg}')`;
        bgLayer.style.opacity = target === 1 ? '0.52' : target === 15 ? '0.45' : '0.28';
      }

      const root = document.getElementById('scene-root');
      const footer = document.getElementById('game-footer');

      // Scene 01 uses full workspace height cleanly; Scenes 02-15 show consistent footer
      if (target === 1) {
        root.classList.add('full-bleed');
        footer.style.display = 'none';
      } else {
        root.classList.remove('full-bleed');
        footer.style.display = 'flex';
      }

      this.updateHUD();

      const renderFnName = `renderScene${target}`;
      if (DQScenes1to8[renderFnName]) {
        DQScenes1to8[renderFnName](root, this);
      } else if (DQScenes9to15[renderFnName]) {
        DQScenes9to15[renderFnName](root, this);
      }

      if (speakNarration) {
        DQAudio.speak(sc.narration, false);
      }
    },

    updateHUD() {
      const sc = this.getCurrentSceneObj();
      const lvl = this.getLevelInfo();
      const st = this.state;

      document.getElementById('hud-scene-code').textContent = sc.code;
      document.getElementById('hud-scene-title').textContent = sc.title;
      document.getElementById('hud-principle').textContent = `Prinsip: ${sc.principle}`;
      document.getElementById('hud-level-text').textContent = `Level ${lvl.level}`;
      document.getElementById('hud-xp-text').textContent = `${st.xp} XP`;
      document.getElementById('hud-xp-fill').style.width = `${lvl.pct}%`;

      const instrEl = document.getElementById('footer-instruction-text');
      if (instrEl) instrEl.textContent = sc.instruction;

      const prevBtn = document.getElementById('btn-footer-prev');
      const nextBtn = document.getElementById('btn-footer-next');

      if (prevBtn) {
        prevBtn.disabled = sc.id <= 1;
      }
      if (nextBtn) {
        const canProceed = st.completedScenes.includes(sc.id) || st.teacherUnlockAll || sc.id === 14;
        nextBtn.disabled = sc.id >= 15 || !canProceed;
        nextBtn.innerHTML = sc.id >= 15
          ? 'Selesai ✓'
          : canProceed
            ? `Lanjutkan (Scene ${String(sc.id + 1).padStart(2, '0')}) →`
            : 'Selesaikan Misi Ini 🔒';
      }
    },

    bindShellEvents() {
      document.getElementById('brand-home-btn').onclick = () => {
        DQAudio.playClick();
        this.goToScene(1);
      };

      document.getElementById('btn-narration').onclick = () => {
        DQAudio.init();
        DQAudio.startBgm();
        const sc = this.getCurrentSceneObj();
        DQAudio.speak(sc.narration, true);
      };

      document.getElementById('btn-hud-map').onclick = () => {
        DQAudio.playClick();
        DQModals.openMap(this);
      };

      document.getElementById('btn-hud-profile').onclick = () => {
        DQAudio.playClick();
        DQModals.openProfile(this);
      };

      document.getElementById('btn-hud-audio').onclick = () => {
        DQAudio.playClick();
        DQModals.openAudio(this);
      };

      document.getElementById('btn-hud-teacher').onclick = () => {
        DQAudio.playClick();
        DQModals.openTeacherReport(this);
      };

      document.getElementById('btn-footer-prev').onclick = () => {
        DQAudio.playClick();
        if (this.state.currentScene > 1) {
          this.goToScene(this.state.currentScene - 1);
        }
      };

      document.getElementById('btn-footer-hint').onclick = () => {
        DQModals.openHint(this);
      };

      document.getElementById('btn-footer-next').onclick = () => {
        DQAudio.playClick();
        if (this.state.currentScene < 15) {
          this.goToScene(this.state.currentScene + 1);
        }
      };

      document.getElementById('btn-close-modal').onclick = () => {
        DQAudio.playClick();
        DQModals.closeModal();
      };

      document.getElementById('global-modal').onclick = (e) => {
        if (e.target.id === 'global-modal') {
          DQModals.closeModal();
        }
      };

      document.getElementById('btn-dismiss-portrait').onclick = () => {
        this.state.dismissPortraitOnce = true;
        this.updateViewportScale();
      };
    }
  };

  window.DQApp = App;
  window.addEventListener('DOMContentLoaded', () => App.init());
})();
