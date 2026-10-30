/* ==========================================================================
   DATAQUEST SCENES 01 – 08 RENDERERS & INTERACTIVE CONTROLLERS
   ========================================================================== */

(function () {
  function dbCylinderSVG(size = 86) {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cylTop" x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#7dd3fc"/>
            <stop offset="100%" stop-color="#0284c7"/>
          </linearGradient>
          <linearGradient id="cylBody" x1="16" y1="20" x2="80" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#38bdf8"/>
            <stop offset="50%" stop-color="#0369a1"/>
            <stop offset="100%" stop-color="#1e3a8a"/>
          </linearGradient>
        </defs>
        <path d="M18 26C18 18.268 31.431 12 48 12C64.569 12 78 18.268 78 26V70C78 77.732 64.569 84 48 84C31.431 84 18 77.732 18 70V26Z" fill="url(#cylBody)" stroke="#bae6fd" stroke-width="3"/>
        <ellipse cx="48" cy="26" rx="30" ry="12" fill="url(#cylTop)" stroke="#e0f2fe" stroke-width="2.5"/>
        <path d="M18 41C18 48.2 31.431 53 48 53C64.569 53 78 48.2 78 41" stroke="#bae6fd" stroke-width="2.5"/>
        <path d="M18 56C18 63.2 31.431 68 48 68C64.569 68 78 63.2 78 56" stroke="#bae6fd" stroke-width="2.5"/>
        <circle cx="32" cy="40" r="3" fill="#fde047"/>
        <circle cx="32" cy="55" r="3" fill="#fde047"/>
        <circle cx="32" cy="70" r="3" fill="#34d399"/>
      </svg>`;
  }

  function renderFeedback(fb) {
    if (!fb) return '';
    return `
      <div class="feedback-banner ${fb.type}">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:24px;">${fb.type === 'success' ? '✅' : fb.type === 'hint' ? '💡' : '⚠️'}</span>
          <span>${fb.text}</span>
        </div>
        ${fb.extra ? `<span style="font-size:14px;opacity:0.9;">${fb.extra}</span>` : ''}
      </div>`;
  }

  const Scenes1to8 = {
    dbCylinderSVG,

    /* ======================================================================
       SCENE 01: OPENING – DUNIA DATAQUEST
       ====================================================================== */
    renderScene1(root, app) {
      const st = app.state;
      const curAv = app.getCurrentAvatar();
      const hasProgress = st.completedScenes.length > 0 && st.playerName;

      root.innerHTML = `
        <div class="opening-layout">
          <!-- Left: Consultant Hero Character -->
          <div class="character-column" style="height:790px;">
            <div class="character-frame">
              <img src="${curAv.img}" alt="Konsultan DataQuest" />
              <div class="character-nameplate">
                <strong>${st.playerName ? app.escapeHtml(st.playerName) : 'Konsultan Muda RPL'}</strong>
                <span>${app.escapeHtml(st.playerRole)} • DataQuest Corp</span>
              </div>
            </div>
          </div>

          <!-- Center: Hero Brand & Main CTA -->
          <div class="opening-hero-center">
            <div style="display:inline-flex;align-items:center;gap:10px;background:rgba(56,189,248,0.16);border:1px solid rgba(125,211,252,0.45);padding:6px 18px;border-radius:999px;font-size:15px;font-weight:700;color:#bae6fd;">
              🏢 SIMULASI KONSULTAN SOFTWARE • SMK REKAYASA PERANGKAT LUNAK
            </div>

            <div class="hero-emblem-wrap">
              ${dbCylinderSVG(106)}
              <div style="text-align:left;">
                <div class="hero-title-giant">DATAQUEST</div>
                <div style="font-size:20px;font-weight:700;color:#fde68a;letter-spacing:1.4px;margin-top:4px;">
                  ADVENTURE &amp; DATABASE SIMULATION GAME
                </div>
              </div>
            </div>

            <div class="hero-subtitle-banner">Database Designer Adventure</div>

            <p class="hero-tagline">
              Rasakan pengalaman nyata bekerja di perusahaan konsultan software! Analisis kebutuhan klien, rancang ERD, normalisasi tabel, hingga eksekusi SQL.
            </p>

            <div style="display:flex;gap:18px;align-items:center;margin-top:6px;">
              <button class="btn btn-gold btn-lg" id="btn-start-adventure">
                ▶ ${hasProgress ? 'Mulai / Kelola Karakter' : 'Mulai Petualangan'}
              </button>
              ${hasProgress ? `
                <button class="btn btn-cyan btn-lg" id="btn-continue-adventure">
                  ⚡ Lanjutkan Scene ${String(st.highestUnlocked).padStart(2, '0')} →
                </button>
              ` : ''}
            </div>

            <div class="opening-bottom-dock">
              <button class="btn btn-ghost btn-sm" id="open-profile-btn">👤 Profil Pemain</button>
              <button class="btn btn-ghost btn-sm" id="open-audio-btn">🔊 Pengaturan Audio</button>
              <button class="btn btn-ghost btn-sm" id="open-map-btn">🗺️ Peta 15 Scene</button>
              <button class="btn btn-ghost btn-sm" id="open-teacher-btn">📊 Laporan &amp; Dashboard Guru</button>
              ${hasProgress ? `<button class="btn btn-ghost btn-sm" id="reset-progress-btn" style="border-color:rgba(248,113,113,0.55);color:#fecaca;">🔄 Reset Progres</button>` : ''}
            </div>
          </div>

          <!-- Right: 5 Learning Principles & Corporate Vision -->
          <div class="glass-panel pillar-principles-card">
            <div style="font-size:20px;font-weight:800;color:#7dd3fc;border-bottom:1px solid rgba(125,211,252,0.3);padding-bottom:10px;">
              🎯 5 Pilar Petualangan DataQuest
            </div>
            <div class="pillar-item">
              <span style="font-size:26px;">🧭</span>
              <div><strong style="color:#fff;font-size:17px;">Terarah</strong><div style="font-size:14px;color:#cbd5e1;">Alur misi berjenjang dari orientasi hingga proyek akhir</div></div>
            </div>
            <div class="pillar-item">
              <span style="font-size:26px;">💼</span>
              <div><strong style="color:#fff;font-size:17px;">Kontekstual</strong><div style="font-size:14px;color:#cbd5e1;">Order Work nyata dari klien Perpustakaan &amp; Kantin</div></div>
            </div>
            <div class="pillar-item">
              <span style="font-size:26px;">🧠</span>
              <div><strong style="color:#fff;font-size:17px;">Memicu Nalar</strong><div style="font-size:14px;color:#cbd5e1;">Investigasi data, ERD Builder, &amp; Normalisasi 3NF</div></div>
            </div>
            <div class="pillar-item">
              <span style="font-size:26px;">⚡</span>
              <div><strong style="color:#fff;font-size:17px;">Umpan Balik</strong><div style="font-size:14px;color:#cbd5e1;">Koreksi langsung, petunjuk bertingkat, XP &amp; QA</div></div>
            </div>
            <div class="pillar-item">
              <span style="font-size:26px;">📝</span>
              <div><strong style="color:#fff;font-size:17px;">Reflektif</strong><div style="font-size:14px;color:#cbd5e1;">Evaluasi diri, sertifikat resmi, &amp; portofolio kerja</div></div>
            </div>
            <div style="text-align:right;margin-top:6px;font-size:16px;font-weight:800;color:#bae6fd;letter-spacing:0.8px;">
              Software • Database • Better Future
            </div>
          </div>
        </div>
      `;

      root.querySelector('#btn-start-adventure').onclick = () => {
        DQAudio.playClick();
        DQAudio.startBgm();
        app.completeScene(1, false);
        app.goToScene(2);
      };
      const contBtn = root.querySelector('#btn-continue-adventure');
      if (contBtn) {
        contBtn.onclick = () => {
          DQAudio.playClick();
          DQAudio.startBgm();
          app.goToScene(st.highestUnlocked || 2);
        };
      }
      root.querySelector('#open-profile-btn').onclick = () => { DQAudio.playClick(); DQModals.openProfile(app); };
      root.querySelector('#open-audio-btn').onclick = () => { DQAudio.playClick(); DQModals.openAudio(app); };
      root.querySelector('#open-map-btn').onclick = () => { DQAudio.playClick(); DQModals.openMap(app); };
      root.querySelector('#open-teacher-btn').onclick = () => { DQAudio.playClick(); DQModals.openTeacherReport(app); };
      const resetBtn = root.querySelector('#reset-progress-btn');
      if (resetBtn) {
        resetBtn.onclick = () => {
          DQAudio.playClick();
          if (confirm('Reset seluruh progres permainan, XP, dan sertifikat untuk memulai dari awal?')) {
            app.resetAllProgress();
          }
        };
      }
    },

    /* ======================================================================
       SCENE 02: CHARACTER SETUP – IDENTITAS PEMAIN
       ====================================================================== */
    renderScene2(root, app) {
      const st = app.state;
      if (!st.tempSetup) {
        st.tempSetup = {
          name: st.playerName || 'Budi Santoso',
          avatarId: st.avatarId || 'av1',
          role: st.playerRole || DQData.ROLES[0],
          fb: null
        };
      }
      const setup = st.tempSetup;
      const selectedAv = DQData.AVATARS.find(a => a.id === setup.avatarId) || DQData.AVATARS[0];

      root.innerHTML = `
        <div class="char-setup-grid">
          <!-- Left: 6 Avatar Grid -->
          <div class="light-card" style="display:flex;flex-direction:column;overflow:hidden;">
            <div class="panel-header-bar">
              <span>🧑‍💻 Pilih Karakter Konsultan</span>
              <span style="font-size:14px;opacity:0.9;">6 Pilihan</span>
            </div>
            <div class="avatar-grid-select" style="flex:1;align-content:center;">
              ${DQData.AVATARS.map(av => `
                <div class="avatar-option-card ${av.id === setup.avatarId ? 'selected' : ''}" data-avid="${av.id}">
                  <div class="avatar-thumb">
                    <img src="${av.img}" alt="${av.name}" />
                  </div>
                  <div style="font-weight:800;font-size:15px;">${av.name}</div>
                  <div style="font-size:12px;color:#475569;font-weight:600;">${av.label}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Center: Large Avatar Preview & Corporate ID Badge -->
          <div class="glass-panel" style="padding:22px;display:flex;flex-direction:column;gap:16px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:18px;font-weight:800;color:#7dd3fc;">🪪 Kartu ID Konsultan DataQuest</span>
              <span style="background:#059669;color:#fff;font-size:13px;font-weight:800;padding:4px 10px;border-radius:999px;">AKTIF</span>
            </div>
            <div class="character-frame" style="flex:1;">
              <img src="${selectedAv.img}" alt="${selectedAv.name}" />
              <div class="character-nameplate">
                <strong id="preview-player-name">${app.escapeHtml(setup.name || 'Nama Konsultan')}</strong>
                <span id="preview-player-role">${app.escapeHtml(setup.role)}</span>
              </div>
            </div>
          </div>

          <!-- Right: Identity Form -->
          <div class="light-card" style="display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;">
            <div class="panel-header-bar">
              <span>📝 Identitas Pemain – Divisi Rekayasa Basis Data</span>
            </div>
            <div style="padding:28px 34px;flex:1;display:flex;flex-direction:column;justify-content:center;">
              <div class="form-field-group">
                <label for="inp-player-name">Nama Pemain (Tercetak di Sertifikat &amp; Laporan)</label>
                <input id="inp-player-name" class="dq-input" type="text" maxlength="40" placeholder="Contoh: Budi Santoso" value="${app.escapeHtml(setup.name)}" />
              </div>

              <div class="form-field-group">
                <label>Pilih Cepat Avatar</label>
                <div style="display:flex;gap:12px;">
                  ${DQData.AVATARS.map(av => `
                    <button type="button" class="quick-av-btn" data-avid="${av.id}" style="width:68px;height:68px;border-radius:50%;overflow:hidden;border:3px solid ${av.id === setup.avatarId ? '#0284c7' : '#cbd5e1'};cursor:pointer;padding:0;background:#0f295c;box-shadow:${av.id === setup.avatarId ? '0 0 0 4px rgba(56,189,248,0.35)' : 'none'};">
                      <img src="${av.img}" alt="${av.name}" style="width:100%;height:100%;object-fit:cover;" />
                    </button>
                  `).join('')}
                </div>
              </div>

              <div class="form-field-group">
                <label for="sel-player-role">Peran Anda di Perusahaan Konsultan</label>
                <select id="sel-player-role" class="dq-select">
                  ${DQData.ROLES.map(r => `<option value="${r}" ${r === setup.role ? 'selected' : ''}>${r}</option>`).join('')}
                </select>
              </div>

              <div style="background:#dbeafe;border:1.5px solid #93c5fd;border-radius:14px;padding:14px 18px;margin-bottom:18px;color:#1e3a8a;font-size:16px;font-weight:600;">
                💼 <strong>Penempatan Awal:</strong> Ruang Kerja TeFa RPL – Divisi Sistem Informasi Industri &amp; Pendidikan.
              </div>

              ${renderFeedback(setup.fb)}

              <div style="display:flex;justify-content:flex-end;margin-top:16px;">
                <button class="btn btn-gold btn-lg" id="btn-confirm-char" style="width:100%;">
                  Konfirmasi Identitas &amp; Masuk Kantor →
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      const inpName = root.querySelector('#inp-player-name');
      const selRole = root.querySelector('#sel-player-role');
      inpName.oninput = () => {
        setup.name = inpName.value;
        root.querySelector('#preview-player-name').textContent = setup.name.trim() || 'Nama Konsultan';
      };
      selRole.onchange = () => {
        setup.role = selRole.value;
        root.querySelector('#preview-player-role').textContent = setup.role;
      };

      root.querySelectorAll('[data-avid]').forEach(el => {
        el.onclick = () => {
          DQAudio.playClick();
          setup.avatarId = el.getAttribute('data-avid');
          this.renderScene2(root, app);
        };
      });

      root.querySelector('#btn-confirm-char').onclick = () => {
        const cleanName = (setup.name || '').trim();
        if (cleanName.length < 2) {
          DQAudio.playError();
          setup.fb = { type: 'error', text: 'Mohon isi Nama Pemain minimal 2 huruf sebelum melanjutkan.' };
          this.renderScene2(root, app);
          return;
        }
        st.playerName = cleanName;
        st.avatarId = setup.avatarId;
        st.playerRole = setup.role;
        setup.fb = { type: 'success', text: `Selamat bergabung di DataQuest Consulting, ${cleanName}!` };
        app.completeScene(2, true);
        setTimeout(() => app.goToScene(3), 450);
      };
    },

    /* ======================================================================
       SCENE 03: MISSION BRIEFING – PANGGILAN PROYEK
       ====================================================================== */
    renderScene3(root, app) {
      const st = app.state;
      if (!st.s3) {
        st.s3 = { opened: false, checked: [false, false, false, false, false], accepted: st.completedScenes.includes(3), fb: null };
      }
      const s3 = st.s3;
      const reqItems = [
        'Data anggota perpustakaan (identitas siswa peminjam)',
        'Data buku (katalog koleksi, pengarang, penerbit)',
        'Data petugas (pustakawan yang melayani transaksi)',
        'Transaksi peminjaman (pencatatan buku keluar & tanggal pinjam)',
        'Transaksi pengembalian (pencatatan tanggal kembali & status buku)'
      ];
      const allChecked = s3.checked.every(Boolean);

      root.innerHTML = `
        <div style="display:grid;grid-template-columns:420px 1fr 560px;gap:26px;height:100%;align-items:stretch;">
          <!-- Left: Project Manager Portrait -->
          <div class="character-column">
            <div class="character-frame">
              <img src="assets/npc_manager.jpg" alt="Manajer Proyek" />
              <div class="character-nameplate">
                <strong>Pak Ardiansyah, M.Kom</strong>
                <span>Lead Project Manager • TeFa RPL</span>
              </div>
            </div>
          </div>

          <!-- Center: Briefing Speech & Player Consultant Context -->
          <div style="display:flex;flex-direction:column;justify-content:space-between;gap:18px;">
            <div class="speech-bubble">
              <span class="speaker-tag">📢 PANGGILAN PROYEK BARU</span>
              <p style="font-weight:700;font-size:21px;color:#0f2547;margin-bottom:10px;">
                "Halo <strong>${app.escapeHtml(st.playerName || 'Budi')}</strong>! Ada proyek baru dari <strong>Unit Perpustakaan Sekolah</strong>."
              </p>
              <p style="color:#334155;font-size:18px;">
                "Selama ini pencatatan peminjaman buku masih memakai buku tulis manual sehingga data sering terselip dan ganda. Klien membutuhkan <strong>Sistem Informasi Perpustakaan</strong>, dan kamu ditugaskan merancang basis datanya!"
              </p>
              <div style="text-align:right;margin-top:10px;font-weight:800;color:#0284c7;font-size:16px;">— Manajer Proyek</div>
            </div>

            <div class="glass-panel" style="padding:22px;flex:1;display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-size:18px;font-weight:800;color:#fde68a;margin-bottom:10px;">📋 Alur Kerja Konsultan Database</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:15px;">
                  <div style="background:rgba(255,255,255,0.08);padding:12px;border-radius:12px;border:1px solid rgba(125,211,252,0.28);">
                    <strong>1. Analisis Dokumen</strong><br/><span style="color:#cbd5e1;">Pahami ruang lingkup data yang diminta klien pada Order Work.</span>
                  </div>
                  <div style="background:rgba(255,255,255,0.08);padding:12px;border-radius:12px;border:1px solid rgba(125,211,252,0.28);">
                    <strong>2. Pemodelan ERD &amp; Kunci</strong><br/><span style="color:#cbd5e1;">Rancang entitas, Primary Key, Foreign Key, dan kardinalitas.</span>
                  </div>
                  <div style="background:rgba(255,255,255,0.08);padding:12px;border-radius:12px;border:1px solid rgba(125,211,252,0.28);">
                    <strong>3. Normalisasi 1NF–3NF</strong><br/><span style="color:#cbd5e1;">Pastikan tabel bebas redundansi &amp; anomali data.</span>
                  </div>
                  <div style="background:rgba(255,255,255,0.08);padding:12px;border-radius:12px;border:1px solid rgba(125,211,252,0.28);">
                    <strong>4. Implementasi SQL &amp; QA</strong><br/><span style="color:#cbd5e1;">Uji perintah DDL/DML hingga lulus audit Quality Assurance.</span>
                  </div>
                </div>
              </div>
              ${renderFeedback(s3.fb)}
            </div>
          </div>

          <!-- Right: Interactive Order Work #001 Card -->
          <div class="light-card" style="display:flex;flex-direction:column;overflow:hidden;">
            <div class="panel-header-bar" style="background:linear-gradient(90deg,#0284c7,#0f766e);">
              <span>📄 Order Work #001</span>
              <span style="background:rgba(255,255,255,0.22);padding:3px 12px;border-radius:999px;font-size:14px;">PRIORITAS TINGGI</span>
            </div>

            ${!s3.opened ? `
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px;text-align:center;gap:20px;">
                <div style="font-size:74px;">✉️</div>
                <h3 style="font-size:25px;color:#0f2547;">Dokumen Surat Perintah Kerja (Order Work #001)</h3>
                <p style="font-size:17px;color:#475569;max-width:420px;">
                  Klien: <strong>Unit Perpustakaan SMK Nusantara</strong>.<br/>Buka amplop dokumen resmi ini untuk mempelajari spesifikasi kebutuhan klien.
                </p>
                <button class="btn btn-cyan btn-lg" id="btn-open-ow">📂 Buka Surat Order Work #001</button>
              </div>
            ` : `
              <div style="padding:22px 26px;flex:1;display:flex;flex-direction:column;justify-content:space-between;">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #dbeafe;padding-bottom:10px;margin-bottom:14px;">
                    <div>
                      <div style="font-size:13px;font-weight:800;color:#0284c7;text-transform:uppercase;">Nama Proyek</div>
                      <div style="font-size:22px;font-weight:900;color:#0f2547;">Sistem Informasi Perpustakaan</div>
                    </div>
                    <button class="btn btn-ghost btn-sm" id="btn-check-all-ow" style="color:#0284c7;background:#eff6ff;border-color:#93c5fd;">✓ Tandai Semua</button>
                  </div>

                  <div style="font-size:15px;font-weight:800;color:#334155;margin-bottom:10px;">
                    Klik setiap poin Kebutuhan Klien untuk memverifikasi ruang lingkup (${s3.checked.filter(Boolean).length}/5):
                  </div>

                  <div style="display:flex;flex-direction:column;gap:10px;">
                    ${reqItems.map((txt, idx) => `
                      <div class="ow-req-item" data-idx="${idx}" style="display:flex;align-items:center;gap:12px;padding:12px 15px;border-radius:13px;border:2px solid ${s3.checked[idx] ? '#10b981' : '#bfdbfe'};background:${s3.checked[idx] ? '#ecfdf5' : '#ffffff'};cursor:pointer;transition:all 0.15s;">
                        <span style="width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-weight:900;background:${s3.checked[idx] ? '#10b981' : '#e2e8f0'};color:${s3.checked[idx] ? '#fff' : '#64748b'};">
                          ${s3.checked[idx] ? '✓' : idx + 1}
                        </span>
                        <span style="font-size:16px;font-weight:700;color:#0f2547;">${txt}</span>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <button class="btn btn-gold btn-lg" id="btn-accept-ow" ${!allChecked ? 'disabled' : ''} style="width:100%;margin-top:14px;">
                  🤝 Terima Proyek &amp; Mulai Pelatihan →
                </button>
              </div>
            `}
          </div>
        </div>
      `;

      const openBtn = root.querySelector('#btn-open-ow');
      if (openBtn) {
        openBtn.onclick = () => {
          DQAudio.playPickup();
          s3.opened = true;
          this.renderScene3(root, app);
        };
      }

      const checkAllBtn = root.querySelector('#btn-check-all-ow');
      if (checkAllBtn) {
        checkAllBtn.onclick = () => {
          DQAudio.playClick();
          s3.checked = [true, true, true, true, true];
          this.renderScene3(root, app);
        };
      }

      root.querySelectorAll('.ow-req-item').forEach(el => {
        el.onclick = () => {
          const i = Number(el.getAttribute('data-idx'));
          s3.checked[i] = !s3.checked[i];
          DQAudio.playClick();
          this.renderScene3(root, app);
        };
      });

      const acceptBtn = root.querySelector('#btn-accept-ow');
      if (acceptBtn) {
        acceptBtn.onclick = () => {
          s3.accepted = true;
          s3.fb = { type: 'success', text: 'Order Work #001 resmi diterima! Mari bekali konsep dasar di Database Academy.' };
          app.completeScene(3, true);
          this.renderScene3(root, app);
          setTimeout(() => app.goToScene(4), 650);
        };
      }
    },

    /* ======================================================================
       SCENE 04: DATABASE ACADEMY – PENGENALAN BASIS DATA
       ====================================================================== */
    renderScene4(root, app) {
      const st = app.state;
      if (!st.s4) {
        st.s4 = {
          activeComp: 'comp_data',
          visited: { comp_data: true },
          qIdx: 0,
          selectedOpt: null,
          quizPassed: st.completedScenes.includes(4),
          attempts: 0,
          fb: null
        };
      }
      const s4 = st.s4;
      const comps = DQData.ACADEMY_COMPONENTS;
      const curComp = comps.find(c => c.id === s4.activeComp) || comps[0];
      const curQuiz = DQData.ACADEMY_QUIZ[s4.qIdx];
      const visitedCount = Object.keys(s4.visited).length;

      root.innerHTML = `
        <div style="display:grid;grid-template-columns:360px 1fr 480px;gap:24px;height:100%;">
          <!-- Left: Mentor Portrait -->
          <div class="character-column">
            <div class="character-frame">
              <img src="assets/npc_mentor.jpg" alt="Mentor Senior" />
              <div class="character-nameplate">
                <strong>Kak Larasati, S.Kom</strong>
                <span>Senior Database Architect • Mentor</span>
              </div>
            </div>
          </div>

          <!-- Center: Interactive Concept Explorer -->
          <div class="light-card" style="display:flex;flex-direction:column;overflow:hidden;">
            <div class="panel-header-bar">
              <span>🏛️ Database Academy – Apa itu Basis Data?</span>
              <span style="font-size:14px;">Eksplorasi: ${visitedCount}/4 Komponen</span>
            </div>
            <div style="padding:20px 26px;flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
              <div style="background:#eff6ff;border-left:5px solid #0284c7;padding:14px 18px;border-radius:12px;">
                <p style="font-size:17px;line-height:1.5;color:#0f2547;font-weight:600;">
                  <strong>Basis Data (Database)</strong> adalah kumpulan data yang saling berhubungan dan disimpan secara sistematis agar dapat diakses, dikelola, dan diperbarui dengan mudah menggunakan <strong>DBMS</strong>.
                </p>
              </div>

              <div>
                <div style="font-size:15px;font-weight:800;color:#1e3a8a;margin-bottom:10px;text-transform:uppercase;">
                  🔍 Klik Komponen Utama untuk Membuka Ilustrasi Laboratorium:
                </div>
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;">
                  ${comps.map(c => {
                    const isAct = c.id === s4.activeComp;
                    const isVis = !!s4.visited[c.id];
                    return `
                      <button type="button" class="comp-card-btn" data-cid="${c.id}" style="padding:14px 10px;border-radius:16px;border:2.5px solid ${isAct ? '#0284c7' : isVis ? '#34d399' : '#bfdbfe'};background:${isAct ? 'linear-gradient(180deg,#dbeafe,#bfdbfe)' : '#ffffff'};cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;transition:all 0.16s;">
                        <span style="font-size:32px;">${c.icon}</span>
                        <strong style="font-size:15px;color:#0f2547;text-align:center;">${c.name}</strong>
                        <span style="font-size:12px;font-weight:800;color:${isVis ? '#059669' : '#64748b'};">${isVis ? '✓ Dipelajari' : 'Klik Buka'}</span>
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Detailed Visual Box for Active Component -->
              <div style="background:#0f2547;color:#f8fafc;border-radius:18px;padding:18px 22px;border:2px solid #38bdf8;flex:1;display:flex;flex-direction:column;justify-content:space-between;">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                    <strong style="font-size:20px;color:#7dd3fc;">${curComp.icon} ${curComp.name} — ${curComp.tagline}</strong>
                    <span style="font-family:var(--font-mono);font-size:13px;background:rgba(56,189,248,0.18);padding:4px 10px;border-radius:8px;color:#bae6fd;">${curComp.visual}</span>
                  </div>
                  <p style="font-size:16px;color:#e2e8f0;line-height:1.45;">${curComp.detail}</p>
                </div>

                <!-- Mini Table / Column / Row Diagram -->
                <div style="margin-top:10px;background:#ffffff;border-radius:12px;overflow:hidden;color:#0f2547;">
                  <table class="data-grid-table" style="font-size:14px;">
                    <thead>
                      <tr>
                        <th>id_buku (Kolom PK)</th>
                        <th>judul (Kolom)</th>
                        <th>pengarang (Kolom)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>B001</strong></td>
                        <td>Basis Data SMK RPL</td>
                        <td>Fathansyah <em>← (1 Baris / Record)</em></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Quick Quiz Panel -->
          <div class="light-card" style="display:flex;flex-direction:column;overflow:hidden;">
            <div class="panel-header-bar" style="background:linear-gradient(90deg,#2563eb,#7c3aed);">
              <span>⚡ Kuis Cepat (${s4.qIdx + 1}/${DQData.ACADEMY_QUIZ.length})</span>
              ${s4.quizPassed ? '<span style="background:#10b981;padding:3px 10px;border-radius:999px;font-size:13px;">LULUS</span>' : ''}
            </div>
            <div style="padding:22px 24px;flex:1;display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-size:19px;font-weight:800;color:#0f2547;margin-bottom:16px;line-height:1.4;">
                  ${curQuiz.q}
                </div>
                <div style="display:flex;flex-direction:column;gap:11px;">
                  ${curQuiz.options.map(opt => {
                    const isSel = s4.selectedOpt === opt.id;
                    return `
                      <button type="button" class="quiz-opt-btn" data-opt="${opt.id}" style="text-align:left;padding:14px 16px;border-radius:14px;border:2.5px solid ${isSel ? '#0284c7' : '#cbd5e1'};background:${isSel ? '#dbeafe' : '#ffffff'};color:#0f2547;font-size:16px;font-weight:700;cursor:pointer;transition:all 0.15s;">
                        ${opt.text}
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>

              <div style="display:flex;flex-direction:column;gap:12px;">
                ${renderFeedback(s4.fb)}
                <button class="btn btn-cyan btn-lg" id="btn-check-quiz" style="width:100%;">
                  Cek Jawaban
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      root.querySelectorAll('.comp-card-btn').forEach(btn => {
        btn.onclick = () => {
          DQAudio.playClick();
          const cid = btn.getAttribute('data-cid');
          s4.activeComp = cid;
          s4.visited[cid] = true;
          this.renderScene4(root, app);
        };
      });

      root.querySelectorAll('.quiz-opt-btn').forEach(btn => {
        btn.onclick = () => {
          DQAudio.playClick();
          s4.selectedOpt = btn.getAttribute('data-opt');
          this.renderScene4(root, app);
        };
      });

      root.querySelector('#btn-check-quiz').onclick = () => {
        if (!s4.selectedOpt) {
          DQAudio.playError();
          s4.fb = { type: 'error', text: 'Pilih salah satu jawaban terlebih dahulu!' };
          this.renderScene4(root, app);
          return;
        }
        if (s4.selectedOpt === curQuiz.correct) {
          DQAudio.playSuccess();
          if (s4.qIdx < DQData.ACADEMY_QUIZ.length - 1) {
            s4.qIdx++;
            s4.selectedOpt = null;
            s4.attempts = 0;
            s4.fb = { type: 'success', text: 'Jawaban tepat! Lanjut ke pertanyaan ke-2.' };
            this.renderScene4(root, app);
          } else {
            s4.quizPassed = true;
            s4.fb = { type: 'success', text: 'Luar biasa! Kamu menguasai konsep dasar Basis Data & DBMS. Klik Lanjutkan!' };
            app.completeScene(4, true);
            this.renderScene4(root, app);
          }
        } else {
          s4.attempts++;
          app.recordWrongAttempt(4);
          DQAudio.playError();
          const extraHint = s4.attempts >= 2
            ? ' 💡 Petunjuk Tambahan: Perhatikan kata kunci "mengelola basis data" untuk soal 1 dan "Baris (Record)" untuk soal 2!'
            : '';
          s4.fb = { type: 'error', text: curQuiz.explainWrong + extraHint };
          this.renderScene4(root, app);
        }
      };
    },

    /* ======================================================================
       SCENE 05: DATA DETECTIVE – ANALISIS KEBUTUHAN (Drag & Drop + Click)
       ====================================================================== */
    renderScene5(root, app) {
      const st = app.state;
      if (!st.s5) {
        st.s5 = {
          placedIds: [],
          selectedCardId: null,
          attempts: 0,
          fb: null
        };
      }
      const s5 = st.s5;
      const allCards = DQData.DETECTIVE_EVIDENCE;
      const poolCards = allCards.filter(c => !s5.placedIds.includes(c.id));
      const placedCards = s5.placedIds.map(id => allCards.find(c => c.id === id)).filter(Boolean);

      const slots = [
        { idx: 0, title: 'Slot 1', icon: '🧑‍🎓' },
        { idx: 1, title: 'Slot 2', icon: '📚' },
        { idx: 2, title: 'Slot 3', icon: '🪪' },
        { idx: 3, title: 'Slot 4', icon: '📤' },
        { idx: 4, title: 'Slot 5', icon: '📥' }
      ];

      root.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 440px;gap:24px;height:100%;">
          <!-- Left: Investigation Board -->
          <div class="glass-panel" style="padding:22px 26px;display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div>
                <h2 style="font-size:24px;font-weight:900;color:#fff;">🕵️‍♂️ Ruang Investigasi: Identifikasi Kebutuhan Data</h2>
                <p style="font-size:15px;color:#bae6fd;">Wawancara Pustakawan: <em>"Kami butuh mencatat siswa anggota, katalog buku, petugas jaga, serta kapan buku dipinjam dan dikembalikan."</em></p>
              </div>
              <button class="btn btn-ghost btn-sm" id="btn-reset-s5">↺ Kosongkan Slot</button>
            </div>

            <!-- 5 Investigation Drop Slots -->
            <div id="detective-drop-board" class="drop-zone-box ${s5.selectedCardId ? 'ready-target' : ''}" style="background:rgba(15,42,92,0.75);border-color:#38bdf8;padding:16px;display:grid;grid-template-columns:repeat(5,1fr);gap:14px;min-height:220px;align-items:stretch;">
              ${slots.map(sl => {
                const item = placedCards[sl.idx];
                return `
                  <div class="detective-slot" data-slot="${sl.idx}" style="background:${item ? '#ffffff' : 'rgba(255,255,255,0.08)'};border:2px ${item ? 'solid #38bdf8' : 'dashed rgba(125,211,252,0.45)'};border-radius:16px;padding:14px 12px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;text-align:center;color:${item ? '#0f2547' : '#94a3b8'};cursor:pointer;">
                    ${item ? `
                      <span style="font-size:36px;">${item.icon}</span>
                      <strong style="font-size:15px;line-height:1.3;">${item.label}</strong>
                      <button type="button" class="remove-ev-btn" data-id="${item.id}" style="background:#fee2e2;color:#b91c1c;border:1px solid #fca5a5;border-radius:8px;padding:4px 10px;font-size:12px;font-weight:800;cursor:pointer;">✕ Lepas</button>
                    ` : `
                      <span style="font-size:30px;opacity:0.5;">${sl.icon}</span>
                      <span style="font-size:14px;font-weight:700;">Drop / Klik Bukti #${sl.idx + 1}</span>
                      <span style="font-size:12px;">0/1</span>
                    `}
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Evidence Cards Pool (Includes 2 Distractors!) -->
            <div style="background:rgba(255,255,255,0.95);border-radius:18px;padding:16px 20px;color:#0f2547;">
              <div style="font-size:15px;font-weight:800;color:#1e3a8a;margin-bottom:10px;">
                🗂️ Dokumen Temuan Lapangan (Seret ke papan di atas atau Klik kartu untuk memasukkan — hati-hati ada 2 data pengecoh!):
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:10px;">
                ${poolCards.length === 0 ? `<span style="color:#64748b;font-weight:700;">Seluruh slot papan investigasi telah terisi. Periksa kembali atau klik Selesai!</span>` : poolCards.map(c => `
                  <div class="draggable-chip ${s5.selectedCardId === c.id ? 'selected-chip' : ''}" draggable="true" data-evid="${c.id}" title="${c.desc}">
                    <span style="font-size:20px;">${c.icon}</span>
                    <span>${c.label}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            ${renderFeedback(s5.fb)}
          </div>

          <!-- Right: Daftar Kebutuhan Checklist & Action -->
          <div class="light-card" style="display:flex;flex-direction:column;overflow:hidden;">
            <div class="panel-header-bar">
              <span>📋 Daftar Kebutuhan Teridentifikasi</span>
            </div>
            <div style="padding:22px 24px;flex:1;display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <p style="font-size:15px;color:#475569;margin-bottom:14px;font-weight:600;">
                  Susun tepat <strong>5 kebutuhan data relevan</strong> untuk Sistem Informasi Perpustakaan:
                </p>
                <div style="display:flex;flex-direction:column;gap:10px;">
                  ${['ev_anggota', 'ev_buku', 'ev_petugas', 'ev_pinjam', 'ev_kembali'].map((reqId, idx) => {
                    const card = allCards.find(c => c.id === reqId);
                    const matched = s5.placedIds.includes(reqId);
                    return `
                      <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;background:${matched ? '#ecfdf5' : '#f8fafc'};border:1.5px solid ${matched ? '#10b981' : '#cbd5e1'};">
                        <span style="font-size:18px;">${matched ? '☑️' : '⬜'}</span>
                        <div>
                          <div style="font-size:15px;font-weight:800;color:#0f2547;">Kebutuhan #${idx + 1}: ${ matched ? card.label : 'Belum ditemukan' }</div>
                          <div style="font-size:12px;color:#64748b;">${card.desc}</div>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>

              <button class="btn btn-cyan btn-lg" id="btn-verify-s5" style="width:100%;">
                Selesai &amp; Verifikasi Analisis →
              </button>
            </div>
          </div>
        </div>
      `;

      const placeCard = (id) => {
        if (!id || s5.placedIds.includes(id)) return;
        if (s5.placedIds.length >= 5) {
          DQAudio.playError();
          s5.fb = { type: 'hint', text: 'Ke-5 slot sudah penuh! Lepas salah satu kartu jika ingin menggantinya.' };
          this.renderScene5(root, app);
          return;
        }
        DQAudio.playDrop();
        s5.placedIds.push(id);
        s5.selectedCardId = null;
        s5.fb = null;
        this.renderScene5(root, app);
      };

      root.querySelectorAll('[data-evid]').forEach(el => {
        const id = el.getAttribute('data-evid');
        el.ondragstart = (e) => {
          DQAudio.playPickup();
          e.dataTransfer.setData('text/plain', id);
        };
        el.onclick = () => {
          placeCard(id);
        };
      });

      const board = root.querySelector('#detective-drop-board');
      board.ondragover = (e) => { e.preventDefault(); board.classList.add('drag-over'); };
      board.ondragleave = () => board.classList.remove('drag-over');
      board.ondrop = (e) => {
        e.preventDefault();
        board.classList.remove('drag-over');
        const id = e.dataTransfer.getData('text/plain');
        placeCard(id);
      };

      root.querySelectorAll('.remove-ev-btn').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          DQAudio.playClick();
          const id = btn.getAttribute('data-id');
          s5.placedIds = s5.placedIds.filter(x => x !== id);
          this.renderScene5(root, app);
        };
      });

      root.querySelector('#btn-reset-s5').onclick = () => {
        DQAudio.playClick();
        s5.placedIds = [];
        s5.fb = null;
        this.renderScene5(root, app);
      };

      root.querySelector('#btn-verify-s5').onclick = () => {
        if (s5.placedIds.length < 5) {
          DQAudio.playError();
          s5.fb = { type: 'error', text: `Masih ada slot kosong (${s5.placedIds.length}/5). Masukkan 5 dokumen kebutuhan klien!` };
          this.renderScene5(root, app);
          return;
        }
        const wrongItems = s5.placedIds.map(id => allCards.find(c => c.id === id)).filter(c => !c.valid);
        if (wrongItems.length === 0) {
          s5.fb = { type: 'success', text: 'Investigasi akurat! Ke-5 kebutuhan inti Sistem Perpustakaan berhasil diidentifikasi. Badge "Data Detective" diraih!' };
          app.unlockBadge('badge_detective');
          app.completeScene(5, true);
          this.renderScene5(root, app);
        } else {
          s5.attempts++;
          app.recordWrongAttempt(5);
          DQAudio.playError();
          const names = wrongItems.map(w => `"${w.label}"`).join(', ');
          const extra = s5.attempts >= 2 ? ' Lepas kartu pengecoh tersebut lalu masukkan dokumen transaksi/master perpustakaan!' : '';
          s5.fb = { type: 'error', text: `Terdapat data yang tidak relevan dengan database perpustakaan: ${names}.${extra}` };
          this.renderScene5(root, app);
        }
      };
    },

    /* ======================================================================
       SCENE 06: ENTITY ARCHITECT – IDENTIFIKASI ENTITAS
       ====================================================================== */
    renderScene6(root, app) {
      const st = app.state;
      if (!st.s6) {
        st.s6 = {
          placements: {}, // cardId -> 'Anggota' | 'Buku' | 'Petugas'
          selectedCardId: null,
          attempts: 0,
          fb: null
        };
      }
      const s6 = st.s6;
      const cards = DQData.ENTITY_CARDS;
      const unplaced = cards.filter(c => !s6.placements[c.id]);
      const entities = [
        { name: 'Anggota', color: 'green', icon: '🧑‍🎓', desc: 'Objek peminjam perpustakaan' },
        { name: 'Buku', color: 'blue', icon: '📘', desc: 'Objek pustaka yang dipinjam' },
        { name: 'Petugas', color: 'amber', icon: '🪪', desc: 'Objek pengelola layanan' }
      ];

      const allCorrect = cards.every(c => s6.placements[c.id] === c.target);

      root.innerHTML = `
        <div style="display:grid;grid-template-columns:420px 1fr;gap:24px;height:100%;">
          <!-- Left: Raw Data Cards -->
          <div class="glass-panel" style="padding:20px 22px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                <h3 style="font-size:21px;font-weight:900;color:#7dd3fc;">🗂️ Data Mentah (${unplaced.length} tersisa)</h3>
                <button class="btn btn-ghost btn-sm" id="btn-reset-s6">↺ Reset</button>
              </div>
              <p style="font-size:15px;color:#cbd5e1;margin-bottom:14px;">
                Klik sebuah atribut lalu klik kotak Entitas tujuan, atau seret langsung (Drag &amp; Drop):
              </p>
              <div style="display:flex;flex-direction:column;gap:8px;">
                ${unplaced.length === 0 ? `
                  <div style="background:rgba(16,185,129,0.18);border:1.5px solid #34d399;border-radius:14px;padding:18px;text-align:center;color:#d1fae5;font-weight:700;">
                    Semua atribut telah dikelompokkan! Periksa warna indikator pada tiap Entitas.
                  </div>
                ` : unplaced.map(c => `
                  <div class="draggable-chip ${s6.selectedCardId === c.id ? 'selected-chip' : ''}" draggable="true" data-cid="${c.id}" style="justify-content:space-between;padding:9px 14px;">
                    <span>🏷️ ${c.label}</span>
                    <span style="font-size:12px;color:#64748b;">Seret / Klik →</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="background:rgba(255,255,255,0.08);padding:14px;border-radius:14px;font-size:14px;color:#e0f2fe;">
              💡 <strong>Konsep Entitas vs Atribut:</strong> Entitas adalah objek utama yang berdiri sendiri, sedangkan Atribut adalah ciri/properti yang melekat pada entitas tersebut.
            </div>
          </div>

          <!-- Right: 3 Entity Buckets -->
          <div class="light-card" style="display:flex;flex-direction:column;overflow:hidden;">
            <div class="panel-header-bar">
              <span>🏗️ Kelompokkan menjadi Entitas &amp; Atribut</span>
              <span>Koreksi Langsung Aktif</span>
            </div>
            <div style="padding:22px 26px;flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:16px;">
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;flex:1;">
                ${entities.map(ent => {
                  const assigned = cards.filter(c => s6.placements[c.id] === ent.name);
                  return `
                    <div class="schema-table-card entity-drop-col" data-ent="${ent.name}" style="display:flex;flex-direction:column;">
                      <div class="schema-table-head ${ent.color}">
                        <span>${ent.icon} Entitas: ${ent.name}</span>
                        <span style="font-size:14px;">${assigned.length}/3</span>
                      </div>
                      <div style="padding:14px;flex:1;display:flex;flex-direction:column;gap:10px;background:${s6.selectedCardId ? '#eff6ff' : '#f8fafc'};">
                        <div style="font-size:13px;color:#64748b;font-weight:600;">${ent.desc}</div>
                        ${assigned.map(c => {
                          const ok = c.target === ent.name;
                          return `
                            <div class="draggable-chip ${ok ? 'correct-chip' : 'wrong-chip'}" data-remove="${c.id}" style="justify-content:space-between;cursor:pointer;" title="Klik untuk mengembalikan ke Data Mentah">
                              <span>${ok ? '✓' : '✕'} ${c.label}</span>
                              <span style="font-size:12px;font-weight:800;">${ok ? 'Tepat' : 'Salah'}</span>
                            </div>
                          `;
                        }).join('')}
                        <div style="margin-top:auto;border:2px dashed #93c5fd;border-radius:12px;padding:14px;text-align:center;color:#0284c7;font-weight:800;font-size:14px;cursor:pointer;">
                          + Drop atribut ${ent.name} di sini
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>

              ${renderFeedback(s6.fb || (allCorrect ? { type: 'success', text: 'Bagus! Seluruh Entitas dan Atribut sudah dikelompokkan dengan tepat!' } : null))}
            </div>
          </div>
        </div>
      `;

      const assignToEntity = (cardId, entName) => {
        const card = cards.find(c => c.id === cardId);
        if (!card) return;
        s6.placements[cardId] = entName;
        s6.selectedCardId = null;

        if (card.target === entName) {
          DQAudio.playDrop();
          s6.fb = { type: 'success', text: `Tepat! Atribut "${card.label}" memang menjelaskan Entitas ${entName}.` };
        } else {
          s6.attempts++;
          app.recordWrongAttempt(6);
          DQAudio.playError();
          const extra = s6.attempts >= 2 ? ` (Petunjuk: atribut "${card.label}" seharusnya milik Entitas ${card.target})` : '';
          s6.fb = { type: 'error', text: `Kurang tepat: "${card.label}" bukan atribut dari ${entName}! Klik kartu merah tersebut untuk memindahkannya.${extra}` };
        }

        if (cards.every(c => s6.placements[c.id] === c.target)) {
          s6.fb = { type: 'success', text: 'Bagus! Seluruh Entitas (Anggota, Buku, Petugas) beserta atributnya sudah tepat! Klik Lanjutkan.' };
          app.completeScene(6, true);
        }
        this.renderScene6(root, app);
      };

      root.querySelectorAll('[data-cid]').forEach(el => {
        const cid = el.getAttribute('data-cid');
        el.ondragstart = (e) => {
          DQAudio.playPickup();
          e.dataTransfer.setData('text/plain', cid);
        };
        el.onclick = () => {
          DQAudio.playClick();
          s6.selectedCardId = s6.selectedCardId === cid ? null : cid;
          this.renderScene6(root, app);
        };
      });

      root.querySelectorAll('.entity-drop-col').forEach(col => {
        const entName = col.getAttribute('data-ent');
        col.ondragover = (e) => { e.preventDefault(); col.style.boxShadow = '0 0 0 4px #38bdf8'; };
        col.ondragleave = () => { col.style.boxShadow = ''; };
        col.ondrop = (e) => {
          e.preventDefault();
          col.style.boxShadow = '';
          const cid = e.dataTransfer.getData('text/plain');
          if (cid) assignToEntity(cid, entName);
        };
        col.onclick = () => {
          if (s6.selectedCardId) {
            assignToEntity(s6.selectedCardId, entName);
          }
        };
      });

      root.querySelectorAll('[data-remove]').forEach(chip => {
        chip.onclick = (e) => {
          e.stopPropagation();
          DQAudio.playClick();
          delete s6.placements[chip.getAttribute('data-remove')];
          this.renderScene6(root, app);
        };
      });

      root.querySelector('#btn-reset-s6').onclick = () => {
        DQAudio.playClick();
        s6.placements = {};
        s6.selectedCardId = null;
        s6.fb = null;
        this.renderScene6(root, app);
      };
    },

    /* ======================================================================
       SCENE 07: KEY MASTER – PRIMARY KEY & FOREIGN KEY
       ====================================================================== */
    renderScene7(root, app) {
      const st = app.state;
      if (!st.s7) {
        st.s7 = {
          pkAnggota: '',
          pkPeminjaman: '',
          pkBuku: '',
          fkPeminjaman: {}, // col -> bool
          relAnggotaPinjam: false,
          relBukuPinjam: false,
          attempts: 0,
          fb: null
        };
      }
      const s7 = st.s7;

      const anggotaCols = ['id_anggota', 'nama', 'alamat', 'telepon'];
      const pinjamCols = ['id_pinjam', 'id_anggota', 'id_buku', 'tgl_pinjam', 'tgl_kembali'];
      const bukuCols = ['id_buku', 'judul', 'pengarang', 'penerbit'];

      root.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:18px;height:100%;justify-content:space-between;">
          <!-- Top Diagram Area: 3 Tables + Interactive Relation Connectors -->
          <div class="glass-panel" style="padding:24px 30px;flex:1;display:flex;flex-direction:column;justify-content:space-between;position:relative;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div style="font-size:20px;font-weight:800;color:#e0f2fe;">
                🔑 Klik tombol <strong>PK</strong> untuk memilih Primary Key tiap tabel, tombol <strong>FK</strong> pada tabel PEMINJAMAN, lalu hubungkan garis relasi!
              </div>
              <span style="font-size:14px;color:#fde68a;font-weight:700;">PK = Identitas Unik | FK = Kunci Tamu Penghubung</span>
            </div>

            <div style="display:grid;grid-template-columns:1fr 170px 1.15fr 170px 1fr;align-items:center;gap:10px;margin:auto 0;">
              <!-- Table 1: ANGGOTA -->
              <div class="schema-table-card">
                <div class="schema-table-head blue"><span>🧑‍🎓 ANGGOTA</span><span>Master</span></div>
                ${anggotaCols.map(col => `
                  <div class="schema-col-row">
                    <span>${s7.pkAnggota === col ? '🔑 ' : ''}${col}</span>
                    <button class="key-badge pk" data-setpk="anggota:${col}" style="cursor:pointer;opacity:${s7.pkAnggota === col ? 1 : 0.42};">
                      ${s7.pkAnggota === col ? '✓ PK Aktif' : 'Set PK'}
                    </button>
                  </div>
                `).join('')}
              </div>

              <!-- Connector 1: ANGGOTA <-> PEMINJAMAN -->
              <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
                <span style="font-size:14px;font-weight:800;color:#bae6fd;">1 .. N</span>
                <button type="button" id="btn-rel-left" style="width:100%;padding:10px 8px;border-radius:12px;border:2px solid ${s7.relAnggotaPinjam ? '#34d399' : '#60a5fa'};background:${s7.relAnggotaPinjam ? '#065f46' : 'rgba(15,48,105,0.8)'};color:#fff;font-weight:800;cursor:pointer;font-size:13px;">
                  ${s7.relAnggotaPinjam ? '🔗 Terhubung (1:N)' : '⚡ Klik Hubungkan'}
                </button>
                <svg width="150" height="22" viewBox="0 0 150 22">
                  <line x1="6" y1="11" x2="144" y2="11" stroke="${s7.relAnggotaPinjam ? '#34d399' : '#64748b'}" stroke-width="4" stroke-dasharray="${s7.relAnggotaPinjam ? 'none' : '7 6'}" />
                  <circle cx="8" cy="11" r="5" fill="#fbbf24" />
                  <circle cx="142" cy="11" r="5" fill="#38bdf8" />
                </svg>
              </div>

              <!-- Table 2: PEMINJAMAN -->
              <div class="schema-table-card" style="border-color:#a855f7;">
                <div class="schema-table-head purple"><span>📋 PEMINJAMAN</span><span>Transaksi</span></div>
                ${pinjamCols.map(col => {
                  const isPk = s7.pkPeminjaman === col;
                  const isFk = !!s7.fkPeminjaman[col];
                  return `
                    <div class="schema-col-row">
                      <span>${isPk ? '🔑 ' : ''}${isFk ? '🔗 ' : ''}${col}</span>
                      <div style="display:flex;gap:6px;">
                        <button class="key-badge pk" data-setpk="pinjam:${col}" style="cursor:pointer;opacity:${isPk ? 1 : 0.4};">
                          ${isPk ? '✓ PK' : 'PK'}
                        </button>
                        <button class="key-badge fk" data-setfk="${col}" style="cursor:pointer;opacity:${isFk ? 1 : 0.4};">
                          ${isFk ? '✓ FK' : 'FK'}
                        </button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Connector 2: PEMINJAMAN <-> BUKU -->
              <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
                <span style="font-size:14px;font-weight:800;color:#bae6fd;">N .. 1</span>
                <button type="button" id="btn-rel-right" style="width:100%;padding:10px 8px;border-radius:12px;border:2px solid ${s7.relBukuPinjam ? '#34d399' : '#60a5fa'};background:${s7.relBukuPinjam ? '#065f46' : 'rgba(15,48,105,0.8)'};color:#fff;font-weight:800;cursor:pointer;font-size:13px;">
                  ${s7.relBukuPinjam ? '🔗 Terhubung (N:1)' : '⚡ Klik Hubungkan'}
                </button>
                <svg width="150" height="22" viewBox="0 0 150 22">
                  <line x1="6" y1="11" x2="144" y2="11" stroke="${s7.relBukuPinjam ? '#34d399' : '#64748b'}" stroke-width="4" stroke-dasharray="${s7.relBukuPinjam ? 'none' : '7 6'}" />
                  <circle cx="8" cy="11" r="5" fill="#38bdf8" />
                  <circle cx="142" cy="11" r="5" fill="#fbbf24" />
                </svg>
              </div>

              <!-- Table 3: BUKU -->
              <div class="schema-table-card">
                <div class="schema-table-head amber"><span>📘 BUKU</span><span>Master</span></div>
                ${bukuCols.map(col => `
                  <div class="schema-col-row">
                    <span>${s7.pkBuku === col ? '🔑 ' : ''}${col}</span>
                    <button class="key-badge pk" data-setpk="buku:${col}" style="cursor:pointer;opacity:${s7.pkBuku === col ? 1 : 0.42};">
                      ${s7.pkBuku === col ? '✓ PK Aktif' : 'Set PK'}
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>

            ${renderFeedback(s7.fb)}
          </div>

          <!-- Bottom Checklist & Verify Bar (matching Collage 07) -->
          <div style="display:grid;grid-template-columns:1fr 520px;gap:22px;">
            <div class="light-card" style="padding:18px 24px;display:flex;align-items:center;justify-content:space-between;">
              <div>
                <div style="font-size:17px;font-weight:900;color:#0f2547;margin-bottom:8px;">Daftar Pemeriksaan Kunci Relasional:</div>
                <div style="display:flex;gap:18px;font-size:15px;font-weight:700;color:#334155;flex-wrap:wrap;">
                  <span>${s7.pkAnggota === 'id_anggota' ? '✅' : '⚪'} PK Tabel ANGGOTA</span>
                  <span>${s7.pkPeminjaman === 'id_pinjam' ? '✅' : '⚪'} PK Tabel PEMINJAMAN</span>
                  <span>${s7.pkBuku === 'id_buku' ? '✅' : '⚪'} PK Tabel BUKU</span>
                  <span>${(s7.fkPeminjaman.id_anggota && s7.fkPeminjaman.id_buku && Object.values(s7.fkPeminjaman).filter(Boolean).length === 2) ? '✅' : '⚪'} 2 Foreign Key di PEMINJAMAN</span>
                </div>
              </div>
            </div>

            <div class="light-card" style="padding:18px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
              <div>
                <div style="font-size:16px;font-weight:800;color:#0f2547;">Status Garis Relasi</div>
                <div style="font-size:14px;color:#475569;font-weight:600;">${(s7.relAnggotaPinjam && s7.relBukuPinjam) ? 'Kedua relasi antartabel aktif!' : 'Aktifkan kedua jembatan relasi'}</div>
              </div>
              <button class="btn btn-cyan btn-lg" id="btn-verify-s7">Periksa Kunci &amp; Relasi</button>
            </div>
          </div>
        </div>
      `;

      root.querySelectorAll('[data-setpk]').forEach(btn => {
        btn.onclick = () => {
          DQAudio.playClick();
          const [tbl, col] = btn.getAttribute('data-setpk').split(':');
          if (tbl === 'anggota') s7.pkAnggota = col;
          if (tbl === 'pinjam') {
            s7.pkPeminjaman = col;
            s7.fkPeminjaman[col] = false;
          }
          if (tbl === 'buku') s7.pkBuku = col;
          this.renderScene7(root, app);
        };
      });

      root.querySelectorAll('[data-setfk]').forEach(btn => {
        btn.onclick = () => {
          DQAudio.playClick();
          const col = btn.getAttribute('data-setfk');
          s7.fkPeminjaman[col] = !s7.fkPeminjaman[col];
          if (s7.fkPeminjaman[col] && s7.pkPeminjaman === col) {
            s7.pkPeminjaman = '';
          }
          this.renderScene7(root, app);
        };
      });

      root.querySelector('#btn-rel-left').onclick = () => {
        DQAudio.playDrop();
        s7.relAnggotaPinjam = !s7.relAnggotaPinjam;
        this.renderScene7(root, app);
      };
      root.querySelector('#btn-rel-right').onclick = () => {
        DQAudio.playDrop();
        s7.relBukuPinjam = !s7.relBukuPinjam;
        this.renderScene7(root, app);
      };

      root.querySelector('#btn-verify-s7').onclick = () => {
        const fkKeys = Object.keys(s7.fkPeminjaman).filter(k => s7.fkPeminjaman[k]);
        const pkOk = s7.pkAnggota === 'id_anggota' && s7.pkPeminjaman === 'id_pinjam' && s7.pkBuku === 'id_buku';
        const fkOk = fkKeys.length === 2 && s7.fkPeminjaman.id_anggota && s7.fkPeminjaman.id_buku;
        const relOk = s7.relAnggotaPinjam && s7.relBukuPinjam;

        if (pkOk && fkOk && relOk) {
          s7.fb = { type: 'success', text: 'Sempurna! Primary Key menjadi identitas unik tiap tabel, dan Foreign Key menghubungkan transaksi PEMINJAMAN dengan ANGGOTA & BUKU!' };
          app.completeScene(7, true);
        } else {
          s7.attempts++;
          app.recordWrongAttempt(7);
          DQAudio.playError();
          let msg = 'Masih ada pengaturan kunci atau relasi yang belum tepat: ';
          if (!pkOk) msg += 'Pastikan PK adalah kolom id utama di masing-masing tabel (id_anggota, id_pinjam, id_buku). ';
          else if (!fkOk) msg += 'Pada PEMINJAMAN, tandai tepat 2 Foreign Key yaitu id_anggota dan id_buku. ';
          else if (!relOk) msg += 'Klik kedua tombol penghubung relasi (1..N dan N..1) di antara tabel!';
          if (s7.attempts >= 2) {
            msg += ' 💡 Petunjuk: Jangan menandai tgl_pinjam atau id_pinjam sebagai FK.';
          }
          s7.fb = { type: 'error', text: msg };
        }
        this.renderScene7(root, app);
      };
    },

    /* ======================================================================
       SCENE 08: ERD ARCHITECT – MEMBANGUN ERD
       ====================================================================== */
    renderScene8(root, app) {
      const st = app.state;
      if (!st.s8) {
        st.s8 = {
          leftEntity: 'ANGGOTA',
          midEntity: '',
          rightEntity: '',
          rel1Name: 'Melakukan',
          rel2Name: '',
          card1: '',
          card2: '',
          attempts: 0,
          fb: null
        };
      }
      const s8 = st.s8;

      root.innerHTML = `
        <div style="display:grid;grid-template-columns:330px 1fr;gap:22px;height:100%;">
          <!-- Left Toolbox Sidebar (matching Collage 08) -->
          <div class="glass-panel" style="padding:20px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="font-size:19px;font-weight:900;color:#7dd3fc;margin-bottom:12px;">🧰 Palet Komponen ERD</div>

              <div style="font-size:13px;font-weight:800;color:#fde68a;margin-bottom:6px;text-transform:uppercase;">1. Komponen Entitas</div>
              <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;">
                <button class="btn btn-ghost btn-sm" id="add-ent-pinjam" style="justify-content:flex-start;">🟦 Pasang Entitas: PEMINJAMAN</button>
                <button class="btn btn-ghost btn-sm" id="add-ent-buku" style="justify-content:flex-start;">🟩 Pasang Entitas: BUKU</button>
              </div>

              <div style="font-size:13px;font-weight:800;color:#fde68a;margin-bottom:6px;text-transform:uppercase;">2. Simbol Relasi (Belah Ketupat)</div>
              <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px;">
                <button class="btn btn-ghost btn-sm" id="set-rel2-memiliki" style="justify-content:flex-start;">💠 Pasang Relasi: Memiliki</button>
              </div>

              <div style="font-size:13px;font-weight:800;color:#fde68a;margin-bottom:6px;text-transform:uppercase;">3. Panduan Kardinalitas</div>
              <div style="background:rgba(255,255,255,0.08);border-radius:12px;padding:12px;font-size:13.5px;color:#e2e8f0;line-height:1.45;">
                • <strong>1 : 1</strong> → Satu ke Satu<br/>
                • <strong>1 : N</strong> → Satu Anggota bisa melakukan Banyak Peminjaman<br/>
                • <strong>N : 1</strong> → Banyak baris Peminjaman merujuk ke 1 katalog Buku (atau 1 Buku dipinjam berkali-kali)
              </div>
            </div>

            <button class="btn btn-ghost btn-sm" id="btn-autofill-guide-s8" style="opacity:0.9;">↺ Reset Kanvas ERD</button>
          </div>

          <!-- Right ERD Blueprint Canvas -->
          <div style="display:flex;flex-direction:column;gap:14px;height:100%;">
            <div class="erd-blueprint-canvas" style="flex:1;padding:24px 28px;display:flex;flex-direction:column;justify-content:space-between;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="background:#0284c7;color:#fff;font-weight:800;padding:6px 16px;border-radius:999px;font-size:15px;">
                  📐 Kanvas ERD Builder – Sistem Informasi Perpustakaan
                </span>
                <span style="font-size:14px;font-weight:700;color:#334155;">
                  Lengkapi kotak Entitas, Relasi, dan dropdown Kardinalitas di bawah ini!
                </span>
              </div>

              <!-- Interactive Horizontal ERD Graph -->
              <div style="position:relative;display:grid;grid-template-columns:255px 1fr 265px 1fr 255px;align-items:center;gap:8px;margin:auto 0;">
                <!-- Background ERD Connector Line -->
                <div style="position:absolute;left:180px;right:180px;top:52%;height:4px;background:linear-gradient(90deg,#0284c7,#16a34a,#0284c7);z-index:0;border-radius:4px;"></div>

                <!-- Entity 1: ANGGOTA -->
                <div class="schema-table-card" style="position:relative;z-index:2;">
                  <div class="schema-table-head blue"><span>ANGGOTA</span></div>
                  <div class="schema-col-row"><span>🔑 id_anggota</span></div>
                  <div class="schema-col-row"><span>• nama</span></div>
                  <div class="schema-col-row"><span>• alamat</span></div>
                  <div class="schema-col-row"><span>• telepon</span></div>
                </div>

                <!-- Relation 1 + Cardinality 1 -->
                <div style="display:flex;flex-direction:column;align-items:center;gap:10px;position:relative;z-index:2;">
                  <select id="sel-card-1" class="dq-select" style="padding:6px 10px;font-size:15px;text-align:center;width:130px;">
                    <option value="" ${s8.card1 === '' ? 'selected' : ''}>Kardinalitas?</option>
                    <option value="1:1" ${s8.card1 === '1:1' ? 'selected' : ''}>1 : 1</option>
                    <option value="1:N" ${s8.card1 === '1:N' ? 'selected' : ''}>1 : N</option>
                    <option value="M:N" ${s8.card1 === 'M:N' ? 'selected' : ''}>M : N</option>
                  </select>
                  <div class="erd-diamond">${s8.rel1Name}</div>
                  <span style="font-size:12px;font-weight:800;color:#475569;">ANGGOTA → PEMINJAMAN</span>
                </div>

                <!-- Entity 2: PEMINJAMAN (Selectable) -->
                <div class="schema-table-card" style="position:relative;z-index:2;border-style:${s8.midEntity ? 'solid' : 'dashed'};">
                  <div class="schema-table-head ${s8.midEntity === 'PEMINJAMAN' ? 'blue' : 'purple'}">
                    <span>${s8.midEntity || 'Pilih Entitas Tengah'}</span>
                  </div>
                  <div style="padding:12px;">
                    <select id="sel-mid-ent" class="dq-select" style="padding:8px;font-size:15px;margin-bottom:8px;">
                      <option value="" ${s8.midEntity === '' ? 'selected' : ''}>-- Pilih Entitas --</option>
                      <option value="PEMINJAMAN" ${s8.midEntity === 'PEMINJAMAN' ? 'selected' : ''}>PEMINJAMAN</option>
                      <option value="KANTIN" ${s8.midEntity === 'KANTIN' ? 'selected' : ''}>KANTIN (Salah)</option>
                    </select>
                    ${s8.midEntity === 'PEMINJAMAN' ? `
                      <div style="font-size:14px;font-weight:700;color:#1e293b;line-height:1.6;">
                        🔑 id_pinjam<br/>🔗 id_anggota (FK)<br/>🔗 id_buku (FK)<br/>• tgl_pinjam &amp; tgl_kembali
                      </div>
                    ` : `<div style="font-size:13px;color:#64748b;text-align:center;padding:18px 0;">Klik palet kiri atau dropdown untuk memasang entitas</div>`}
                  </div>
                </div>

                <!-- Relation 2 + Cardinality 2 -->
                <div style="position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:10px;">
                  <select id="sel-card-2" class="dq-select" style="padding:6px 10px;font-size:15px;text-align:center;width:130px;">
                    <option value="" ${s8.card2 === '' ? 'selected' : ''}>Kardinalitas?</option>
                    <option value="1:1" ${s8.card2 === '1:1' ? 'selected' : ''}>1 : 1</option>
                    <option value="N:1" ${s8.card2 === 'N:1' ? 'selected' : ''}>N : 1 (ke Buku)</option>
                    <option value="1:N_rev" ${s8.card2 === '1:N_rev' ? 'selected' : ''}>1 Buku : N Pinjam</option>
                  </select>
                  <div class="erd-diamond" id="diamond-rel-2" style="background:${s8.rel2Name ? 'linear-gradient(180deg,#dcfce7,#86efac)' : '#e2e8f0'};border-color:${s8.rel2Name ? '#16a34a' : '#94a3b8'};">
                    ${s8.rel2Name || 'Klik Relasi?'}
                  </div>
                  <span style="font-size:12px;font-weight:800;color:#475569;">PEMINJAMAN ↔ BUKU</span>
                </div>

                <!-- Entity 3: BUKU (Selectable) -->
                <div class="schema-table-card" style="position:relative;z-index:2;border-style:${s8.rightEntity ? 'solid' : 'dashed'};">
                  <div class="schema-table-head green">
                    <span>${s8.rightEntity || 'Pilih Entitas Kanan'}</span>
                  </div>
                  <div style="padding:12px;">
                    <select id="sel-right-ent" class="dq-select" style="padding:8px;font-size:15px;margin-bottom:8px;">
                      <option value="" ${s8.rightEntity === '' ? 'selected' : ''}>-- Pilih Entitas --</option>
                      <option value="BUKU" ${s8.rightEntity === 'BUKU' ? 'selected' : ''}>BUKU</option>
                      <option value="GEDUNG" ${s8.rightEntity === 'GEDUNG' ? 'selected' : ''}>GEDUNG (Salah)</option>
                    </select>
                    ${s8.rightEntity === 'BUKU' ? `
                      <div style="font-size:14px;font-weight:700;color:#1e293b;line-height:1.6;">
                        🔑 id_buku<br/>• judul<br/>• pengarang<br/>• penerbit
                      </div>
                    ` : `<div style="font-size:13px;color:#64748b;text-align:center;padding:18px 0;">Pasang entitas pustaka yang dipinjam</div>`}
                  </div>
                </div>
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;gap:16px;">
                <div style="flex:1;">${renderFeedback(s8.fb)}</div>
                <button class="btn btn-cyan btn-lg" id="btn-check-erd">Periksa ERD !</button>
              </div>
            </div>
          </div>
        </div>
      `;

      root.querySelector('#add-ent-pinjam').onclick = () => { DQAudio.playDrop(); s8.midEntity = 'PEMINJAMAN'; this.renderScene8(root, app); };
      root.querySelector('#add-ent-buku').onclick = () => { DQAudio.playDrop(); s8.rightEntity = 'BUKU'; this.renderScene8(root, app); };
      root.querySelector('#set-rel2-memiliki').onclick = () => { DQAudio.playDrop(); s8.rel2Name = 'Memiliki'; this.renderScene8(root, app); };
      root.querySelector('#diamond-rel-2').onclick = () => { DQAudio.playDrop(); s8.rel2Name = 'Memiliki'; this.renderScene8(root, app); };

      root.querySelector('#sel-mid-ent').onchange = (e) => { DQAudio.playClick(); s8.midEntity = e.target.value; this.renderScene8(root, app); };
      root.querySelector('#sel-right-ent').onchange = (e) => { DQAudio.playClick(); s8.rightEntity = e.target.value; this.renderScene8(root, app); };
      root.querySelector('#sel-card-1').onchange = (e) => { DQAudio.playClick(); s8.card1 = e.target.value; this.renderScene8(root, app); };
      root.querySelector('#sel-card-2').onchange = (e) => { DQAudio.playClick(); s8.card2 = e.target.value; this.renderScene8(root, app); };

      root.querySelector('#btn-autofill-guide-s8').onclick = () => {
        DQAudio.playClick();
        st.s8 = null;
        this.renderScene8(root, app);
      };

      root.querySelector('#btn-check-erd').onclick = () => {
        const entOk = s8.midEntity === 'PEMINJAMAN' && s8.rightEntity === 'BUKU';
        const relOk = s8.rel2Name === 'Memiliki';
        const cardOk = s8.card1 === '1:N' && (s8.card2 === 'N:1' || s8.card2 === '1:N_rev');

        if (entOk && relOk && cardOk) {
          s8.fb = { type: 'success', text: 'ERD sudah benar! Relasi ANGGOTA (1) — Melakukan — (N) PEMINJAMAN (N) — Memiliki — (1) BUKU valid! Badge "ERD Architect" terbuka!' };
          app.unlockBadge('badge_architect');
          app.completeScene(8, true);
        } else {
          s8.attempts++;
          app.recordWrongAttempt(8);
          DQAudio.playError();
          let err = 'Rancangan ERD belum lengkap/tepat: ';
          if (!entOk) err += 'Pilih entitas PEMINJAMAN di tengah dan BUKU di kanan. ';
          else if (!relOk) err += 'Klik simbol belah ketupat kanan atau tombol di palet untuk menamai relasi "Memiliki". ';
          else if (!cardOk) err += 'Periksa kardinalitas! Satu Anggota bisa melakukan Banyak Peminjaman (1:N), dan Banyak Peminjaman merujuk ke Buku (N:1).';
          if (s8.attempts >= 2) err += ' 💡 Gunakan palet kiri untuk memasang PEMINJAMAN, BUKU, dan relasi Memiliki.';
          s8.fb = { type: 'error', text: err };
        }
        this.renderScene8(root, app);
      };
    }
  };

  window.DQScenes1to8 = Scenes1to8;
})();
