/* ==========================================================================
   DATAQUEST MODALS: MAP, AUDIO, PROFILE, HINTS, CERTIFICATE & TEACHER REPORT
   ========================================================================== */

(function () {
  function openModalHtml(title, bodyHtml, maxWidth = '1180px') {
    const backdrop = document.getElementById('global-modal');
    const card = backdrop.querySelector('.modal-card');
    card.style.maxWidth = maxWidth;
    document.getElementById('modal-title-text').innerHTML = title;
    document.getElementById('modal-body-content').innerHTML = bodyHtml;
    backdrop.classList.add('open');
  }

  function closeModal() {
    const backdrop = document.getElementById('global-modal');
    if (backdrop) backdrop.classList.remove('open');
  }

  const Modals = {
    closeModal,

    /* ---------------- 1. PETA MISI 15 SCENE ---------------- */
    openMap(app) {
      const st = app.state;
      const html = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <p style="font-size:16px;color:#cbd5e1;">
            Progres Karir Konsultan: <strong>${st.completedScenes.length} dari 15 Scene Selesai</strong>. Klik scene yang sudah terbuka untuk berpindah ruangan.
          </p>
          <span style="font-size:14px;color:#fde68a;font-weight:700;">Progres tersimpan otomatis</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
          ${DQData.SCENES.map(sc => {
            const done = st.completedScenes.includes(sc.id);
            const unlocked = sc.id <= st.highestUnlocked || st.teacherUnlockAll;
            const cur = sc.id === st.currentScene;
            return `
              <button type="button" class="map-scene-btn" data-sc="${sc.id}" ${!unlocked ? 'disabled' : ''} style="text-align:left;padding:14px 16px;border-radius:16px;border:2px solid ${cur ? '#fde047' : done ? '#34d399' : unlocked ? '#38bdf8' : 'rgba(255,255,255,0.12)'};background:${cur ? 'rgba(245,158,11,0.22)' : done ? 'rgba(16,185,129,0.16)' : unlocked ? 'rgba(15,52,115,0.7)' : 'rgba(255,255,255,0.04)'};color:#fff;cursor:${unlocked ? 'pointer' : 'not-allowed'};opacity:${unlocked ? 1 : 0.45};display:flex;flex-direction:column;gap:5px;">
                <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
                  <span style="font-size:13px;font-weight:900;color:#7dd3fc;">SCENE ${sc.code} • ${sc.principle}</span>
                  <span>${done ? '✅' : unlocked ? '🔓' : '🔒'}</span>
                </div>
                <strong style="font-size:16px;">${sc.shortTitle}</strong>
                <span style="font-size:12.5px;color:#cbd5e1;">Reward: +${sc.xpReward} XP</span>
              </button>
            `;
          }).join('')}
        </div>
      `;
      openModalHtml('🗺️ Peta Petualangan – 15 Tahapan Konsultan DataQuest', html, '1220px');

      document.querySelectorAll('.map-scene-btn').forEach(btn => {
        btn.onclick = () => {
          DQAudio.playClick();
          const target = Number(btn.getAttribute('data-sc'));
          closeModal();
          app.goToScene(target);
        };
      });
    },

    /* ---------------- 2. PENGATURAN AUDIO ---------------- */
    openAudio(app) {
      const prefs = DQAudio.getPrefs();
      const html = `
        <div style="display:flex;flex-direction:column;gap:18px;">
          <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.06);padding:16px 20px;border-radius:16px;">
            <div>
              <strong style="font-size:18px;">🎵 Musik Latar Futuristik (BGM)</strong>
              <div style="font-size:14px;color:#cbd5e1;">Musik synthesizer ruang kerja konsultan software</div>
            </div>
            <input type="checkbox" id="chk-bgm" ${prefs.bgmEnabled ? 'checked' : ''} style="width:26px;height:26px;cursor:pointer;" />
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.06);padding:16px 20px;border-radius:16px;">
            <div>
              <strong style="font-size:18px;">🔔 Efek Suara Interaksi (SFX)</strong>
              <div style="font-size:14px;color:#cbd5e1;">Suara klik tombol, drag-and-drop, jawaban benar &amp; XP</div>
            </div>
            <input type="checkbox" id="chk-sfx" ${prefs.sfxEnabled ? 'checked' : ''} style="width:26px;height:26px;cursor:pointer;" />
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.06);padding:16px 20px;border-radius:16px;">
            <div>
              <strong style="font-size:18px;">🗣️ Narasi Suara Bahasa Indonesia</strong>
              <div style="font-size:14px;color:#cbd5e1;">Membacakan dialog &amp; arahan setiap pergantian scene</div>
            </div>
            <input type="checkbox" id="chk-voice" ${prefs.voiceEnabled ? 'checked' : ''} style="width:26px;height:26px;cursor:pointer;" />
          </div>

          <div style="display:flex;justify-content:flex-end;gap:12px;margin-top:8px;">
            <button class="btn btn-cyan" id="btn-test-narration">🔊 Putar Ulang Narasi Scene Ini</button>
            <button class="btn btn-gold" id="btn-close-audio">Simpan Pengaturan</button>
          </div>
        </div>
      `;
      openModalHtml('🔊 Pengaturan Audio &amp; Narasi', html, '760px');

      document.getElementById('chk-bgm').onchange = (e) => {
        DQAudio.bgmEnabled = e.target.checked;
        if (DQAudio.bgmEnabled) DQAudio.startBgm(); else DQAudio.stopBgm();
        app.saveState();
      };
      document.getElementById('chk-sfx').onchange = (e) => {
        DQAudio.sfxEnabled = e.target.checked;
        if (DQAudio.sfxEnabled) DQAudio.playSuccess();
        app.saveState();
      };
      document.getElementById('chk-voice').onchange = (e) => {
        DQAudio.voiceEnabled = e.target.checked;
        if (!DQAudio.voiceEnabled) DQAudio.stopSpeech();
        app.saveState();
      };
      document.getElementById('btn-test-narration').onclick = () => {
        const sc = app.getCurrentSceneObj();
        DQAudio.speak(sc.narration, true);
      };
      document.getElementById('btn-close-audio').onclick = () => {
        DQAudio.playClick();
        closeModal();
      };
    },

    /* ---------------- 3. PROFIL PEMAIN & BADGE ---------------- */
    openProfile(app) {
      const st = app.state;
      const av = app.getCurrentAvatar();
      const lvl = app.getLevelInfo();
      const html = `
        <div style="display:grid;grid-template-columns:280px 1fr;gap:24px;align-items:center;">
          <div style="background:rgba(255,255,255,0.06);border:2px solid #38bdf8;border-radius:20px;padding:18px;text-align:center;">
            <img src="${av.img}" alt="Avatar" style="width:190px;height:190px;object-fit:cover;border-radius:16px;border:2px solid #bae6fd;" />
            <h3 style="font-size:22px;margin-top:10px;">${app.escapeHtml(st.playerName || 'Belum Diatur')}</h3>
            <div style="font-size:14px;color:#7dd3fc;font-weight:700;">${app.escapeHtml(st.playerRole)}</div>
          </div>

          <div style="display:flex;flex-direction:column;gap:14px;">
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
              <div style="background:rgba(255,255,255,0.07);padding:14px;border-radius:14px;">
                <div style="font-size:13px;color:#fde68a;">LEVEL &amp; JABATAN</div>
                <strong style="font-size:22px;">Level ${lvl.level} – ${lvl.title}</strong>
              </div>
              <div style="background:rgba(255,255,255,0.07);padding:14px;border-radius:14px;">
                <div style="font-size:13px;color:#7dd3fc;">TOTAL PENGALAMAN</div>
                <strong style="font-size:22px;">${st.xp} XP</strong>
              </div>
              <div style="background:rgba(255,255,255,0.07);padding:14px;border-radius:14px;">
                <div style="font-size:13px;color:#6ee7b7;">MISI TUNTAS</div>
                <strong style="font-size:22px;">${st.completedScenes.length} / 15</strong>
              </div>
            </div>

            <div style="font-size:16px;font-weight:800;color:#fde68a;margin-top:4px;">🏅 Koleksi Badge Kompetensi:</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              ${DQData.BADGES.map(b => {
                const ok = st.badges.includes(b.id);
                return `
                  <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:12px;background:${ok ? 'rgba(16,185,129,0.18)' : 'rgba(255,255,255,0.04)'};border:1.5px solid ${ok ? '#34d399' : 'rgba(255,255,255,0.12)'};opacity:${ok ? 1 : 0.5};">
                    <span style="font-size:28px;">${b.icon}</span>
                    <div>
                      <strong style="font-size:15px;">${b.title} ${ok ? '✓' : '(Terkunci)'}</strong>
                      <div style="font-size:12.5px;color:#cbd5e1;">${b.desc}</div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `;
      openModalHtml('👤 Profil Konsultan DataQuest', html, '980px');
    },

    /* ---------------- 4. PETUNJUK BERTINGKAT (HINT 1 & HINT 2) ---------------- */
    openHint(app) {
      DQAudio.playHint();
      const sc = app.getCurrentSceneObj();
      const html = `
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="background:rgba(56,189,248,0.14);border:1.5px solid #38bdf8;border-radius:16px;padding:18px 22px;">
            <div style="font-size:14px;font-weight:900;color:#7dd3fc;margin-bottom:6px;">💡 PETUNJUK TAHAP 1 — ${sc.title}</div>
            <p style="font-size:18px;line-height:1.5;color:#f8fafc;">${sc.hint1}</p>
          </div>

          <div id="hint-lvl2-box" style="display:none;background:rgba(245,158,11,0.18);border:1.5px solid #fbbf24;border-radius:16px;padding:18px 22px;">
            <div style="font-size:14px;font-weight:900;color:#fde047;margin-bottom:6px;">🔑 PETUNJUK TAMBAHAN (SOLUSI TERARAH)</div>
            <p style="font-size:18px;line-height:1.5;color:#fef9c3;">${sc.hint2}</p>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;">
            <button class="btn btn-hint" id="btn-reveal-hint2">Tampilkan Petunjuk Tambahan (Level 2)</button>
            <button class="btn btn-cyan" id="btn-got-it-hint">Mengerti, Lanjutkan Kerja</button>
          </div>
        </div>
      `;
      openModalHtml('💡 Bantuan Mentor Konsultan', html, '780px');

      document.getElementById('btn-reveal-hint2').onclick = (e) => {
        DQAudio.playClick();
        document.getElementById('hint-lvl2-box').style.display = 'block';
        e.target.style.display = 'none';
      };
      document.getElementById('btn-got-it-hint').onclick = () => {
        DQAudio.playClick();
        closeModal();
      };
    },

    /* ---------------- 5. SERTIFIKAT RESMI DATABASE DESIGNER ---------------- */
    openCertificate(app) {
      const st = app.state;
      const lvl = app.getLevelInfo();
      const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      const certNo = `DQ-RPL-${new Date().getFullYear()}-${String(st.xp || 100).padStart(4, '0')}`;

      const certHtml = `
        <div id="cert-preview-wrap">
          <div class="certificate-paper">
            <div style="font-size:15px;font-weight:900;letter-spacing:3px;color:#b45309;">DATAQUEST SOFTWARE CONSULTING ACADEMY • SMK RPL</div>
            <h1 style="font-size:44px;font-weight:900;color:#0f2547;margin:8px 0;">SERTIFIKAT KOMPETENSI</h1>
            <div style="font-size:16px;color:#475569;font-weight:700;margin-bottom:18px;">Nomor Sertifikat: ${certNo}</div>

            <p style="font-size:18px;color:#334155;">Diberikan dengan bangga kepada:</p>
            <div style="font-size:40px;font-weight:900;color:#1d4ed8;border-bottom:3px solid #93c5fd;display:inline-block;padding:6px 36px;margin:8px 0 14px;">
              ${app.escapeHtml(st.playerName || 'Budi Santoso')}
            </div>

            <p style="font-size:17px;color:#1e293b;max-width:780px;margin:0 auto 22px;line-height:1.55;">
              Telah berhasil menyelesaikan seluruh simulasi industri perancangan basis data pada <strong>DataQuest – Database Designer Adventure</strong> (Analisis Kebutuhan Klien, Pemodelan Entitas &amp; ERD, Primary/Foreign Key, Normalisasi 1NF–3NF, Implementasi SQL, dan Evaluasi Quality Assurance) dengan predikat <strong>Certified ${lvl.title}</strong> (${st.xp} XP • ${st.badges.length} Badge).
            </p>

            <div style="display:flex;justify-content:space-around;align-items:flex-end;margin-top:26px;padding-top:16px;border-top:1px solid #fde68a;">
              <div>
                <div style="font-weight:900;color:#0f2547;">Ardiansyah, M.Kom</div>
                <div style="font-size:13px;color:#64748b;">Lead Project Manager</div>
              </div>
              <div style="font-size:44px;">🏅</div>
              <div>
                <div style="font-weight:900;color:#0f2547;">Larasati, S.Kom</div>
                <div style="font-size:13px;color:#64748b;">Senior Database Architect • ${dateStr}</div>
              </div>
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:14px;margin-top:18px;">
          <button class="btn btn-gold" id="btn-print-cert">🖨️ Cetak / Simpan PDF Sertifikat</button>
          <button class="btn btn-ghost" id="btn-close-cert">Tutup</button>
        </div>
      `;

      openModalHtml('📜 Sertifikat Kelulusan Database Designer', certHtml, '1040px');

      document.getElementById('btn-print-cert').onclick = () => {
        const printArea = document.getElementById('printable-area');
        printArea.innerHTML = document.getElementById('cert-preview-wrap').innerHTML;
        window.print();
      };
      document.getElementById('btn-close-cert').onclick = closeModal;
    },

    /* ---------------- 6. DASHBOARD GURU, LAPORAN SISWA & LEADERBOARD ---------------- */
    openTeacherReport(app) {
      const st = app.state;
      const lvl = app.getLevelInfo();
      const totalWrong = Object.values(st.wrongAttempts || {}).reduce((a, b) => a + b, 0);
      const mastery = Math.max(65, Math.min(100, 100 - totalWrong * 3));

      const board = [
        ...DQData.CONSULTANT_LEADERBOARD,
        {
          name: `${st.playerName || 'Pemain Saat Ini'} (Kamu)`,
          role: lvl.title,
          xp: st.xp,
          badges: st.badges.length,
          isPlayer: true
        }
      ].sort((a, b) => b.xp - a.xp);

      const html = `
        <div style="display:grid;grid-template-columns:1.1fr 0.9fr;gap:22px;">
          <!-- Left: Student Diagnostic Report -->
          <div style="background:rgba(255,255,255,0.06);border:1.5px solid rgba(125,211,252,0.35);border-radius:18px;padding:20px;">
            <h3 style="font-size:20px;color:#7dd3fc;margin-bottom:12px;">📋 Laporan Capaian Siswa (RPL)</h3>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:15px;margin-bottom:14px;">
              <div>Nama Siswa: <strong>${app.escapeHtml(st.playerName || 'Belum diisi')}</strong></div>
              <div>Peran: <strong>${app.escapeHtml(st.playerRole)}</strong></div>
              <div>Misi Tuntas: <strong>${st.completedScenes.length} / 15 Scene</strong></div>
              <div>Indeks Ketelitian: <strong>${mastery}% (${totalWrong} revisi)</strong></div>
            </div>

            <div style="background:rgba(6,18,42,0.75);border-radius:12px;padding:12px 14px;margin-bottom:12px;font-size:14px;">
              <strong style="color:#fde68a;">Ringkasan Refleksi Siswa:</strong>
              <p style="color:#e2e8f0;margin-top:4px;"><em>1. Hal terpenting:</em> ${app.escapeHtml(st.reflection?.q1 || '(Belum diisi di Scene 15)')}</p>
              <p style="color:#e2e8f0;margin-top:4px;"><em>2. Rencana penerapan:</em> ${app.escapeHtml(st.reflection?.q2 || '(Belum diisi di Scene 15)')}</p>
            </div>

            <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:14px;">
              <button class="btn btn-gold btn-sm" id="btn-export-json">💾 Unduh Laporan (.JSON)</button>
              <button class="btn btn-cyan btn-sm" id="btn-open-cert-from-rep">📜 Buka Sertifikat</button>
              <button class="btn btn-ghost btn-sm" id="btn-toggle-teacher-unlock">
                ${st.teacherUnlockAll ? '🔒 Matikan Akses Bebas 15 Scene' : '🔓 Mode Guru: Buka Semua 15 Scene'}
              </button>
            </div>
          </div>

          <!-- Right: Gamification Leaderboard -->
          <div style="background:rgba(255,255,255,0.06);border:1.5px solid rgba(253,224,71,0.35);border-radius:18px;padding:20px;">
            <h3 style="font-size:20px;color:#fde047;margin-bottom:12px;">🏆 Leaderboard Konsultan DataQuest</h3>
            <div style="display:flex;flex-direction:column;gap:9px;">
              ${board.map((row, i) => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:11px 14px;border-radius:12px;background:${row.isPlayer ? 'rgba(2,132,199,0.45)' : 'rgba(255,255,255,0.05)'};border:1.5px solid ${row.isPlayer ? '#38bdf8' : 'transparent'};">
                  <div style="display:flex;align-items:center;gap:10px;">
                    <strong style="width:26px;color:#fde047;">#${i + 1}</strong>
                    <div>
                      <div style="font-size:15px;font-weight:800;">${app.escapeHtml(row.name)}</div>
                      <div style="font-size:12px;color:#cbd5e1;">${row.role} • ${row.badges} Badge</div>
                    </div>
                  </div>
                  <strong style="color:#6ee7b7;font-size:16px;">${row.xp} XP</strong>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      openModalHtml('📊 Dashboard Evaluasi Guru &amp; Leaderboard Gamifikasi', html, '1180px');

      document.getElementById('btn-export-json').onclick = () => {
        DQAudio.playClick();
        const reportData = {
          judulGim: 'DataQuest – Database Designer Adventure',
          waktuEkspor: new Date().toISOString(),
          namaSiswa: st.playerName || 'Siswa RPL',
          peran: st.playerRole,
          xp: st.xp,
          level: lvl,
          sceneSelesai: st.completedScenes,
          badges: st.badges,
          percobaanSalahPerScene: st.wrongAttempts,
          indeksKetelitianPersen: mastery,
          refleksi: st.reflection || null
        };
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Laporan_DataQuest_${(st.playerName || 'Siswa').replace(/\s+/g, '_')}.json`;
        a.click();
        URL.revokeObjectURL(url);
      };

      document.getElementById('btn-open-cert-from-rep').onclick = () => {
        DQAudio.playClick();
        this.openCertificate(app);
      };

      document.getElementById('btn-toggle-teacher-unlock').onclick = () => {
        DQAudio.playSuccess();
        st.teacherUnlockAll = !st.teacherUnlockAll;
        app.saveState();
        this.openMap(app);
      };
    }
  };

  window.DQModals = Modals;
})();
