/* ==========================================================================
   DATAQUEST SCENES 09 – 15 RENDERERS & INTERACTIVE CONTROLLERS
   ========================================================================== */

(function () {
  function renderFeedback(fb) {
    if (!fb) return '';
    return `
      <div class="feedback-banner ${fb.type}">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="font-size:24px;">${fb.type === 'success' ? '✅' : fb.type === 'hint' ? '💡' : '⚠️'}</span>
          <span>${fb.text}</span>
        </div>
      </div>`;
  }

  const Scenes9to15 = {
    /* ======================================================================
       SCENE 09: TABLE ENGINEER – TRANSFORMASI ERD
       ====================================================================== */
    renderScene9(root, app) {
      const st = app.state;
      if (!st.s9) {
        st.s9 = {
          fkPlacement: '',
          tglType: '',
          idType: '',
          relRule: '',
          attempts: 0,
          fb: null
        };
      }
      const s9 = st.s9;
      const stepDone = [
        true,
        s9.idType === 'VARCHAR(10)' && s9.tglType === 'DATE',
        s9.fkPlacement === 'peminjaman',
        s9.relRule === 'one_to_many_fk'
      ];

      root.innerHTML = `
        <div style="display:grid;grid-template-columns:430px 1fr;gap:24px;height:100%;">
          <!-- Left: Mini ERD Reference -->
          <div class="light-card" style="display:flex;flex-direction:column;overflow:hidden;">
            <div class="panel-header-bar">
              <span>📐 Acuan Diagram ERD</span>
            </div>
            <div style="padding:20px;flex:1;display:flex;flex-direction:column;justify-content:space-between;background:#f8fbff;">
              <div style="display:flex;flex-direction:column;align-items:center;gap:10px;margin:auto 0;">
                <div class="schema-table-card" style="width:100%;">
                  <div class="schema-table-head blue"><span>ANGGOTA (Sisi 1)</span></div>
                  <div class="schema-col-row"><span>🔑 id_anggota, nama, alamat, telepon</span></div>
                </div>
                <div class="erd-diamond" style="height:64px;width:130px;font-size:14px;">Melakukan (1:N)</div>
                <div class="schema-table-card" style="width:100%;border-color:#7c3aed;">
                  <div class="schema-table-head purple"><span>PEMINJAMAN (Sisi N)</span></div>
                  <div class="schema-col-row"><span>🔑 id_pinjam, tgl_pinjam, tgl_kembali</span></div>
                </div>
                <div class="erd-diamond" style="height:64px;width:130px;font-size:14px;">Memiliki (N:1)</div>
                <div class="schema-table-card" style="width:100%;">
                  <div class="schema-table-head green"><span>BUKU (Sisi 1)</span></div>
                  <div class="schema-col-row"><span>🔑 id_buku, judul, pengarang, penerbit</span></div>
                </div>
              </div>

              <div style="background:#dbeafe;border-radius:12px;padding:12px 14px;font-size:14px;color:#1e3a8a;font-weight:700;">
                💡 Perhatikan sisi <strong>1</strong> dan sisi <strong>N</strong> saat menerjemahkan ERD menjadi Tabel Relasional!
              </div>
            </div>
          </div>

          <!-- Right: Relational Table Transformation Workspace -->
          <div class="light-card" style="display:flex;flex-direction:column;overflow:hidden;">
            <div class="panel-header-bar">
              <span>⚙️ Tabel Relasional Hasil Transformasi</span>
              <span>Table Engineer Lab</span>
            </div>
            <div style="padding:20px 26px;flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
              <!-- 3 Relational Tables Preview -->
              <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
                <div class="schema-table-card">
                  <div class="schema-table-head blue"><span>anggota</span></div>
                  <div class="schema-col-row"><span>🔑 id_anggota (PK)</span><span class="key-badge pk">${s9.idType || '?'}</span></div>
                  <div class="schema-col-row"><span>nama</span><span>VARCHAR</span></div>
                  <div class="schema-col-row"><span>alamat</span><span>TEXT</span></div>
                  <div class="schema-col-row"><span>telepon</span><span>VARCHAR</span></div>
                </div>

                <div class="schema-table-card" style="border-color:#0284c7;">
                  <div class="schema-table-head purple"><span>peminjaman</span></div>
                  <div class="schema-col-row"><span>🔑 id_pinjam (PK)</span><span>VARCHAR</span></div>
                  <div class="schema-col-row" style="background:${s9.fkPlacement === 'peminjaman' ? '#ecfdf5' : '#fff7ed'};">
                    <span>🔗 ${s9.fkPlacement === 'peminjaman' ? 'id_anggota & id_buku (FK)' : 'Pilih penempatan FK...'}</span>
                  </div>
                  <div class="schema-col-row"><span>tgl_pinjam</span><span class="key-badge fk">${s9.tglType || '?'}</span></div>
                  <div class="schema-col-row"><span>tgl_kembali</span><span class="key-badge fk">${s9.tglType || '?'}</span></div>
                </div>

                <div class="schema-table-card">
                  <div class="schema-table-head green"><span>buku</span></div>
                  <div class="schema-col-row"><span>🔑 id_buku (PK)</span><span class="key-badge pk">${s9.idType || '?'}</span></div>
                  <div class="schema-col-row"><span>judul</span><span>VARCHAR</span></div>
                  <div class="schema-col-row"><span>pengarang</span><span>VARCHAR</span></div>
                  <div class="schema-col-row"><span>penerbit</span><span>VARCHAR</span></div>
                </div>
              </div>

              <!-- Transformation Configuration Questions -->
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;background:#f1f7ff;padding:16px 18px;border-radius:16px;border:1.5px solid #bfdbfe;">
                <div>
                  <label style="font-size:14px;font-weight:800;color:#1e3a8a;display:block;margin-bottom:6px;">1. Di tabel mana Foreign Key (id_anggota &amp; id_buku) ditempatkan?</label>
                  <select id="s9-fk" class="dq-select" style="padding:10px;font-size:15px;">
                    <option value="">-- Pilih Tabel Tujuan FK --</option>
                    <option value="anggota" ${s9.fkPlacement === 'anggota' ? 'selected' : ''}>Di tabel anggota &amp; buku (Sisi 1)</option>
                    <option value="peminjaman" ${s9.fkPlacement === 'peminjaman' ? 'selected' : ''}>Di tabel peminjaman (Sisi N / Transaksi)</option>
                  </select>
                </div>

                <div>
                  <label style="font-size:14px;font-weight:800;color:#1e3a8a;display:block;margin-bottom:6px;">2. Tipe data SQL yang tepat untuk kode ID (misal 'B001'):</label>
                  <select id="s9-idtype" class="dq-select" style="padding:10px;font-size:15px;">
                    <option value="">-- Pilih Tipe Data ID --</option>
                    <option value="VARCHAR(10)" ${s9.idType === 'VARCHAR(10)' ? 'selected' : ''}>VARCHAR(10) / CHAR</option>
                    <option value="BOOLEAN" ${s9.idType === 'BOOLEAN' ? 'selected' : ''}>BOOLEAN (True/False)</option>
                  </select>
                </div>

                <div>
                  <label style="font-size:14px;font-weight:800;color:#1e3a8a;display:block;margin-bottom:6px;">3. Tipe data SQL untuk tgl_pinjam &amp; tgl_kembali:</label>
                  <select id="s9-tgltype" class="dq-select" style="padding:10px;font-size:15px;">
                    <option value="">-- Pilih Tipe Tanggal --</option>
                    <option value="DATE" ${s9.tglType === 'DATE' ? 'selected' : ''}>DATE (YYYY-MM-DD)</option>
                    <option value="BLOB" ${s9.tglType === 'BLOB' ? 'selected' : ''}>BLOB (File Biner)</option>
                  </select>
                </div>

                <div>
                  <label style="font-size:14px;font-weight:800;color:#1e3a8a;display:block;margin-bottom:6px;">4. Alasan teknis penempatan Foreign Key pada relasi 1:N:</label>
                  <select id="s9-rule" class="dq-select" style="padding:10px;font-size:15px;">
                    <option value="">-- Pilih Prinsip Transformasi --</option>
                    <option value="one_to_many_fk" ${s9.relRule === 'one_to_many_fk' ? 'selected' : ''}>PK sisi '1' menjadi FK di sisi 'N' agar tidak ada kolom berulang</option>
                    <option value="random_fk" ${s9.relRule === 'random_fk' ? 'selected' : ''}>Ditempatkan bebas di tabel mana saja</option>
                  </select>
                </div>
              </div>

              ${renderFeedback(s9.fb)}

              <!-- Bottom Pipeline Progress Bar (matching Collage 09) -->
              <div style="display:flex;align-items:center;justify-content:space-between;background:#e0f2fe;padding:12px 20px;border-radius:14px;">
                <div style="display:flex;align-items:center;gap:14px;font-size:15px;font-weight:800;color:#0f2547;">
                  <span>✅ ERD</span> <span>→</span>
                  <span>${stepDone[1] ? '✅' : '⚪'} Tipe Kolom</span> <span>→</span>
                  <span>${stepDone[2] ? '✅' : '⚪'} PK &amp; FK</span> <span>→</span>
                  <span>${stepDone[3] ? '✅' : '⚪'} Aturan Relasi</span>
                </div>
                <button class="btn btn-cyan" id="btn-verify-s9">Verifikasi Transformasi →</button>
              </div>
            </div>
          </div>
        </div>
      `;

      root.querySelector('#s9-fk').onchange = (e) => { DQAudio.playClick(); s9.fkPlacement = e.target.value; this.renderScene9(root, app); };
      root.querySelector('#s9-idtype').onchange = (e) => { DQAudio.playClick(); s9.idType = e.target.value; this.renderScene9(root, app); };
      root.querySelector('#s9-tgltype').onchange = (e) => { DQAudio.playClick(); s9.tglType = e.target.value; this.renderScene9(root, app); };
      root.querySelector('#s9-rule').onchange = (e) => { DQAudio.playClick(); s9.relRule = e.target.value; this.renderScene9(root, app); };

      root.querySelector('#btn-verify-s9').onclick = () => {
        if (stepDone.every(Boolean)) {
          s9.fb = { type: 'success', text: 'Transformasi ERD ke Tabel Relasional tepat 100%! Struktur siap diuji pada Normalization Lab.' };
          app.completeScene(9, true);
        } else {
          s9.attempts++;
          app.recordWrongAttempt(9);
          DQAudio.playError();
          const extra = s9.attempts >= 2 ? ' 💡 Petunjuk: Pilih tabel peminjaman (Sisi N), VARCHAR(10), DATE, dan prinsip PK sisi 1 menjadi FK di sisi N!' : '';
          s9.fb = { type: 'error', text: 'Masih ada pilihan transformasi yang belum tepat. Periksa kembali penempatan FK dan tipe data!' + extra };
        }
        this.renderScene9(root, app);
      };
    },

    /* ======================================================================
       SCENE 10: NORMALIZATION LAB – NORMALISASI DATABASE (1NF, 2NF, 3NF)
       ====================================================================== */
    renderScene10(root, app) {
      const st = app.state;
      if (!st.s10) {
        st.s10 = {
          activeStage: 1, // 1, 2, 3
          solved: { 1: false, 2: false, 3: false },
          selectedChoice: null,
          attempts: 0,
          fb: null
        };
      }
      const s10 = st.s10;

      const stagePuzzles = {
        1: {
          badge: 'Tahap 1NF (First Normal Form)',
          problem: 'Pada Tabel Awal di sebelah kiri, baris pinjam P01 menyimpan dua buku sekaligus dalam satu sel ("B001, B002" dan "Pemrograman, Jaringan"). Apa tindakan 1NF yang benar?',
          choices: [
            { id: 'A', text: 'Memecah nilai ganda (multivalued) sehingga setiap sel hanya berisi satu nilai atomik per baris.' },
            { id: 'B', text: 'Menghapus seluruh kolom id_buku agar tabel lebih pendek.' },
            { id: 'C', text: 'Menggabungkan semua transaksi perpustakaan menjadi satu baris raksasa.' }
          ],
          correct: 'A',
          resultSummary: '✓ Tabel 1NF: Setiap baris kini bersifat atomik (1 baris = 1 item buku yang dipinjam).'
        },
        2: {
          badge: 'Tahap 2NF (Second Normal Form)',
          problem: 'Setelah 1NF, kunci utama detail adalah gabungan (id_pinjam + id_buku). Namun "judul_buku" & "pengarang" hanya bergantung pada id_buku saja (ketergantungan parsial). Solusi 2NF?',
          choices: [
            { id: 'A', text: 'Membiarkan judul & pengarang diketik berulang-ulang setiap kali buku dipinjam.' },
            { id: 'B', text: 'Memisahkan atribut buku ke Tabel Master BUKU tersendiri, dan menyisakan id_buku (FK) di tabel transaksi.' },
            { id: 'C', text: 'Menghapus Primary Key dari seluruh tabel.' }
          ],
          correct: 'B',
          resultSummary: '✓ Tabel 2NF: Terbentuk Tabel PEMINJAMAN, DETAIL_PINJAM, dan BUKU tanpa ketergantungan parsial.'
        },
        3: {
          badge: 'Tahap 3NF (Third Normal Form)',
          problem: 'Di Tabel BUKU masih terdapat kolom (id_kategori, nama_kategori, lokasi_rak). Lokasi rak bergantung pada id_kategori, bukan langsung pada id_buku (ketergantungan transitif). Solusi 3NF?',
          choices: [
            { id: 'A', text: 'Memisahkan (id_kategori, nama_kategori, lokasi_rak) menjadi Tabel KATEGORI tersendiri yang dihubungkan via FK.' },
            { id: 'B', text: 'Menyatukan kembali Tabel Buku dengan Tabel Anggota.' },
            { id: 'C', text: 'Mengganti semua kode buku menjadi nama rak.' }
          ],
          correct: 'A',
          resultSummary: '✓ Tabel 3NF: Bebas ketergantungan transitif & redundansi! Anomali Insert, Update, dan Delete berhasil dicegah.'
        }
      };

      const curPuz = stagePuzzles[s10.activeStage];
      const allDone = s10.solved[1] && s10.solved[2] && s10.solved[3];

      root.innerHTML = `
        <div style="display:grid;grid-template-columns:680px 1fr;gap:24px;height:100%;">
          <!-- Left: Unnormalized Table & Resulting Normalized Schema -->
          <div class="glass-panel" style="padding:20px 22px;display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
            <div>
              <div style="font-size:19px;font-weight:900;color:#7dd3fc;margin-bottom:8px;">
                ⚠️ Tabel Awal (Belum Normal / Redundan)
              </div>
              <table class="data-grid-table" style="font-size:13.5px;">
                <thead>
                  <tr>
                    <th>id_pinjam</th>
                    <th>id_buku</th>
                    <th>judul</th>
                    <th>penerbit</th>
                    <th>kategori &amp; rak</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="background:#fff1f2;">
                    <td>P01</td>
                    <td><strong>B001, B002</strong></td>
                    <td>Pemrograman, Jaringan</td>
                    <td>Informatika</td>
                    <td>Komputer (Rak A1)</td>
                  </tr>
                  <tr>
                    <td>P02</td>
                    <td>B001</td>
                    <td>Pemrograman</td>
                    <td>Informatika</td>
                    <td>Komputer (Rak A1)</td>
                  </tr>
                  <tr>
                    <td>P03</td>
                    <td>B003</td>
                    <td>Database Dasar</td>
                    <td>Erlangga</td>
                    <td>Komputer (Rak A1)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Live Evolution Cards: 1NF -> 2NF -> 3NF -->
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div style="font-size:15px;font-weight:800;color:#fde68a;">📊 Struktur Tabel Hasil Normalisasi:</div>
              ${[1, 2, 3].map(n => `
                <div style="padding:12px 16px;border-radius:14px;background:${s10.solved[n] ? 'rgba(16,185,129,0.22)' : 'rgba(255,255,255,0.07)'};border:1.5px solid ${s10.solved[n] ? '#34d399' : 'rgba(125,211,252,0.3)'};display:flex;align-items:center;justify-content:space-between;">
                  <div>
                    <strong style="color:#fff;font-size:15px;">Tabel ${n}NF</strong>
                    <div style="font-size:13px;color:#cbd5e1;">${s10.solved[n] ? stagePuzzles[n].resultSummary : 'Selesaikan puzzle ' + n + 'NF di sebelah kanan...'}</div>
                  </div>
                  <span style="font-size:20px;">${s10.solved[n] ? '✅' : '🔒'}</span>
                </div>
              `).join('')}
            </div>

            ${allDone ? `<div class="feedback-banner success"><span>🎉 Hebat! Struktur tabel sudah mencapai 3NF dan bebas anomali data!</span></div>` : ''}
          </div>

          <!-- Right: Interactive 1NF -> 2NF -> 3NF Puzzle Solver -->
          <div class="light-card" style="display:flex;flex-direction:column;overflow:hidden;">
            <div class="panel-header-bar">
              <span>🧪 Normalization Lab – Puzzle Struktur Data</span>
              <div style="display:flex;gap:8px;">
                ${[1, 2, 3].map(n => `
                  <button type="button" class="stage-tab-btn" data-st="${n}" style="padding:5px 14px;border-radius:999px;border:2px solid #fff;background:${s10.activeStage === n ? '#fde047' : s10.solved[n] ? '#10b981' : 'rgba(255,255,255,0.2)'};color:${s10.activeStage === n ? '#0f172a' : '#fff'};font-weight:900;cursor:pointer;">
                    ${s10.solved[n] ? '✓ ' : ''}${n}NF
                  </button>
                `).join('')}
              </div>
            </div>

            <div style="padding:24px 28px;flex:1;display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="display:inline-block;background:#dbeafe;color:#1d4ed8;font-weight:900;padding:5px 14px;border-radius:999px;font-size:14px;margin-bottom:12px;">
                  ${curPuz.badge}
                </div>
                <p style="font-size:18px;font-weight:700;color:#0f2547;line-height:1.5;margin-bottom:18px;">
                  ${curPuz.problem}
                </p>

                <div style="display:flex;flex-direction:column;gap:12px;">
                  ${curPuz.choices.map(ch => {
                    const isSel = s10.selectedChoice === ch.id;
                    return `
                      <button type="button" class="norm-choice-btn" data-cid="${ch.id}" style="text-align:left;padding:16px 18px;border-radius:14px;border:2.5px solid ${isSel ? '#0284c7' : '#cbd5e1'};background:${isSel ? '#dbeafe' : '#ffffff'};color:#0f2547;font-size:16px;font-weight:700;cursor:pointer;line-height:1.4;">
                        <strong>${ch.id}.</strong> ${ch.text}
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>

              <div style="display:flex;flex-direction:column;gap:12px;">
                ${renderFeedback(s10.fb)}
                <button class="btn btn-cyan btn-lg" id="btn-solve-norm" style="width:100%;">
                  Terapkan Normalisasi ${s10.activeStage}NF →
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      root.querySelectorAll('.stage-tab-btn').forEach(btn => {
        btn.onclick = () => {
          const target = Number(btn.getAttribute('data-st'));
          if (target > 1 && !s10.solved[target - 1]) {
            DQAudio.playError();
            s10.fb = { type: 'hint', text: `Selesaikan tahap ${target - 1}NF terlebih dahulu secara berurutan!` };
          } else {
            DQAudio.playClick();
            s10.activeStage = target;
            s10.selectedChoice = null;
            s10.fb = null;
          }
          this.renderScene10(root, app);
        };
      });

      root.querySelectorAll('.norm-choice-btn').forEach(btn => {
        btn.onclick = () => {
          DQAudio.playClick();
          s10.selectedChoice = btn.getAttribute('data-cid');
          this.renderScene10(root, app);
        };
      });

      root.querySelector('#btn-solve-norm').onclick = () => {
        if (!s10.selectedChoice) {
          DQAudio.playError();
          s10.fb = { type: 'error', text: 'Pilih salah satu langkah perbaikan struktur tabel terlebih dahulu!' };
          this.renderScene10(root, app);
          return;
        }
        if (s10.selectedChoice === curPuz.correct) {
          DQAudio.playSuccess();
          s10.solved[s10.activeStage] = true;
          s10.selectedChoice = null;
          s10.attempts = 0;

          if (s10.activeStage < 3) {
            const prev = s10.activeStage;
            s10.activeStage++;
            s10.fb = { type: 'success', text: `Tahap ${prev}NF berhasil! Sekarang selesaikan tahap ${s10.activeStage}NF.` };
          } else {
            s10.fb = { type: 'success', text: 'Hebat! Seluruh tahapan 1NF, 2NF, dan 3NF tuntas! Badge "Normalization Specialist" berhasil dibuka!' };
            app.unlockBadge('badge_normalizer');
            app.completeScene(10, true);
          }
        } else {
          s10.attempts++;
          app.recordWrongAttempt(10);
          DQAudio.playError();
          const extra = s10.attempts >= 2
            ? ' 💡 Petunjuk: Normalisasi selalu memecah grup berulang/ketergantungan ke tabel terpisah yang terhubung via FK, bukan menghapus data penting!'
            : '';
          s10.fb = { type: 'error', text: 'Langkah tersebut justru merusak informasi atau membiarkan redundansi. Coba analisis lagi!' + extra };
        }
        this.renderScene10(root, app);
      };
    },

    /* ======================================================================
       SCENE 11: SQL WORKSHOP – IMPLEMENTASI DATABASE
       ====================================================================== */
    renderScene11(root, app) {
      const st = app.state;
      if (!st.s11) {
        st.s11 = {
          activeStep: 1,
          doneSteps: {},
          sqlText: DQSql.SQLTasks[0].template,
          db: DQSql.createFreshDB(),
          lastExec: null,
          attempts: 0
        };
      }
      const s11 = st.s11;
      const tasks = DQSql.SQLTasks;
      const curTask = tasks.find(t => t.step === s11.activeStep) || tasks[0];
      const completedCount = Object.keys(s11.doneSteps).length;

      root.innerHTML = `
        <div style="display:grid;grid-template-columns:340px 1fr 480px;gap:20px;height:100%;">
          <!-- Left: Daftar Query (5 Missions) -->
          <div class="glass-panel" style="padding:18px 20px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="font-size:19px;font-weight:900;color:#7dd3fc;margin-bottom:12px;">
                📜 Daftar Query (${completedCount}/5)
              </div>
              <div style="display:flex;flex-direction:column;gap:10px;">
                ${tasks.map(t => {
                  const isAct = t.step === s11.activeStep;
                  const isDone = !!s11.doneSteps[t.step];
                  return `
                    <button type="button" class="sql-step-btn" data-step="${t.step}" style="text-align:left;padding:13px 15px;border-radius:14px;border:2px solid ${isAct ? '#38bdf8' : isDone ? '#10b981' : 'rgba(125,211,252,0.28)'};background:${isAct ? 'rgba(2,132,199,0.45)' : isDone ? 'rgba(16,185,129,0.18)' : 'rgba(255,255,255,0.05)'};color:#fff;font-size:15px;font-weight:800;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">
                      <span>${t.title}</span>
                      <span>${isDone ? '✅' : isAct ? '▶' : '⚪'}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <div style="background:rgba(255,255,255,0.08);border-radius:14px;padding:14px;font-size:14px;color:#e0f2fe;line-height:1.45;">
              <strong style="color:#fde68a;">Target Misi #${curTask.step}:</strong><br/>
              ${curTask.instruction}
            </div>
          </div>

          <!-- Center: SQL Playground Code Editor -->
          <div class="sql-ide-box">
            <div style="padding:12px 18px;background:#0f2547;border-bottom:1.5px solid rgba(56,189,248,0.35);display:flex;justify-content:space-between;align-items:center;">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="width:12px;height:12px;border-radius:50%;background:#ef4444;"></span>
                <span style="width:12px;height:12px;border-radius:50%;background:#f59e0b;"></span>
                <span style="width:12px;height:12px;border-radius:50%;background:#10b981;"></span>
                <strong style="margin-left:8px;color:#7dd3fc;font-size:16px;">SQL Playground — perpustakaan_db.sql</strong>
              </div>
              <button class="btn btn-ghost btn-sm" id="btn-load-template">✨ Muat Contoh Sintaks</button>
            </div>

            <div class="sql-editor-area">
              <div class="sql-line-nums">1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10</div>
              <textarea id="sql-editor-input" class="sql-textarea" spellcheck="false">${app.escapeHtml(s11.sqlText)}</textarea>
            </div>

            <div style="padding:14px 18px;background:#0b1c3d;border-top:1.5px solid rgba(56,189,248,0.3);display:flex;justify-content:space-between;align-items:center;gap:14px;">
              <span style="font-size:14px;color:#94a3b8;font-family:var(--font-mono);">Mode Aman (Sandbox In-Memory RDBMS)</span>
              <button class="btn btn-cyan" id="btn-run-sql">Jalankan Query ▶</button>
            </div>
          </div>

          <!-- Right: Live Query Output & Table State -->
          <div class="glass-panel" style="padding:18px 20px;display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
            <div>
              <div style="font-size:19px;font-weight:900;color:#7dd3fc;margin-bottom:10px;">📊 Hasil Query</div>
              ${s11.lastExec ? `
                <div style="padding:12px 16px;border-radius:14px;background:${s11.lastExec.ok ? 'rgba(16,185,129,0.22)' : 'rgba(239,68,68,0.22)'};border:1.5px solid ${s11.lastExec.ok ? '#34d399' : '#f87171'};margin-bottom:14px;">
                  <div style="font-weight:900;font-size:16px;color:${s11.lastExec.ok ? '#6ee7b7' : '#fca5a5'};">
                    ${s11.lastExec.ok ? `✓ Query berhasil! (${s11.lastExec.elapsed} detik)` : '✕ Eksekusi Gagal'}
                  </div>
                  <div style="font-size:14px;color:#f8fafc;margin-top:4px;">${s11.lastExec.ok ? s11.lastExec.message : s11.lastExec.error}</div>
                </div>
              ` : `
                <div style="padding:12px 16px;border-radius:14px;background:rgba(255,255,255,0.07);border:1px solid rgba(125,211,252,0.3);margin-bottom:14px;font-size:14px;color:#cbd5e1;">
                  Klik <strong>Jalankan Query ▶</strong> untuk melihat hasil eksekusi tabel secara langsung.
                </div>
              `}

              <div style="font-size:14px;font-weight:800;color:#fde68a;margin-bottom:8px;">Isi Tabel Aktif: <code>buku</code> (${s11.db.rows.length} baris)</div>
              <div style="background:#fff;border-radius:12px;overflow:hidden;">
                <table class="data-grid-table" style="font-size:13.5px;">
                  <thead>
                    <tr>
                      <th>id_buku</th>
                      <th>judul</th>
                      <th>pengarang</th>
                      <th>penerbit</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${s11.db.rows.map(r => `
                      <tr>
                        <td><strong>${app.escapeHtml(r.id_buku)}</strong></td>
                        <td>${app.escapeHtml(r.judul)}</td>
                        <td>${app.escapeHtml(r.pengarang)}</td>
                        <td>${app.escapeHtml(r.penerbit)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            ${completedCount === 5 ? `
              <div class="feedback-banner success" style="font-size:15px;">
                <span>🏆 Ke-5 perintah SQL berhasil dijalankan! Badge "SQL Craftsman" diraih!</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;

      const editorEl = root.querySelector('#sql-editor-input');
      editorEl.oninput = () => { s11.sqlText = editorEl.value; };

      root.querySelectorAll('.sql-step-btn').forEach(btn => {
        btn.onclick = () => {
          DQAudio.playClick();
          const stp = Number(btn.getAttribute('data-step'));
          s11.activeStep = stp;
          const tk = tasks.find(x => x.step === stp);
          s11.sqlText = tk.template;
          s11.lastExec = null;
          this.renderScene11(root, app);
        };
      });

      root.querySelector('#btn-load-template').onclick = () => {
        DQAudio.playClick();
        s11.sqlText = curTask.template;
        this.renderScene11(root, app);
      };

      root.querySelector('#btn-run-sql').onclick = () => {
        const res = DQSql.executeWorkshopSQL(s11.sqlText, curTask.cmdType, s11.db);
        s11.lastExec = res;
        if (res.ok) {
          DQAudio.playSuccess();
          s11.doneSteps[s11.activeStep] = true;
          s11.attempts = 0;

          if (Object.keys(s11.doneSteps).length === 5) {
            app.unlockBadge('badge_sql');
            app.completeScene(11, true);
          } else if (s11.activeStep < 5) {
            setTimeout(() => {
              const nextStep = s11.activeStep + 1;
              if (!s11.doneSteps[nextStep]) {
                s11.activeStep = nextStep;
                s11.sqlText = tasks.find(x => x.step === nextStep).template;
                this.renderScene11(root, app);
              }
            }, 900);
          }
        } else {
          s11.attempts++;
          app.recordWrongAttempt(11);
          DQAudio.playError();
          if (s11.attempts >= 2) {
            res.error += ' 💡 Petunjuk Tambahan: ' + curTask.hint2;
          }
        }
        this.renderScene11(root, app);
      };
    },

    /* ======================================================================
       SCENE 12: BOSS CHALLENGE – FINAL PROJECT (Order Work #002 Kantin Sekolah)
       ====================================================================== */
    renderScene12(root, app) {
      const st = app.state;
      if (!st.s12) {
        st.s12 = {
          started: false,
          activeTab: 1, // 1..4
          entities: {}, // pel, menu, trx, dtl, cat_dinding
          erdRel: '',
          normChoice: '',
          sqlCode: `CREATE TABLE menu (\n  id_menu VARCHAR(10) PRIMARY KEY,\n  nama_menu VARCHAR(100),\n  harga INT,\n  kategori VARCHAR(50)\n);`,
          sqlVerified: false,
          fb: null
        };
      }
      const s12 = st.s12;
      const curAv = app.getCurrentAvatar();

      if (!s12.started) {
        root.innerHTML = `
          <div style="display:grid;grid-template-columns:440px 1fr;gap:28px;height:100%;align-items:stretch;">
            <div class="character-column">
              <div class="character-frame">
                <img src="${curAv.img}" alt="Konsultan" />
                <div class="character-nameplate">
                  <strong>${app.escapeHtml(st.playerName || 'Konsultan Muda')}</strong>
                  <span>Siap Menghadapi Proyek Akhir Mandiri</span>
                </div>
              </div>
            </div>

            <div class="light-card" style="display:flex;flex-direction:column;overflow:hidden;">
              <div class="panel-header-bar" style="background:linear-gradient(90deg,#b45309,#d97706);">
                <span>🔥 Proyek Akhir – Boss Challenge</span>
                <span style="background:rgba(0,0,0,0.25);padding:4px 14px;border-radius:999px;font-size:14px;">Order Work #002</span>
              </div>
              <div style="padding:32px 38px;flex:1;display:flex;flex-direction:column;justify-content:space-between;">
                <div>
                  <div style="font-size:15px;font-weight:900;color:#d97706;text-transform:uppercase;margin-bottom:6px;">Studi Kasus Mandiri Tanpa Tuntunan Langkah demi Langkah</div>
                  <h2 style="font-size:34px;font-weight:900;color:#0f2547;margin-bottom:14px;">Sistem Informasi Kantin Sekolah</h2>
                  <p style="font-size:19px;color:#334155;line-height:1.55;margin-bottom:24px;">
                    Unit Koperasi &amp; Kantin Sekolah meminta perusahaan konsultan kita merancang basis data digital yang dapat mengelola <strong>daftar menu makanan/minuman, data pelanggan siswa, nota transaksi pembelian, detail item yang dibeli, dan laporan penjualan harian</strong>.
                  </p>

                  <div style="background:#f0f9ff;border:2px solid #bae6fd;border-radius:18px;padding:20px 24px;">
                    <div style="font-size:17px;font-weight:900;color:#0f2547;margin-bottom:12px;">📋 Kriteria Penilaian Tim Quality Assurance (QA):</div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:16px;font-weight:700;color:#1e3a8a;">
                      <div>☑️ 1. Analisis Kebutuhan Entitas Kantin</div>
                      <div>☑️ 2. Rancangan ERD, PK/FK &amp; Kardinalitas</div>
                      <div>☑️ 3. Normalisasi Tabel Transaksi (3NF)</div>
                      <div>☑️ 4. Implementasi DDL SQL Tabel Menu</div>
                    </div>
                  </div>
                </div>

                <div style="display:flex;justify-content:flex-end;">
                  <button class="btn btn-gold btn-lg" id="btn-start-boss">
                    🚀 Mulai Pengerjaan Proyek Akhir →
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
        root.querySelector('#btn-start-boss').onclick = () => {
          DQAudio.playPickup();
          s12.started = true;
          this.renderScene12(root, app);
        };
        return;
      }

      const entOptions = [
        { id: 'pelanggan', label: '🧑‍🎓 Pelanggan (id_pelanggan, nama, saldo/kelas)', valid: true },
        { id: 'menu', label: '🍜 Menu Kantin (id_menu, nama_menu, harga, stok)', valid: true },
        { id: 'transaksi', label: '🧾 Nota Transaksi (id_transaksi, id_pelanggan, tgl_beli)', valid: true },
        { id: 'detail_transaksi', label: '🛒 Detail Transaksi (id_detail, id_transaksi, id_menu, jumlah)', valid: true },
        { id: 'warna_meja', label: '🪑 Warna Taplak Meja Kantin (Pengecoh)', valid: false },
        { id: 'hobi_koki', label: '🎸 Hobi Musik Penjaga Kantin (Pengecoh)', valid: false }
      ];

      let tabBodyHtml = '';
      if (s12.activeTab === 1) {
        tabBodyHtml = `
          <div>
            <h3 style="font-size:21px;color:#0f2547;margin-bottom:8px;">Tahap 1: Analisis Kebutuhan Entitas Sistem Kantin</h3>
            <p style="font-size:16px;color:#475569;margin-bottom:16px;">Pilih tepat <strong>4 entitas relevan</strong> yang dibutuhkan Sistem Informasi Kantin Sekolah:</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
              ${entOptions.map(o => {
                const on = !!s12.entities[o.id];
                return `
                  <div class="boss-ent-card" data-eid="${o.id}" style="padding:16px 18px;border-radius:16px;border:2.5px solid ${on ? '#0284c7' : '#cbd5e1'};background:${on ? '#dbeafe' : '#ffffff'};cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-size:16px;font-weight:800;color:#0f2547;">
                    <span>${o.label}</span>
                    <span>${on ? '☑️' : '⬜'}</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      } else if (s12.activeTab === 2) {
        tabBodyHtml = `
          <div>
            <h3 style="font-size:21px;color:#0f2547;margin-bottom:8px;">Tahap 2: Rancangan ERD, Kunci &amp; Kardinalitas Kantin</h3>
            <p style="font-size:16px;color:#475569;margin-bottom:16px;">Satu Nota Transaksi dapat membeli banyak Menu, dan satu Menu dapat dibeli di banyak Nota Transaksi (M:N). Bagaimana struktur ERD relasional yang benar?</p>
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${[
                { id: 'rel_correct', text: 'PELANGGAN (1:N) → TRANSAKSI (1:N) → DETAIL_TRANSAKSI (N:1) ← MENU, dengan FK id_transaksi & id_menu di DETAIL_TRANSAKSI.' },
                { id: 'rel_wrong1', text: 'Menyimpan kolom menu_1, menu_2, menu_3, menu_4 secara kaku di dalam tabel PELANGGAN (1:1).' },
                { id: 'rel_wrong2', text: 'Meletakkan id_pelanggan sebagai Foreign Key di dalam tabel master MENU.' }
              ].map(opt => `
                <button type="button" class="boss-erd-opt" data-val="${opt.id}" style="text-align:left;padding:18px 20px;border-radius:16px;border:2.5px solid ${s12.erdRel === opt.id ? '#0284c7' : '#cbd5e1'};background:${s12.erdRel === opt.id ? '#dbeafe' : '#ffffff'};font-size:16px;font-weight:700;color:#0f2547;cursor:pointer;">
                  ${s12.erdRel === opt.id ? '🔘' : '⚪'} ${opt.text}
                </button>
              `).join('')}
            </div>
          </div>
        `;
      } else if (s12.activeTab === 3) {
        tabBodyHtml = `
          <div>
            <h3 style="font-size:21px;color:#0f2547;margin-bottom:8px;">Tahap 3: Normalisasi Tabel Kantin (1NF–3NF)</h3>
            <p style="font-size:16px;color:#475569;margin-bottom:16px;">Agar memenuhi bentuk normal <strong>3NF</strong> dan bebas anomali perubahan nama/kategori menu, skema kolom manakah yang paling tepat untuk <code>detail_transaksi</code>?</p>
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${[
                { id: 'norm_3nf', text: 'detail_transaksi(id_detail PK, id_transaksi FK, id_menu FK, jumlah_beli, harga_saat_beli) — nama_menu & nama_kategori tetap di tabel master!' },
                { id: 'norm_unnorm', text: 'detail_transaksi(id_transaksi, daftar_semua_menu_koma, nama_siswa, alamat_siswa, nama_koki) dalam satu tabel tunggal.' },
                { id: 'norm_partial', text: 'Menyimpan stok_harian dan nama_kategori berulang kali di setiap baris pembelian siswa.' }
              ].map(opt => `
                <button type="button" class="boss-norm-opt" data-val="${opt.id}" style="text-align:left;padding:18px 20px;border-radius:16px;border:2.5px solid ${s12.normChoice === opt.id ? '#0284c7' : '#cbd5e1'};background:${s12.normChoice === opt.id ? '#dbeafe' : '#ffffff'};font-size:16px;font-weight:700;color:#0f2547;cursor:pointer;">
                  ${s12.normChoice === opt.id ? '🔘' : '⚪'} ${opt.text}
                </button>
              `).join('')}
            </div>
          </div>
        `;
      } else {
        tabBodyHtml = `
          <div style="display:grid;grid-template-columns:1fr 420px;gap:20px;height:100%;">
            <div style="display:flex;flex-direction:column;gap:10px;">
              <h3 style="font-size:20px;color:#0f2547;">Tahap 4: Implementasi SQL Tabel <code>menu</code></h3>
              <textarea id="boss-sql-inp" style="flex:1;min-height:240px;background:#071329;color:#e2e8f0;font-family:var(--font-mono);font-size:17px;padding:16px;border-radius:14px;border:2px solid #0284c7;resize:none;">${app.escapeHtml(s12.sqlCode)}</textarea>
            </div>
            <div style="background:#f1f7ff;border:1.5px solid #bfdbfe;border-radius:16px;padding:18px;display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="font-size:16px;font-weight:900;color:#1e3a8a;margin-bottom:8px;">Spesifikasi Tabel SQL Kantin:</div>
                <ul style="padding-left:20px;font-size:15px;color:#334155;line-height:1.65;font-weight:600;">
                  <li>Perintah <code>CREATE TABLE menu</code></li>
                  <li>Kolom <code>id_menu</code> sebagai <code>PRIMARY KEY</code></li>
                  <li>Kolom <code>nama_menu</code> dan <code>harga</code></li>
                </ul>
                <div style="margin-top:14px;padding:12px;border-radius:12px;background:${s12.sqlVerified ? '#dcfce7' : '#fff'};border:1.5px solid ${s12.sqlVerified ? '#10b981' : '#cbd5e1'};font-weight:800;color:${s12.sqlVerified ? '#065f46' : '#64748b'};">
                  ${s12.sqlVerified ? '✓ Sintaks SQL Tabel Menu Valid!' : 'Klik tombol Uji SQL di bawah untuk mengetes sintaks.'}
                </div>
              </div>
              <button class="btn btn-cyan" id="btn-test-boss-sql" style="width:100%;">▶ Uji Sintaks SQL Kantin</button>
            </div>
          </div>
        `;
      }

      root.innerHTML = `
        <div class="light-card" style="height:100%;display:flex;flex-direction:column;overflow:hidden;">
          <div class="panel-header-bar" style="background:linear-gradient(90deg,#0f2547,#1d4ed8);">
            <span>🏢 Workspace Mandiri – Order Work #002: Sistem Informasi Kantin Sekolah</span>
            <div style="display:flex;gap:8px;">
              ${[
                { n: 1, t: '1. Analisis' },
                { n: 2, t: '2. ERD & Kunci' },
                { n: 3, t: '3. Normalisasi' },
                { n: 4, t: '4. SQL Kantin' }
              ].map(tb => `
                <button type="button" class="boss-tab-btn" data-tab="${tb.n}" style="padding:7px 16px;border-radius:10px;border:none;font-weight:800;font-size:14px;cursor:pointer;background:${s12.activeTab === tb.n ? '#fde047' : 'rgba(255,255,255,0.16)'};color:${s12.activeTab === tb.n ? '#0f172a' : '#fff'};">
                  ${tb.t}
                </button>
              `).join('')}
            </div>
          </div>

          <div style="padding:24px 30px;flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
            <div style="flex:1;">${tabBodyHtml}</div>

            ${renderFeedback(s12.fb)}

            <div style="display:flex;justify-content:space-between;align-items:center;border-top:2px solid #e2e8f0;padding-top:14px;">
              <div style="display:flex;gap:10px;">
                ${s12.activeTab > 1 ? `<button class="btn btn-ghost" id="boss-prev-tab" style="color:#0f2547;background:#e2e8f0;">← Tab Sebelumnya</button>` : ''}
                ${s12.activeTab < 4 ? `<button class="btn btn-cyan" id="boss-next-tab">Tab Berikutnya →</button>` : ''}
              </div>
              <button class="btn btn-gold btn-lg" id="btn-submit-to-qa">
                🔍 Ajukan Rancangan ke Tim QA (Scene 13) →
              </button>
            </div>
          </div>
        </div>
      `;

      root.querySelectorAll('.boss-tab-btn').forEach(b => {
        b.onclick = () => {
          DQAudio.playClick();
          s12.activeTab = Number(b.getAttribute('data-tab'));
          s12.fb = null;
          this.renderScene12(root, app);
        };
      });

      const prevBtn = root.querySelector('#boss-prev-tab');
      if (prevBtn) prevBtn.onclick = () => { DQAudio.playClick(); s12.activeTab--; this.renderScene12(root, app); };
      const nextBtn = root.querySelector('#boss-next-tab');
      if (nextBtn) nextBtn.onclick = () => { DQAudio.playClick(); s12.activeTab++; this.renderScene12(root, app); };

      root.querySelectorAll('.boss-ent-card').forEach(el => {
        el.onclick = () => {
          DQAudio.playClick();
          const eid = el.getAttribute('data-eid');
          s12.entities[eid] = !s12.entities[eid];
          this.renderScene12(root, app);
        };
      });

      root.querySelectorAll('.boss-erd-opt').forEach(el => {
        el.onclick = () => {
          DQAudio.playClick();
          s12.erdRel = el.getAttribute('data-val');
          this.renderScene12(root, app);
        };
      });

      root.querySelectorAll('.boss-norm-opt').forEach(el => {
        el.onclick = () => {
          DQAudio.playClick();
          s12.normChoice = el.getAttribute('data-val');
          this.renderScene12(root, app);
        };
      });

      const sqlInp = root.querySelector('#boss-sql-inp');
      if (sqlInp) {
        sqlInp.oninput = () => {
          s12.sqlCode = sqlInp.value;
          s12.sqlVerified = false;
        };
      }

      const testSqlBtn = root.querySelector('#btn-test-boss-sql');
      if (testSqlBtn) {
        testSqlBtn.onclick = () => {
          const code = s12.sqlCode || '';
          const ok = /CREATE\s+TABLE\s+`?MENU`?/i.test(code) && /ID_MENU/i.test(code) && /PRIMARY\s+KEY/i.test(code) && /HARGA/i.test(code);
          if (ok) {
            DQAudio.playSuccess();
            s12.sqlVerified = true;
            s12.fb = { type: 'success', text: 'Query DDL CREATE TABLE menu valid dan siap diuji oleh Tim QA!' };
          } else {
            DQAudio.playError();
            app.recordWrongAttempt(12);
            s12.sqlVerified = false;
            s12.fb = { type: 'error', text: 'Pastikan memuat CREATE TABLE menu dengan kolom id_menu PRIMARY KEY, nama_menu, dan harga!' };
          }
          this.renderScene12(root, app);
        };
      }

      root.querySelector('#btn-submit-to-qa').onclick = () => {
        const code = s12.sqlCode || '';
        s12.sqlVerified = /CREATE\s+TABLE\s+`?MENU`?/i.test(code) && /ID_MENU/i.test(code) && /PRIMARY\s+KEY/i.test(code) && /HARGA/i.test(code);
        DQAudio.playPickup();
        app.completeScene(12, true);
        if (st.s13) st.s13.tested = false;
        app.goToScene(13);
      };
    },

    /* ======================================================================
       SCENE 13: QUALITY ASSURANCE – EVALUASI HASIL
       ====================================================================== */
    renderScene13(root, app) {
      const st = app.state;
      if (!st.s13) {
        st.s13 = {
          tested: false,
          fkConstraintFixed: false
        };
      }
      const s13 = st.s13;
      const s12 = st.s12 || { entities: {}, erdRel: '', normChoice: '', sqlCode: '' };

      // Evaluate actual Boss Challenge work + QA Integrity Check
      const selEnts = Object.keys(s12.entities || {}).filter(k => s12.entities[k]);
      const check1 = selEnts.length === 4 && ['pelanggan', 'menu', 'transaksi', 'detail_transaksi'].every(k => s12.entities[k]);
      const check2 = s12.erdRel === 'rel_correct';
      const check3 = s12.normChoice === 'norm_3nf';
      const check4 = /CREATE\s+TABLE\s+`?MENU`?/i.test(s12.sqlCode || '') && /PRIMARY\s+KEY/i.test(s12.sqlCode || '');
      const check5 = s13.fkConstraintFixed;

      const checks = [
        { id: 'c1', label: 'Struktur Tabel & Entitas', pass: check1, fixTab: 1, issue: 'Entitas Kantin belum tepat (pilih tepat Pelanggan, Menu, Transaksi, dan Detail Transaksi tanpa pengecoh).' },
        { id: 'c2', label: 'Relasi Antar Tabel (PK & FK)', pass: check2, fixTab: 2, issue: 'Relasi M:N antara Transaksi & Menu harus dijembatani oleh tabel detail_transaksi (1:N & N:1).' },
        { id: 'c3', label: 'Normalisasi (1NF–3NF)', pass: check3, fixTab: 3, issue: 'Skema detail_transaksi belum memenuhi 3NF (hindari menyimpan kolom berulang/transitif).' },
        { id: 'c4', label: 'Validasi Sintaks SQL', pass: check4, fixTab: 4, issue: 'Perintah CREATE TABLE menu belum lengkap dengan PRIMARY KEY.' },
        { id: 'c5', label: 'Integritas Referensial Klien (QA Check)', pass: check5, fixTab: 0, issue: 'Aturan keamanan FOREIGN KEY (ON DELETE RESTRICT) belum diaktifkan agar menu yang sudah pernah terjual tidak terhapus sembarangan.' }
      ];

      const allPassed = checks.every(c => c.pass);

      root.innerHTML = `
        <div style="display:grid;grid-template-columns:460px 1fr;gap:26px;height:100%;">
          <!-- Left: 5 QA Audit Checklist -->
          <div class="glass-panel" style="padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="font-size:21px;font-weight:900;color:#7dd3fc;margin-bottom:14px;">
                🛡️ Daftar Audit Quality Assurance
              </div>
              <div style="display:flex;flex-direction:column;gap:12px;">
                ${checks.map(c => `
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:15px 18px;border-radius:14px;background:${!s13.tested ? 'rgba(255,255,255,0.06)' : c.pass ? 'rgba(16,185,129,0.22)' : 'rgba(245,158,11,0.22)'};border:2px solid ${!s13.tested ? 'rgba(125,211,252,0.3)' : c.pass ? '#34d399' : '#fbbf24'};">
                    <span style="font-size:16px;font-weight:800;color:#fff;">${c.label}</span>
                    <span style="font-size:20px;">${!s13.tested ? '⏳' : c.pass ? '✅' : '⚠️'}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <button class="btn btn-cyan btn-lg" id="btn-run-qa" style="width:100%;">
              🔬 ${s13.tested ? 'Jalankan Ulang Tes QA' : 'Jalankan Tes QA Sekarang'}
            </button>
          </div>

          <!-- Right: QA Inspection Report Card (matching Collage 13) -->
          <div class="light-card" style="display:flex;flex-direction:column;overflow:hidden;">
            <div class="panel-header-bar">
              <span>📋 Hasil Pemeriksaan Tim Quality Assurance</span>
              <span>Release Gate v1.0</span>
            </div>

            <div style="padding:28px 34px;flex:1;display:flex;flex-direction:column;justify-content:space-between;">
              ${!s13.tested ? `
                <div style="margin:auto;text-align:center;max-width:560px;">
                  <div style="font-size:72px;margin-bottom:14px;">🧪</div>
                  <h3 style="font-size:26px;color:#0f2547;margin-bottom:10px;">Siap Melakukan Pengujian Kualitas Database</h3>
                  <p style="font-size:17px;color:#475569;line-height:1.5;">
                    Di perusahaan konsultan software, tidak ada rancangan yang dikirim ke klien sebelum melewati pengujian otomatis &amp; inspeksi QA. Klik <strong>"Jalankan Tes QA Sekarang"</strong> di panel kiri!
                  </p>
                </div>
              ` : allPassed ? `
                <div style="margin:auto;text-align:center;background:#ecfdf5;border:3px solid #10b981;border-radius:26px;padding:42px 48px;width:100%;">
                  <div style="font-size:68px;margin-bottom:10px;">✅</div>
                  <h2 style="font-size:34px;font-weight:900;color:#065f46;margin-bottom:10px;">Semua Benar! Lulus Audit QA 100%</h2>
                  <p style="font-size:19px;color:#047857;font-weight:700;">
                    Rancangan struktur tabel, relasi Primary/Foreign Key, normalisasi 3NF, dan implementasi SQL kamu sudah sesuai dengan kebutuhan klien!
                  </p>
                </div>
              ` : `
                <div style="display:flex;flex-direction:column;gap:12px;">
                  <div style="font-size:20px;font-weight:900;color:#b45309;">
                    ⚠️ Ditemukan ${checks.filter(c => !c.pass).length} Bagian yang Perlu Diperbaiki Sebelum Rilis:
                  </div>
                  ${checks.filter(c => !c.pass).map(c => `
                    <div style="background:#fffbeb;border:2px solid #f59e0b;border-radius:16px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
                      <div>
                        <strong style="color:#92400e;font-size:16px;">${c.label}</strong>
                        <div style="font-size:14.5px;color:#78350f;margin-top:3px;">${c.issue}</div>
                      </div>
                      ${c.fixTab > 0 ? `
                        <button class="btn btn-cyan btn-sm jump-fix-btn" data-tab="${c.fixTab}">Perbaiki di Scene 12 →</button>
                      ` : `
                        <button class="btn btn-green btn-sm" id="btn-fix-fk-constraint">✓ Aktifkan ON DELETE RESTRICT</button>
                      `}
                    </div>
                  `).join('')}
                </div>
              `}

              <div style="display:flex;justify-content:flex-end;gap:14px;margin-top:16px;">
                ${(s13.tested && !allPassed) ? `<button class="btn btn-ghost" id="btn-auto-patch-qa" style="color:#0284c7;background:#eff6ff;border-color:#93c5fd;">⚡ Terapkan Perbaikan Cepat bersama Mentor</button>` : ''}
                <button class="btn btn-cyan btn-lg" id="btn-send-client" ${!(s13.tested && allPassed) ? 'disabled' : ''}>
                  🚀 Kirim Hasil Akhir ke Klien →
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      root.querySelector('#btn-run-qa').onclick = () => {
        s13.tested = true;
        if (allPassed) {
          DQAudio.playSuccess();
        } else {
          DQAudio.playHint();
        }
        this.renderScene13(root, app);
      };

      root.querySelectorAll('.jump-fix-btn').forEach(btn => {
        btn.onclick = () => {
          DQAudio.playClick();
          const tb = Number(btn.getAttribute('data-tab'));
          if (!st.s12) st.s12 = { started: true, activeTab: tb, entities: {} };
          st.s12.started = true;
          st.s12.activeTab = tb;
          app.goToScene(12);
        };
      });

      const fixFkBtn = root.querySelector('#btn-fix-fk-constraint');
      if (fixFkBtn) {
        fixFkBtn.onclick = () => {
          DQAudio.playSuccess();
          s13.fkConstraintFixed = true;
          this.renderScene13(root, app);
        };
      }

      const patchBtn = root.querySelector('#btn-auto-patch-qa');
      if (patchBtn) {
        patchBtn.onclick = () => {
          DQAudio.playSuccess();
          st.s12 = {
            started: true,
            activeTab: 4,
            entities: { pelanggan: true, menu: true, transaksi: true, detail_transaksi: true },
            erdRel: 'rel_correct',
            normChoice: 'norm_3nf',
            sqlCode: `CREATE TABLE menu (\n  id_menu VARCHAR(10) PRIMARY KEY,\n  nama_menu VARCHAR(100),\n  harga INT,\n  kategori VARCHAR(50)\n);`,
            sqlVerified: true
          };
          s13.fkConstraintFixed = true;
          this.renderScene13(root, app);
        };
      }

      root.querySelector('#btn-send-client').onclick = () => {
        DQAudio.playFanfare();
        app.unlockBadge('badge_master');
        app.completeScene(13, true);
        app.goToScene(14);
      };
    },

    /* ======================================================================
       SCENE 14: ACHIEVEMENT – DATABASE DESIGNER
       ====================================================================== */
    renderScene14(root, app) {
      const st = app.state;
      if (!st.completedScenes.includes(14)) {
        app.completeScene(14, false);
      }
      const curAv = app.getCurrentAvatar();
      const lvl = app.getLevelInfo();

      root.innerHTML = `
        <div style="display:grid;grid-template-columns:410px 1fr;gap:28px;height:100%;align-items:stretch;">
          <!-- Left: Proud Consultant Avatar -->
          <div class="character-column">
            <div class="character-frame" style="border-color:#fde047;box-shadow:0 0 36px rgba(250,204,21,0.35);">
              <img src="${curAv.img}" alt="Certified Consultant" />
              <div class="character-nameplate" style="border-color:#fde047;">
                <strong>${app.escapeHtml(st.playerName || 'Budi Santoso')}</strong>
                <span style="color:#fde047;">🏆 Certified Database Designer</span>
              </div>
            </div>
          </div>

          <!-- Right: Celebration Banner, Trophy, Stats & Badges (matching Collage 14) -->
          <div class="glass-panel" style="padding:30px 38px;display:flex;flex-direction:column;justify-content:space-between;background:radial-gradient(circle at 35% 20%, rgba(37,99,235,0.45), rgba(7,22,54,0.95));border-color:#fde047;">
            <div style="display:flex;align-items:center;gap:28px;">
              <div style="width:140px;height:140px;border-radius:50%;background:radial-gradient(circle,#fef08a,#d97706);display:flex;align-items:center;justify-content:center;font-size:74px;box-shadow:0 0 40px rgba(245,158,11,0.65);border:4px solid #fff;">
                🏆
              </div>
              <div>
                <div style="display:inline-block;background:linear-gradient(90deg,#f59e0b,#eab308);color:#0f172a;font-weight:900;padding:5px 18px;border-radius:999px;font-size:15px;margin-bottom:8px;">
                  PROMOSI JABATAN KONSULTAN RESMI
                </div>
                <h1 style="font-size:48px;font-weight:900;color:#ffffff;line-height:1.1;">Selamat, ${app.escapeHtml(st.playerName || 'Budi')}!</h1>
                <p style="font-size:20px;color:#dbeafe;margin-top:6px;">
                  Kamu telah menyelesaikan seluruh proyek perancangan basis data dengan standar industri!
                </p>
              </div>
            </div>

            <!-- Score, XP, Level & Job Portfolio -->
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;">
              <div style="background:rgba(255,255,255,0.09);border:1.5px solid rgba(253,224,71,0.45);border-radius:18px;padding:16px;text-align:center;">
                <div style="font-size:14px;color:#fde68a;font-weight:800;">TOTAL SKOR XP</div>
                <div style="font-size:34px;font-weight:900;color:#fff;margin-top:4px;">+${st.xp} XP</div>
              </div>
              <div style="background:rgba(255,255,255,0.09);border:1.5px solid rgba(125,211,252,0.45);border-radius:18px;padding:16px;text-align:center;">
                <div style="font-size:14px;color:#7dd3fc;font-weight:800;">LEVEL CAPAIAN</div>
                <div style="font-size:34px;font-weight:900;color:#fff;margin-top:4px;">Level ${lvl.level}</div>
              </div>
              <div style="background:rgba(255,255,255,0.09);border:1.5px solid rgba(52,211,153,0.45);border-radius:18px;padding:16px;text-align:center;">
                <div style="font-size:14px;color:#6ee7b7;font-weight:800;">KOLEKSI BADGE</div>
                <div style="font-size:34px;font-weight:900;color:#fff;margin-top:4px;">${st.badges.length} / ${DQData.BADGES.length}</div>
              </div>
              <div style="background:rgba(255,255,255,0.09);border:1.5px solid rgba(196,181,253,0.45);border-radius:18px;padding:16px;text-align:center;">
                <div style="font-size:14px;color:#ddd6fe;font-weight:800;">RIWAYAT PROYEK</div>
                <div style="font-size:20px;font-weight:900;color:#fff;margin-top:10px;">OW #001 &amp; #002 ✓</div>
              </div>
            </div>

            <!-- 5 Badges Showcase -->
            <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;">
              ${DQData.BADGES.map(b => {
                const owned = st.badges.includes(b.id);
                return `
                  <div style="background:${owned ? 'rgba(14,65,140,0.85)' : 'rgba(255,255,255,0.05)'};border:2px solid ${owned ? '#38bdf8' : 'rgba(255,255,255,0.15)'};border-radius:16px;padding:14px 10px;text-align:center;opacity:${owned ? 1 : 0.55};">
                    <div style="font-size:32px;">${b.icon}</div>
                    <div style="font-size:13.5px;font-weight:800;color:#fff;margin-top:6px;">${b.title}</div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Action Buttons -->
            <div style="display:flex;justify-content:center;gap:20px;">
              <button class="btn btn-gold btn-lg" id="btn-view-cert">
                📜 Lihat &amp; Cetak Sertifikat
              </button>
              <button class="btn btn-cyan btn-lg" id="btn-go-reflection">
                Lanjut ke Ruang Refleksi (Scene 15) →
              </button>
            </div>
          </div>
        </div>
      `;

      root.querySelector('#btn-view-cert').onclick = () => {
        DQAudio.playClick();
        DQModals.openCertificate(app);
      };
      root.querySelector('#btn-go-reflection').onclick = () => {
        DQAudio.playClick();
        app.goToScene(15);
      };
    },

    /* ======================================================================
       SCENE 15: REFLECTION ROOM – REFLEKSI PEMBELAJARAN
       ====================================================================== */
    renderScene15(root, app) {
      const st = app.state;
      if (!st.reflection) {
        st.reflection = {
          q1: '',
          q2: '',
          rating: 5,
          saved: false,
          fb: null
        };
      }
      const ref = st.reflection;
      const lvl = app.getLevelInfo();

      root.innerHTML = `
        <div style="display:grid;grid-template-columns:360px 1fr 410px;gap:24px;height:100%;">
          <!-- Left: Cozy Reflection Visual Card -->
          <div class="glass-panel" style="padding:20px;display:flex;flex-direction:column;justify-content:space-between;background:linear-gradient(180deg,rgba(10,36,82,0.78),rgba(6,22,52,0.92));">
            <div style="border-radius:16px;overflow:hidden;height:420px;border:2px solid rgba(125,211,252,0.45);">
              <img src="assets/bg_reflection.jpg" alt="Reflection Room" style="width:100%;height:100%;object-fit:cover;" />
            </div>
            <div>
              <h3 style="font-size:21px;font-weight:900;color:#fde68a;margin-bottom:8px;">🌅 Ruang Refleksi Konsultan</h3>
              <p style="font-size:15px;color:#e0f2fe;line-height:1.5;">
                Seorang Database Designer hebat selalu mengevaluasi pengalaman proyeknya agar rancangan sistem berikutnya semakin kokoh dan efisien.
              </p>
            </div>
          </div>

          <!-- Center: Reflection Questions & Self-Assessment -->
          <div class="light-card" style="display:flex;flex-direction:column;overflow:hidden;">
            <div class="panel-header-bar">
              <span>✍️ Jurnal Refleksi Pembelajaran</span>
              <span>Prinsip: Reflektif</span>
            </div>
            <div style="padding:22px 26px;flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:12px;">
              <div>
                <label style="font-size:16px;font-weight:800;color:#0f2547;display:block;margin-bottom:6px;">
                  1. Apa hal paling penting yang kamu pelajari hari ini?
                </label>
                <textarea id="ref-q1" class="dq-textarea" rows="3" style="font-size:16px;padding:12px;" placeholder="Contoh: Saya memahami cara menentukan Primary Key, Foreign Key, merancang ERD, dan menormalkan tabel hingga 3NF...">${app.escapeHtml(ref.q1)}</textarea>
                <div style="display:flex;gap:8px;margin-top:6px;flex-wrap:wrap;">
                  <button type="button" class="chip-inspire btn btn-ghost btn-sm" data-target="q1" data-txt="Saya belajar mengubah kebutuhan klien menjadi ERD, menghubungkan PK & FK, serta mencegah duplikasi data dengan normalisasi 1NF-3NF." style="font-size:12px;padding:4px 10px;color:#0284c7;background:#eff6ff;border-color:#93c5fd;">+ Ide: ERD &amp; Normalisasi</button>
                  <button type="button" class="chip-inspire btn btn-ghost btn-sm" data-target="q1" data-txt="Saya memahami alur nyata merancang database dari Order Work klien sampai implementasi SQL dan pengujian QA." style="font-size:12px;padding:4px 10px;color:#0284c7;background:#eff6ff;border-color:#93c5fd;">+ Ide: Alur Konsultan &amp; SQL</button>
                </div>
              </div>

              <div>
                <label style="font-size:16px;font-weight:800;color:#0f2547;display:block;margin-bottom:6px;">
                  2. Bagaimana kamu akan menerapkan ilmu ini pada proyek RPL berikutnya?
                </label>
                <textarea id="ref-q2" class="dq-textarea" rows="3" style="font-size:16px;padding:12px;" placeholder="Contoh: Saat membuat aplikasi web/mobile sekolah atau UKK RPL, saya akan merancang ERD dan 3NF terlebih dahulu sebelum membuat tabel SQL...">${app.escapeHtml(ref.q2)}</textarea>
                <div style="display:flex;gap:8px;margin-top:6px;">
                  <button type="button" class="chip-inspire btn btn-ghost btn-sm" data-target="q2" data-txt="Saya akan merancang skema ERD & normalisasi 3NF terlebih dahulu sebelum coding aplikasi tugas proyek / UKK RPL agar database rapi." style="font-size:12px;padding:4px 10px;color:#0284c7;background:#eff6ff;border-color:#93c5fd;">+ Ide: Proyek Aplikasi &amp; UKK RPL</button>
                </div>
              </div>

              <div style="background:#f1f7ff;border:1.5px solid #bfdbfe;border-radius:14px;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;">
                <span style="font-size:15px;font-weight:800;color:#1e3a8a;">Tingkat Pemahaman Diri:</span>
                <div style="display:flex;gap:8px;">
                  ${[1, 2, 3, 4, 5].map(star => `
                    <button type="button" class="star-rate-btn" data-star="${star}" style="font-size:26px;background:transparent;border:none;cursor:pointer;filter:${star <= ref.rating ? 'none' : 'grayscale(1) opacity(0.35)'};">⭐</button>
                  `).join('')}
                </div>
              </div>

              ${renderFeedback(ref.fb)}
            </div>
          </div>

          <!-- Right: Journey Summary & Save Button (matching Collage 15) -->
          <div class="glass-panel" style="padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;">
            <div>
              <div style="font-size:20px;font-weight:900;color:#7dd3fc;margin-bottom:16px;">📊 Ringkasan Perjalanan</div>
              <div style="display:flex;flex-direction:column;gap:12px;">
                <div class="pillar-item">
                  <span style="font-size:26px;">🗺️</span>
                  <div><strong style="font-size:18px;">${st.completedScenes.length} / 15 Scene</strong><div style="font-size:13px;color:#cbd5e1;">Tahapan Misi Terselesaikan</div></div>
                </div>
                <div class="pillar-item">
                  <span style="font-size:26px;">⬆️</span>
                  <div><strong style="font-size:18px;">Level ${lvl.level} (${lvl.title})</strong><div style="font-size:13px;color:#cbd5e1;">Pangkat Konsultan</div></div>
                </div>
                <div class="pillar-item">
                  <span style="font-size:26px;">🏅</span>
                  <div><strong style="font-size:18px;">${st.badges.length} Badge Keahlian</strong><div style="font-size:13px;color:#cbd5e1;">Kompetensi Basis Data</div></div>
                </div>
                <div class="pillar-item">
                  <span style="font-size:26px;">✨</span>
                  <div><strong style="font-size:18px;">+${st.xp} XP</strong><div style="font-size:13px;color:#cbd5e1;">Total Poin Pengalaman</div></div>
                </div>
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:10px;">
              <button class="btn btn-gold btn-lg" id="btn-save-reflection" style="width:100%;">
                💾 Simpan &amp; Selesai
              </button>
              <button class="btn btn-ghost btn-sm" id="btn-open-report-s15" style="width:100%;">
                📄 Buka Laporan Hasil Belajar &amp; Leaderboard
              </button>
            </div>
          </div>
        </div>
      `;

      const q1El = root.querySelector('#ref-q1');
      const q2El = root.querySelector('#ref-q2');
      q1El.oninput = () => { ref.q1 = q1El.value; app.saveState(); };
      q2El.oninput = () => { ref.q2 = q2El.value; app.saveState(); };

      root.querySelectorAll('.chip-inspire').forEach(btn => {
        btn.onclick = () => {
          DQAudio.playClick();
          const tgt = btn.getAttribute('data-target');
          ref[tgt] = btn.getAttribute('data-txt');
          this.renderScene15(root, app);
        };
      });

      root.querySelectorAll('.star-rate-btn').forEach(btn => {
        btn.onclick = () => {
          DQAudio.playClick();
          ref.rating = Number(btn.getAttribute('data-star'));
          this.renderScene15(root, app);
        };
      });

      root.querySelector('#btn-save-reflection').onclick = () => {
        if ((ref.q1 || '').trim().length < 5 || (ref.q2 || '').trim().length < 5) {
          DQAudio.playError();
          ref.fb = { type: 'error', text: 'Tuliskan refleksi singkat pada kedua pertanyaan di atas terlebih dahulu (atau klik tombol + Ide).' };
          this.renderScene15(root, app);
          return;
        }
        ref.saved = true;
        ref.fb = { type: 'success', text: 'Refleksi tersimpan! Seluruh perjalanan DataQuest tuntas 100%!' };
        app.completeScene(15, true);
        DQAudio.playFanfare();
        this.renderScene15(root, app);
        setTimeout(() => DQModals.openTeacherReport(app), 700);
      };

      root.querySelector('#btn-open-report-s15').onclick = () => {
        DQAudio.playClick();
        DQModals.openTeacherReport(app);
      };
    }
  };

  window.DQScenes9to15 = Scenes9to15;
})();
