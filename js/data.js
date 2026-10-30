/* ==========================================================================
   DATAQUEST: CURRICULUM, STORYBOARD & GAME SIMULATION DATA (15 SCENES)
   ========================================================================== */

(function () {
  const AVATARS = [
    {
      id: 'av1',
      name: 'Raka Pratama',
      label: 'Analis Sistem RPL',
      img: 'assets/avatar_1.jpg'
    },
    {
      id: 'av2',
      name: 'Nadia Putri',
      label: 'Arsitek Data Muda',
      img: 'assets/avatar_2.jpg'
    },
    {
      id: 'av3',
      name: 'Dimas Aditya',
      label: 'Spesialis SQL & Backend',
      img: 'assets/avatar_3.jpg'
    },
    {
      id: 'av4',
      name: 'Aisyah Zahra',
      label: 'Konsultan Skema Data',
      img: 'assets/avatar_4.jpg'
    },
    {
      id: 'av5',
      name: 'Bima Saputra',
      label: 'Engineer Relasional',
      img: 'assets/avatar_5.jpg'
    },
    {
      id: 'av6',
      name: 'Sinta Maharani',
      label: 'Spesialis QA & Normalisasi',
      img: 'assets/avatar_6.jpg'
    }
  ];

  const ROLES = [
    'Junior Database Designer',
    'Junior Data Architect – TeFa RPL',
    'Database Consultant Trainee',
    'Junior Backend & SQL Engineer'
  ];

  const BADGES = [
    {
      id: 'badge_detective',
      title: 'Data Detective',
      icon: '🔍',
      scene: 5,
      desc: 'Mampu menggali dan menyaring kebutuhan informasi klien secara akurat.'
    },
    {
      id: 'badge_architect',
      title: 'ERD & Entity Architect',
      icon: '📐',
      scene: 8,
      desc: 'Menguasai pemodelan entitas, atribut kunci, relasi, dan kardinalitas ERD.'
    },
    {
      id: 'badge_normalizer',
      title: 'Normalization Specialist',
      icon: '🧩',
      scene: 10,
      desc: 'Berhasil mengeliminasi redundansi dan anomali data melalui 1NF, 2NF, dan 3NF.'
    },
    {
      id: 'badge_sql',
      title: 'SQL Craftsman',
      icon: '💻',
      scene: 11,
      desc: 'Terampil mengimplementasikan DDL & DML (CREATE, INSERT, SELECT, UPDATE, DELETE).'
    },
    {
      id: 'badge_master',
      title: 'Certified Database Designer',
      icon: '🏆',
      scene: 13,
      desc: 'Lulus Boss Challenge & audit Quality Assurance dengan standar industri.'
    }
  ];

  const SCENES = [
    {
      id: 1,
      code: '01',
      title: 'Opening – Dunia DataQuest',
      shortTitle: 'Dunia DataQuest',
      principle: 'Terarah',
      xpReward: 0,
      bg: 'assets/bg_opening.jpg',
      narration: 'Selamat datang di DataQuest. Siapkah kamu menjadi seorang Database Designer?',
      instruction: 'Klik "Mulai Petualangan" untuk memulai karirmu di perusahaan konsultan software DataQuest.',
      hint1: 'Gunakan tombol Pengaturan Audio di kanan atas jika ingin mengatur musik, efek suara, atau narasi.',
      hint2: 'Klik tombol kuning "Mulai Petualangan" di tengah layar untuk masuk ke pendaftaran konsultan.'
    },
    {
      id: 2,
      code: '02',
      title: 'Character Setup – Identitas Pemain',
      shortTitle: 'Identitas Pemain',
      principle: 'Terarah',
      xpReward: 50,
      bg: 'assets/bg_opening.jpg',
      narration: 'Perjalanan profesionalmu dimulai sekarang. Pilih avatar dan lengkapi kartu identitas konsultanmu.',
      instruction: 'Pilih avatar karakter, ketik nama lengkapmu, pilih peran konsultan, lalu klik Konfirmasi.',
      hint1: 'Isi kolom Nama Pemain (minimal 2 karakter) agar sertifikat kelulusanmu mencantumkan namamu.',
      hint2: 'Klik salah satu dari 6 kartu Avatar di sebelah kiri, isi Nama Pemain, lalu tekan tombol kuning "Konfirmasi".'
    },
    {
      id: 3,
      code: '03',
      title: 'Mission Briefing – Panggilan Proyek',
      shortTitle: 'Panggilan Proyek',
      principle: 'Kontekstual',
      xpReward: 100,
      bg: 'assets/bg_opening.jpg',
      narration: 'Ada proyek baru dari Unit Perpustakaan Sekolah. Klien membutuhkan sistem informasi perpustakaan. Kamu ditugaskan merancang basis datanya.',
      instruction: 'Buka dokumen Order Work #001, periksa seluruh poin kebutuhan klien, lalu klik Terima Proyek.',
      hint1: 'Sebagai konsultan profesional, buka map Order Work #001 terlebih dahulu dan centang semua poin kebutuhan klien.',
      hint2: 'Pastikan kelima daftar kebutuhan klien sudah ditandai terbaca, kemudian klik tombol "Terima Proyek".'
    },
    {
      id: 4,
      code: '04',
      title: 'Database Academy – Pengenalan Basis Data',
      shortTitle: 'Database Academy',
      principle: 'Terarah & Kontekstual',
      xpReward: 150,
      bg: 'assets/bg_opening.jpg',
      narration: 'Sebelum merancang sistem klien, mari pelajari konsep basis data, komponen tabel baris dan kolom, serta fungsi DBMS dalam mengelola data secara sistematis.',
      instruction: 'Pelajari keempat kartu Komponen Utama di kiri, lalu jawab Kuis Cepat di panel kanan.',
      hint1: 'Klik keempat kartu komponen (Data, Tabel, DBMS, Pengguna) untuk membaca perannya masing-masing.',
      hint2: 'DBMS (Database Management System) berfungsi sebagai perangkat lunak yang mengelola, menyimpan, dan mengamankan akses data.'
    },
    {
      id: 5,
      code: '05',
      title: 'Data Detective – Analisis Kebutuhan',
      shortTitle: 'Analisis Kebutuhan',
      principle: 'Memicu Nalar',
      xpReward: 200,
      bg: 'assets/bg_opening.jpg',
      narration: 'Sebelum membangun database, pahami dahulu informasi apa yang dibutuhkan klien.',
      instruction: 'Tarik (drag & drop) atau klik dokumen kebutuhan yang relevan dengan Sistem Perpustakaan ke 5 slot investigasi. Abaikan data pengecoh!',
      hint1: 'Baca kutipan wawancara Kepala Perpustakaan: sistem hanya memerlukan data Anggota, Buku, Petugas, Peminjaman, dan Pengembalian.',
      hint2: 'Hindari kartu pengecoh seperti "Warna Cat Gedung" atau "Jadwal Piket Kantin". Masukkan tepat 5 dokumen kebutuhan inti perpustakaan.'
    },
    {
      id: 6,
      code: '06',
      title: 'Entity Architect – Identifikasi Entitas',
      shortTitle: 'Identifikasi Entitas',
      principle: 'Memicu Nalar & Umpan Balik',
      xpReward: 250,
      bg: 'assets/bg_opening.jpg',
      narration: 'Kelompokkan objek yang memiliki data dan identitas tersendiri menjadi entitas.',
      instruction: 'Kelompokkan setiap kartu Data Mentah (atribut) ke kotak Entitas yang tepat: Anggota, Buku, atau Petugas.',
      hint1: 'Tanyakan pada diri sendiri: apakah atribut "pengarang" menjelaskan ciri Buku, Anggota, atau Petugas?',
      hint2: 'Anggota memiliki (id_anggota, nama_anggota, alamat, telepon); Buku memiliki (id_buku, judul_buku, pengarang, penerbit); Petugas memiliki (id_petugas, nama_petugas, jabatan).'
    },
    {
      id: 7,
      code: '07',
      title: 'Key Master – Primary Key dan Foreign Key',
      shortTitle: 'PK & Foreign Key',
      principle: 'Memicu Nalar',
      xpReward: 300,
      bg: 'assets/bg_opening.jpg',
      narration: 'Setiap tabel memerlukan identitas unik. Bagaimana cara menghubungkan satu tabel dengan tabel lainnya?',
      instruction: 'Tetapkan Primary Key (PK) pada ketiga tabel, pilih Foreign Key (FK) pada tabel PEMINJAMAN, lalu hubungkan relasi antartabel.',
      hint1: 'Primary Key adalah kolom kode unik pada masing-masing tabel (id_anggota, id_pinjam, id_buku). Foreign Key adalah kolom tamu di PEMINJAMAN yang merujuk ke PK tabel lain.',
      hint2: 'Set PK: id_anggota (ANGGOTA), id_pinjam (PEMINJAMAN), id_buku (BUKU). Set FK di PEMINJAMAN: id_anggota & id_buku. Lalu aktifkan kedua garis relasi 1..N!'
    },
    {
      id: 8,
      code: '08',
      title: 'ERD Architect – Membangun ERD',
      shortTitle: 'Membangun ERD',
      principle: 'Memicu Nalar & Umpan Balik',
      xpReward: 350,
      bg: 'assets/bg_opening.jpg',
      narration: 'Sekarang saatnya membangun rancangan hubungan data berdasarkan kebutuhan klien pada kanvas ERD.',
      instruction: 'Lengkapi kanvas ERD: pasang Entitas yang kosong, pilih nama Relasi belah ketupat, dan tentukan Kardinalitas yang tepat, lalu klik Periksa!',
      hint1: 'Satu Anggota dapat melakukan banyak Peminjaman (1:N), dan satu Buku dapat tercatat pada banyak transaksi Peminjaman dari waktu ke waktu (1:N).',
      hint2: 'Susunan kanvas: Entitas Kiri = ANGGOTA, Relasi 1 = Melakukan (1:N), Entitas Tengah = PEMINJAMAN, Relasi 2 = Memuat (N:1 terhadap BUKU / 1:N dari BUKU ke PEMINJAMAN), Entitas Kanan = BUKU.'
    },
    {
      id: 9,
      code: '09',
      title: 'Table Engineer – Transformasi ERD',
      shortTitle: 'Transformasi ERD',
      principle: 'Terarah & Memicu Nalar',
      xpReward: 350,
      bg: 'assets/bg_opening.jpg',
      narration: 'Rancangan ERD harus diterjemahkan menjadi struktur tabel relasional yang dapat diimplementasikan di DBMS.',
      instruction: 'Terjemahkan diagram ERD di sebelah kiri menjadi skema Tabel Relasional yang lengkap dengan tipe data dan penempatan Foreign Key.',
      hint1: 'Aturan emas transformasi relasi 1:N: Primary Key dari sisi "1" (ANGGOTA & BUKU) dititipkan sebagai Foreign Key ke tabel pada sisi "N" (PEMINJAMAN).',
      hint2: 'Pilih tipe VARCHAR untuk teks/kode seperti id_buku & nama, DATE untuk tgl_pinjam/tgl_kembali, dan pastikan id_anggota serta id_buku berstatus FK di tabel peminjaman.'
    },
    {
      id: 10,
      code: '10',
      title: 'Normalization Lab – Normalisasi Database',
      shortTitle: 'Normalisasi 1NF–3NF',
      principle: 'Memicu Nalar',
      xpReward: 400,
      bg: 'assets/bg_opening.jpg',
      narration: 'Database yang baik harus mengurangi redundansi dan mencegah anomali data melalui tahapan normalisasi.',
      instruction: 'Selesaikan ketiga tahapan puzzle di Normalization Lab (1NF, 2NF, dan 3NF) secara berurutan untuk menormalkan tabel perpustakaan!',
      hint1: '1NF = tiap sel harus bernilai tunggal (atomik). 2NF = pisahkan atribut yang hanya bergantung pada sebagian kunci komposit. 3NF = pisahkan atribut transitif non-kunci.',
      hint2: 'Di 1NF pecah baris multi-judul buku; di 2NF pisahkan data Master Buku dari Tabel Detail Pinjam; di 3NF pisahkan kode_kategori & rak_lokasi ke Tabel Kategori tersendiri.'
    },
    {
      id: 11,
      code: '11',
      title: 'SQL Workshop – Implementasi Database',
      shortTitle: 'SQL Workshop',
      principle: 'Terarah & Kontekstual',
      xpReward: 500,
      bg: 'assets/bg_opening.jpg',
      narration: 'Saatnya menerjemahkan rancangan database menjadi perintah SQL pada lingkungan latihan yang aman.',
      instruction: 'Selesaikan 5 misi query berurutan di Daftar Query (CREATE TABLE, INSERT, SELECT, UPDATE, DELETE) dan klik Jalankan!',
      hint1: 'Gunakan tombol "Muat Contoh Sintaks" jika kamu ingin melihat kerangka perintah SQL, lalu sesuaikan dan klik "Jalankan ▶".',
      hint2: 'Pastikan penulisan kata kunci utama sesuai tahapan aktif: CREATE TABLE buku (...), INSERT INTO buku VALUES (...), SELECT * FROM buku, UPDATE buku SET ..., DELETE FROM buku WHERE ...'
    },
    {
      id: 12,
      code: '12',
      title: 'Boss Challenge – Final Project',
      shortTitle: 'Boss Challenge',
      principle: 'Memicu Nalar',
      xpReward: 650,
      bg: 'assets/bg_opening.jpg',
      narration: 'Inilah ujian terbesarmu. Rancang database Sistem Informasi Kantin Sekolah berdasarkan kebutuhan klien secara mandiri.',
      instruction: 'Kerjakan Order Work #002 (Sistem Informasi Kantin Sekolah) melalui 4 tab perancangan mandiri, lalu kirimkan ke Tim Quality Assurance!',
      hint1: 'Periksa keempat tab (1. Analisis, 2. ERD & Kunci, 3. Normalisasi, 4. SQL). Pada transaksi kantin, satu nota Transaksi bisa membeli banyak Menu sehingga butuh tabel detail_transaksi.',
      hint2: 'Tab 1: pilih Pelanggan, Menu, Transaksi, Detail Transaksi. Tab 2: hubungkan 1:N ke detail_transaksi. Tab 3: simpan nama_menu & harga master di tabel menu (3NF). Tab 4: tulis CREATE TABLE menu.'
    },
    {
      id: 13,
      code: '13',
      title: 'Quality Assurance – Evaluasi Hasil',
      shortTitle: 'Quality Assurance',
      principle: 'Umpan Balik',
      xpReward: 400,
      bg: 'assets/bg_opening.jpg',
      narration: 'Sebelum diserahkan kepada klien, pastikan seluruh rancanganmu sudah benar melalui pengujian Quality Assurance.',
      instruction: 'Klik "Jalankan Tes QA", perbaiki temuan audit jika ada bagian yang belum sesuai, lalu klik "Kirim ke Klien".',
      hint1: 'Tim QA memeriksa 5 aspek: Struktur Tabel, Relasi PK/FK, Normalisasi 1NF–3NF, Validasi SQL, dan Kesesuaian Kebutuhan Klien.',
      hint2: 'Jika ada status kuning/merah pada daftar pemeriksaan QA, klik tombol perbaikan yang ditunjukkan atau kembali ke rincian modul untuk menyempurnakannya, lalu jalankan ulang tes.'
    },
    {
      id: 14,
      code: '14',
      title: 'Achievement – Database Designer',
      shortTitle: 'Achievement',
      principle: 'Umpan Balik',
      xpReward: 250,
      bg: 'assets/bg_opening.jpg',
      narration: 'Selamat! Kamu berhasil menyelesaikan proyek perancangan basis data dan meraih sertifikasi Database Designer.',
      instruction: 'Lihat rekap skor, koleksi badge, riwayat proyek, dan buka Sertifikat Resmi kamu sebelum menuju Ruang Refleksi.',
      hint1: 'Klik tombol kuning "Lihat Sertifikat" untuk menampilkan dan mencetak sertifikat kelulusan konsultan DataQuest.',
      hint2: 'Setelah memeriksa pencapaianmu, klik "Lanjut ke Ruang Refleksi" untuk menuntaskan perjalanan belajarmu.'
    },
    {
      id: 15,
      code: '15',
      title: 'Reflection Room – Refleksi Pembelajaran',
      shortTitle: 'Reflection Room',
      principle: 'Reflektif',
      xpReward: 200,
      bg: 'assets/bg_reflection.jpg',
      narration: 'Apa hal paling penting yang kamu pelajari hari ini? Bagaimana pengetahuan ini akan kamu gunakan dalam proyek berikutnya?',
      instruction: 'Tuliskan refleksi pengalamanmu selama merancang database, nilai pemahaman dirimu, lalu klik Simpan & Selesai.',
      hint1: 'Ceritakan bagian mana yang paling membuka wawasanmu—misalnya pentingnya Foreign Key atau bagaimana normalisasi mencegah duplikasi data.',
      hint2: 'Isi kedua kolom refleksi dan pilih bintang evaluasi diri, lalu klik "Simpan & Selesai" untuk membuka Laporan Hasil Belajar.'
    }
  ];

  /* ---------------- SCENE 04 DATA: DATABASE ACADEMY ---------------- */
  const ACADEMY_COMPONENTS = [
    {
      id: 'comp_data',
      icon: '📄',
      name: 'Data',
      tagline: 'Fakta mentah yang belum diolah',
      detail: 'Contoh di Perpustakaan: kode "BK-001", judul "Algoritma & Pemrograman", NIS "2026104", atau tanggal "2026-10-30". Jika tersimpan terpisah-pisah di kertas, data sulit dicari.',
      visual: 'Nilai atomik: "B001", "Budi Santoso", "Informatika"'
    },
    {
      id: 'comp_tabel',
      icon: '📊',
      name: 'Tabel (Baris & Kolom)',
      tagline: 'Wadah terstruktur penyimpan entitas',
      detail: 'Di dalam basis data relasional, data disusun dalam Tabel. KOLOM (Field/Atribut) mendefinisikan jenis data (mis. judul, pengarang), sedangkan BARIS (Record/Tuple) berisi satu data utuh.',
      visual: 'Kolom = Atribut vertikal | Baris = 1 Rekaman utuh'
    },
    {
      id: 'comp_dbms',
      icon: '⚙️',
      name: 'DBMS',
      tagline: 'Software pengelola Basis Data',
      detail: 'Database Management System (seperti MySQL, PostgreSQL, MariaDB, Oracle) adalah perangkat lunak yang bertugas menyimpan, mengelola, mengamankan, dan melayani query data dengan cepat.',
      visual: 'Aplikasi Web ⇄ DBMS (MySQL/PostgreSQL) ⇄ Storage'
    },
    {
      id: 'comp_user',
      icon: '👩‍💼',
      name: 'Pengguna (User)',
      tagline: 'Pihak yang berinteraksi dengan sistem',
      detail: 'Meliputi Database Designer/Administrator yang merancang skema, Programmer yang menghubungkan aplikasi, serta End-User seperti Petugas & Anggota Perpustakaan.',
      visual: ' Pustakawan, Siswa Anggota, Admin Sistem'
    }
  ];

  const ACADEMY_QUIZ = [
    {
      q: '1. Apa fungsi utama dari DBMS (Database Management System)?',
      options: [
        { id: 'A', text: 'A. Mengedit foto sampul buku perpustakaan' },
        { id: 'B', text: 'B. Mengelola, menyimpan, dan mengatur akses basis data secara sistematis' },
        { id: 'C', text: 'C. Mengganti perangkat keras monitor dan jaringan' },
        { id: 'D', text: 'D. Menghapus sistem operasi komputer server' }
      ],
      correct: 'B',
      explainWrong: 'Kurang tepat! Ingat bahwa DBMS adalah sistem perangkat lunak khusus untuk mengelola basis data, bukan editor grafis atau hardware.'
    },
    {
      q: '2. Pada tabel buku, satu rekaman utuh milik buku "B001 - Basis Data - Fathansyah" disebut...',
      options: [
        { id: 'A', text: 'A. Baris (Record / Tuple)' },
        { id: 'B', text: 'B. Server Jaringan' },
        { id: 'C', text: 'C. Bahasa Pemrograman' },
        { id: 'D', text: 'D. Kabel Database' }
      ],
      correct: 'A',
      explainWrong: 'Coba perhatikan lagi struktur tabel: satu kesatuan data mendatar dalam tabel disebut Baris (Record/Tuple), sedangkan tajuk tegaknya disebut Kolom (Atribut).'
    }
  ];

  /* ---------------- SCENE 05 DATA: DATA DETECTIVE ---------------- */
  const DETECTIVE_EVIDENCE = [
    { id: 'ev_anggota', label: 'Data Anggota Perpustakaan', icon: '🧑‍🎓', valid: true, desc: 'NIS, nama siswa, kelas/alamat, nomor telepon anggota.' },
    { id: 'ev_buku', label: 'Data Koleksi Buku', icon: '📚', valid: true, desc: 'Kode buku, judul, pengarang, penerbit, stok/kategori.' },
    { id: 'ev_petugas', label: 'Data Petugas Layanan', icon: '🪪', valid: true, desc: 'ID petugas, nama pustakawan, shift/jabatan.' },
    { id: 'ev_pinjam', label: 'Transaksi Peminjaman', icon: '📤', valid: true, desc: 'Nomor pinjam, siapa yang meminjam, buku apa, tanggal pinjam.' },
    { id: 'ev_kembali', label: 'Transaksi Pengembalian', icon: '📥', valid: true, desc: 'Tanggal kembali aktual, status keterlambatan & denda.' },
    { id: 'ev_cat', label: 'Warna Cat Dinding Ruang Baca', icon: '🎨', valid: false, desc: 'Catatan dekorasi ruangan yang tidak relevan dengan sistem informasi transaksi.' },
    { id: 'ev_cuaca', label: 'Ramalan Cuaca Harian Sekolah', icon: '⛅', valid: false, desc: 'Informasi eksternal yang tidak diminta dalam Order Work #001.' }
  ];

  /* ---------------- SCENE 06 DATA: ENTITY ARCHITECT ---------------- */
  const ENTITY_CARDS = [
    { id: 'at_id_ang', label: 'id_anggota', target: 'Anggota' },
    { id: 'at_judul', label: 'judul_buku', target: 'Buku' },
    { id: 'at_nm_ptg', label: 'nama_petugas', target: 'Petugas' },
    { id: 'at_nm_ang', label: 'nama_anggota', target: 'Anggota' },
    { id: 'at_pengarang', label: 'pengarang', target: 'Buku' },
    { id: 'at_id_ptg', label: 'id_petugas', target: 'Petugas' },
    { id: 'at_alamat', label: 'alamat & telepon', target: 'Anggota' },
    { id: 'at_penerbit', label: 'id_buku & penerbit', target: 'Buku' },
    { id: 'at_jabatan', label: 'jabatan', target: 'Petugas' }
  ];

  /* ---------------- LEADERBOARD SIMULASI KONSULTAN ---------------- */
  const CONSULTANT_LEADERBOARD = [
    { name: 'Rizky Pratama (SMK Negeri 1 RPL)', role: 'Senior Associate', xp: 4150, badges: 5 },
    { name: 'Aulia Rahma (SMK Telkom RPL)', role: 'Database Designer', xp: 3950, badges: 5 },
    { name: 'Kevin Wijaya (SMK Nusantara)', role: 'Database Designer', xp: 3700, badges: 4 },
    { name: 'Siti Nurhaliza (SMK Negeri 4)', role: 'Associate Designer', xp: 3450, badges: 4 }
  ];

  window.DQData = {
    AVATARS,
    ROLES,
    BADGES,
    SCENES,
    ACADEMY_COMPONENTS,
    ACADEMY_QUIZ,
    DETECTIVE_EVIDENCE,
    ENTITY_CARDS,
    CONSULTANT_LEADERBOARD
  };
})();
