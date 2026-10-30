/* ==========================================================================
   DATAQUEST AUDIO & INDONESIAN NARRATION ENGINE
   - Web Audio API Futuristic Ambient BGM & Crisp Game SFX (Zero external files)
   - Web Speech API Voiceover Narration (Bahasa Indonesia id-ID)
   ========================================================================== */

(function () {
  const AudioEngine = {
    ctx: null,
    bgmEnabled: true,
    sfxEnabled: true,
    voiceEnabled: true,
    bgmVolume: 0.25,
    sfxVolume: 0.65,
    bgmTimer: null,
    isPlayingBgm: false,
    stepIdx: 0,

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    },

    loadPrefs(prefs) {
      if (!prefs) return;
      if (typeof prefs.bgmEnabled === 'boolean') this.bgmEnabled = prefs.bgmEnabled;
      if (typeof prefs.sfxEnabled === 'boolean') this.sfxEnabled = prefs.sfxEnabled;
      if (typeof prefs.voiceEnabled === 'boolean') this.voiceEnabled = prefs.voiceEnabled;
      if (typeof prefs.bgmVolume === 'number') this.bgmVolume = prefs.bgmVolume;
      if (typeof prefs.sfxVolume === 'number') this.sfxVolume = prefs.sfxVolume;
    },

    getPrefs() {
      return {
        bgmEnabled: this.bgmEnabled,
        sfxEnabled: this.sfxEnabled,
        voiceEnabled: this.voiceEnabled,
        bgmVolume: this.bgmVolume,
        sfxVolume: this.sfxVolume
      };
    },

    /* ---------------- FUTURISTIC CORPORATE SYNTH BGM ---------------- */
    startBgm() {
      if (!this.bgmEnabled) {
        this.stopBgm();
        return;
      }
      this.init();
      if (!this.ctx || this.isPlayingBgm) return;
      this.isPlayingBgm = true;

      // Gentle futuristic Cmaj9 / Fmaj7 / Am9 / G6 arpeggio notes (Hz)
      const sequence = [
        261.63, 329.63, 392.00, 493.88, 587.33, 493.88, 392.00, 329.63,
        349.23, 440.00, 523.25, 659.25, 587.33, 523.25, 440.00, 349.23,
        220.00, 261.63, 329.63, 392.00, 493.88, 392.00, 329.63, 261.63,
        196.00, 246.94, 293.66, 392.00, 440.00, 392.00, 293.66, 246.94
      ];

      const playStep = () => {
        if (!this.isPlayingBgm || !this.bgmEnabled || !this.ctx) return;
        if (this.ctx.state === 'running') {
          const now = this.ctx.currentTime;
          const freq = sequence[this.stepIdx % sequence.length];
          this.stepIdx++;

          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          const peak = Math.max(0.001, this.bgmVolume * 0.09);
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(peak, now + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.65);
        }
      };

      playStep();
      this.bgmTimer = setInterval(playStep, 420);
    },

    stopBgm() {
      this.isPlayingBgm = false;
      if (this.bgmTimer) {
        clearInterval(this.bgmTimer);
        this.bgmTimer = null;
      }
    },

    /* ---------------- GAME SOUND EFFECTS (SFX) ---------------- */
    playTone(freq, duration, type = 'sine', delay = 0, volScale = 0.25) {
      if (!this.sfxEnabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      const peak = Math.max(0.001, this.sfxVolume * volScale);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(peak, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.02);
    },

    playClick() {
      this.playTone(620, 0.07, 'triangle', 0, 0.18);
    },

    playPickup() {
      this.playTone(480, 0.08, 'sine', 0, 0.2);
      this.playTone(680, 0.09, 'sine', 0.05, 0.18);
    },

    playDrop() {
      this.playTone(540, 0.09, 'triangle', 0, 0.22);
    },

    playSuccess() {
      // Bright positive ascending chord + XP sparkle
      this.playTone(523.25, 0.14, 'triangle', 0, 0.28);
      this.playTone(659.25, 0.14, 'triangle', 0.09, 0.28);
      this.playTone(783.99, 0.18, 'triangle', 0.18, 0.3);
      this.playTone(1046.50, 0.35, 'sine', 0.27, 0.32);
    },

    playError() {
      // Gentle constructive buzz
      this.playTone(250, 0.16, 'sawtooth', 0, 0.16);
      this.playTone(195, 0.24, 'sawtooth', 0.12, 0.16);
    },

    playHint() {
      this.playTone(587.33, 0.12, 'sine', 0, 0.22);
      this.playTone(880.00, 0.22, 'sine', 0.09, 0.22);
    },

    playFanfare() {
      const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50, 1318.51];
      const times = [0, 0.11, 0.22, 0.34, 0.50, 0.62, 0.78];
      notes.forEach((n, i) => {
        this.playTone(n, i === notes.length - 1 ? 0.65 : 0.16, 'triangle', times[i], 0.32);
      });
    },

    /* ---------------- VOICEOVER NARRATION (Bahasa Indonesia) ---------------- */
    speak(text, force = false) {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      this.setSpeakingIndicator(false);

      if (!text || (!this.voiceEnabled && !force)) return;

      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'id-ID';
      utter.rate = 1.02;
      utter.pitch = 1.02;

      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('id'));
      if (idVoice) utter.voice = idVoice;

      utter.onstart = () => this.setSpeakingIndicator(true);
      utter.onend = () => this.setSpeakingIndicator(false);
      utter.onerror = () => this.setSpeakingIndicator(false);

      window.speechSynthesis.speak(utter);
    },

    stopSpeech() {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      this.setSpeakingIndicator(false);
    },

    setSpeakingIndicator(active) {
      const btn = document.getElementById('btn-narration');
      if (btn) {
        btn.classList.toggle('speaking', !!active);
      }
    }
  };

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }

  window.DQAudio = AudioEngine;
})();
