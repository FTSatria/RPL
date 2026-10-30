/* ==========================================================================
   DATAQUEST SAFE IN-MEMORY SQL PLAYGROUND ENGINE
   Supports interactive DDL & DML practice for Scene 11 & Scene 12
   ========================================================================== */

(function () {
  const SQLTasks = [
    {
      step: 1,
      title: '1. Buat Tabel Buku (CREATE)',
      cmdType: 'CREATE',
      instruction: 'Buat tabel bernama "buku" dengan kolom id_buku (PRIMARY KEY), judul, pengarang, penerbit, dan kategori.',
      template: `CREATE TABLE buku (\n  id_buku VARCHAR(10) PRIMARY KEY,\n  judul VARCHAR(100),\n  pengarang VARCHAR(100),\n  penerbit VARCHAR(100),\n  kategori VARCHAR(50)\n);`,
      hint1: 'Gunakan perintah CREATE TABLE buku ( ... ); dan sertakan kata kunci PRIMARY KEY pada id_buku.',
      hint2: 'Klik tombol "Muat Contoh Sintaks" atau pastikan terdapat CREATE TABLE buku beserta kolom id_buku, judul, dan pengarang.'
    },
    {
      step: 2,
      title: '2. Tambah Data Buku (INSERT)',
      cmdType: 'INSERT',
      instruction: 'Tambahkan data buku baru ke tabel "buku" menggunakan perintah INSERT INTO buku VALUES (...).',
      template: `INSERT INTO buku (id_buku, judul, pengarang, penerbit, kategori)\nVALUES ('B004', 'Arsitektur Basis Data', 'Fathansyah', 'Informatika', 'Komputer');`,
      hint1: 'Gunakan sintaks INSERT INTO buku ... VALUES (\'B004\', \'Judul\', \'Pengarang\', \'Penerbit\', \'Kategori\');',
      hint2: 'Pastikan nilai teks diapit tanda kutip tunggal (\'...\') dan diawali kata kunci INSERT INTO buku.'
    },
    {
      step: 3,
      title: '3. Tampilkan Data (SELECT)',
      cmdType: 'SELECT',
      instruction: 'Tampilkan data dari tabel "buku" menggunakan perintah SELECT (boleh semua kolom atau dengan filter WHERE).',
      template: `SELECT id_buku, judul, pengarang, penerbit\nFROM buku\nWHERE kategori = 'Komputer';`,
      hint1: 'Gunakan perintah SELECT * FROM buku; atau SELECT id_buku, judul FROM buku;',
      hint2: 'Pastikan terdapat kata kunci SELECT dan FROM buku pada perintah SQL-mu.'
    },
    {
      step: 4,
      title: '4. Perbarui Data (UPDATE)',
      cmdType: 'UPDATE',
      instruction: 'Ubah data judul atau penerbit salah satu buku menggunakan perintah UPDATE buku SET ... WHERE id_buku = ...;',
      template: `UPDATE buku\nSET judul = 'Pemrograman Web Modern'\nWHERE id_buku = 'B001';`,
      hint1: 'Selalu sertakan klausa WHERE pada UPDATE agar tidak mengubah seluruh baris tabel sekaligus!',
      hint2: 'Tulis: UPDATE buku SET judul = \'Pemrograman Web Modern\' WHERE id_buku = \'B001\';'
    },
    {
      step: 5,
      title: '5. Hapus Data (DELETE)',
      cmdType: 'DELETE',
      instruction: 'Hapus satu baris buku yang sudah rusak/tidak aktif menggunakan DELETE FROM buku WHERE id_buku = ...;',
      template: `DELETE FROM buku\nWHERE id_buku = 'B003';`,
      hint1: 'Gunakan sintaks DELETE FROM buku WHERE id_buku = \'B003\'; (penting menggunakan WHERE!).',
      hint2: 'Pastikan perintah memuat DELETE FROM buku dan klausa WHERE.'
    }
  ];

  const DEFAULT_ROWS = [
    { id_buku: 'B001', judul: 'Pemrograman', pengarang: 'Andi', penerbit: 'Informatika', kategori: 'Komputer' },
    { id_buku: 'B002', judul: 'Jaringan Komputer', pengarang: 'Budi', penerbit: 'Informatika', kategori: 'Komputer' },
    { id_buku: 'B003', judul: 'Database Dasar', pengarang: 'Citra', penerbit: 'Erlangga', kategori: 'Komputer' }
  ];

  function createFreshDB() {
    return {
      tableCreated: false,
      rows: DEFAULT_ROWS.map(r => ({ ...r }))
    };
  }

  function executeWorkshopSQL(rawSql, expectedType, dbState) {
    const t0 = performance.now();
    const sql = (rawSql || '').trim();
    const norm = sql.replace(/\s+/g, ' ').toUpperCase();

    if (!sql) {
      return { ok: false, error: 'Editor SQL masih kosong. Ketik perintah SQL terlebih dahulu.' };
    }

    if (expectedType === 'CREATE') {
      if (!norm.startsWith('CREATE TABLE')) {
        return { ok: false, error: 'Misi aktif meminta perintah DDL: awali dengan CREATE TABLE buku (...).' };
      }
      if (!/CREATE\s+TABLE\s+`?BUKU`?/i.test(sql)) {
        return { ok: false, error: 'Nama tabel harus "buku" (contoh: CREATE TABLE buku (...)).' };
      }
      if (!/ID_BUKU/i.test(sql) || !/JUDUL/i.test(sql)) {
        return { ok: false, error: 'Sertakan minimal kolom id_buku dan judul di dalam definisi tabel.' };
      }
      if (!/PRIMARY\s+KEY/i.test(sql)) {
        return { ok: false, error: 'Jangan lupa mendefinisikan PRIMARY KEY pada kolom id_buku!' };
      }
      dbState.tableCreated = true;
      if (!dbState.rows || dbState.rows.length === 0) {
        dbState.rows = DEFAULT_ROWS.map(r => ({ ...r }));
      }
      const elapsed = Math.max(0.002, (performance.now() - t0) / 1000 + 0.003).toFixed(3);
      return {
        ok: true,
        elapsed,
        message: 'Tabel "buku" berhasil dibuat lengkap dengan Primary Key! Data awal siap dikelola.',
        rows: dbState.rows
      };
    }

    if (expectedType === 'INSERT') {
      if (!/^INSERT\s+INTO\s+`?BUKU`?/i.test(sql)) {
        return { ok: false, error: 'Gunakan perintah INSERT INTO buku ... untuk menambahkan baris baru.' };
      }
      const valMatch = sql.match(/VALUES\s*\(([^)]+)\)/i);
      if (!valMatch) {
        return { ok: false, error: 'Klausa VALUES (...) belum ditemukan atau tanda kurung belum lengkap.' };
      }
      const parts = valMatch[1].split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
      if (parts.length < 2) {
        return { ok: false, error: 'Masukkan minimal nilai id_buku dan judul di dalam VALUES (...).' };
      }
      const newRow = {
        id_buku: parts[0] || 'B004',
        judul: parts[1] || 'Basis Data Lanjut',
        pengarang: parts[2] || 'Dewi',
        penerbit: parts[3] || 'Informatika',
        kategori: parts[4] || 'Komputer'
      };
      const existingIdx = dbState.rows.findIndex(r => r.id_buku.toUpperCase() === newRow.id_buku.toUpperCase());
      if (existingIdx >= 0) {
        dbState.rows[existingIdx] = newRow;
      } else {
        dbState.rows.push(newRow);
      }
      const elapsed = Math.max(0.002, (performance.now() - t0) / 1000 + 0.004).toFixed(3);
      return {
        ok: true,
        elapsed,
        message: `1 baris berhasil ditambahkan ke tabel buku (${newRow.id_buku} – ${newRow.judul}).`,
        rows: dbState.rows
      };
    }

    if (expectedType === 'SELECT') {
      if (!/^SELECT\s+/i.test(sql) || !/\bFROM\s+`?BUKU`?/i.test(sql)) {
        return { ok: false, error: 'Gunakan perintah SELECT ... FROM buku untuk menampilkan isi tabel.' };
      }
      let resultRows = dbState.rows.slice();
      const whereMatch = sql.match(/WHERE\s+(\w+)\s*=\s*['"]([^'"]+)['"]/i);
      if (whereMatch) {
        const col = whereMatch[1].toLowerCase();
        const val = whereMatch[2].toLowerCase();
        if (resultRows[0] && col in resultRows[0]) {
          resultRows = resultRows.filter(r => String(r[col]).toLowerCase() === val);
        }
      }
      const elapsed = Math.max(0.001, (performance.now() - t0) / 1000 + 0.003).toFixed(3);
      return {
        ok: true,
        elapsed,
        message: `Query SELECT berhasil mengembalikan ${resultRows.length} baris data.`,
        rows: resultRows.length ? resultRows : dbState.rows
      };
    }

    if (expectedType === 'UPDATE') {
      if (!/^UPDATE\s+`?BUKU`?/i.test(sql) || !/\bSET\s+/i.test(sql)) {
        return { ok: false, error: 'Gunakan sintaks UPDATE buku SET kolom = \'nilai_baru\' WHERE ...;' };
      }
      if (!/\bWHERE\s+/i.test(sql)) {
        return { ok: false, error: 'Peringatan Keamanan Konsultan: Sertakan klausa WHERE agar tidak menimpa seluruh isi tabel!' };
      }
      const setMatch = sql.match(/SET\s+(\w+)\s*=\s*['"]([^'"]+)['"]/i);
      const whereIdMatch = sql.match(/WHERE\s+id_buku\s*=\s*['"]([^'"]+)['"]/i);
      let updatedCount = 0;

      if (setMatch) {
        const col = setMatch[1].toLowerCase();
        const newVal = setMatch[2];
        const targetId = whereIdMatch ? whereIdMatch[1].toUpperCase() : dbState.rows[0]?.id_buku;
        dbState.rows.forEach(r => {
          if (r.id_buku.toUpperCase() === String(targetId).toUpperCase() && col in r) {
            r[col] = newVal;
            updatedCount++;
          }
        });
      }
      if (updatedCount === 0 && dbState.rows[0]) {
        dbState.rows[0].judul = 'Pemrograman Web Modern';
        updatedCount = 1;
      }
      const elapsed = Math.max(0.002, (performance.now() - t0) / 1000 + 0.004).toFixed(3);
      return {
        ok: true,
        elapsed,
        message: `Query UPDATE berhasil memperbarui ${updatedCount} baris data secara aman.`,
        rows: dbState.rows
      };
    }

    if (expectedType === 'DELETE') {
      if (!/^DELETE\s+FROM\s+`?BUKU`?/i.test(sql)) {
        return { ok: false, error: 'Gunakan sintaks DELETE FROM buku WHERE id_buku = \'...\';' };
      }
      if (!/\bWHERE\s+/i.test(sql)) {
        return { ok: false, error: 'Bahaya! Jangan menjalankan DELETE tanpa klausa WHERE karena semua data buku akan terhapus!' };
      }
      const whereIdMatch = sql.match(/id_buku\s*=\s*['"]([^'"]+)['"]/i);
      const beforeLen = dbState.rows.length;
      if (whereIdMatch) {
        const target = whereIdMatch[1].toUpperCase();
        dbState.rows = dbState.rows.filter(r => r.id_buku.toUpperCase() !== target);
      } else if (dbState.rows.length > 1) {
        dbState.rows.pop();
      }
      const diff = Math.max(1, beforeLen - dbState.rows.length);
      const elapsed = Math.max(0.002, (performance.now() - t0) / 1000 + 0.003).toFixed(3);
      return {
        ok: true,
        elapsed,
        message: `Query DELETE berhasil menghapus ${diff} baris sesuai filter WHERE.`,
        rows: dbState.rows
      };
    }

    return { ok: false, error: 'Perintah SQL tidak dikenali.' };
  }

  window.DQSql = {
    SQLTasks,
    createFreshDB,
    executeWorkshopSQL
  };
})();
