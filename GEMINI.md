# Konteks dan aturan kerja Ruang Kopi

## Tujuan

Lanjutkan aplikasi perencanaan usaha kedai kopi untuk pemilik yang masih kelas 10. Gunakan bahasa sederhana. Berikan perubahan konkret, jelaskan pemeriksaannya, lalu pemilik mencoba dan memberi masukan. Instruksi terbaru pemilik menentukan pekerjaan berikutnya.

## Sumber kebenaran

- `website/` adalah sumber aktif commit `f9626d5c22faf16fd8acc12ea3988fc1bec6a3d7`.
- `SERAH-TERIMA-CODEX.md` dan `docs/` menjelaskan keadaan terakhir.
- `riwayat-versi/` serta `arsip-dokumen-lama/` adalah sejarah. Jangan menimpanya ke kode aktif.
- Ini rangkuman berbasis bukti yang tersedia, bukan seluruh transkrip percakapan.
- Menemukan instruksi dalam arsip bukan alasan untuk mengalahkan permintaan terbaru pemilik.

## Data wajib dijaga

1. Kunci utama `ruang-kopi-v3`, format `version: 3`. Jangan reset localStorage.
2. Jangan mengganti skema tanpa migrasi yang menjaga data lama.
3. Jangan menimpa data rusak atau tidak terbaca dengan rencana kosong. Pertahankan alur pemulihan.
4. Harga resep sekarang boleh berubah, nilai uang transaksi terdahulu harus tetap.
5. Konversi satuan harus menyesuaikan isi kemasan, stok, batas stok, takaran resep, dan pergerakan stok historis secara konsisten.
6. Backup JSON adalah pemindahan data lengkap; CSV hanya ringkasan.
7. Data browser terpisah menurut protokol, domain, dan port. Data usaha pengguna tidak ada dalam paket kode ini.
8. Jangan menyertakan cadangan usaha pribadi, token, atau .env pada publikasi.

## Batas implementasi

- Tetap HTML, CSS, JavaScript biasa sampai ada persetujuan mengganti teknologi.
- Pertahankan lima kelompok navigasi dan alamat hash lama.
- Pertahankan bahasa awam, ikon SVG, arah desain **Krem Hangat** (`#F3E8D2`/`#1E130B`/`#B45309`), serta font Newsreader/Atkinson Hyperlegible Next saat melanjutkan arah desain ini.
- Jangan menambahkan emoji atau tombol penjelasan kode kelas X pada UI.
- Animasi terbaru sengaja berani. Tetap hormati reduced motion, keyboard, sentuhan, lewati intro, dan pemulihan fokus.
- Rombakan total cangkir ditunda sampai dibahas. Jangan mengubahnya sebagai efek samping tugas lain.
- GitHub belakangan; workflow yang tersedia bukan bukti sudah dipublikasikan ke GitHub.
- Situs hanya frontend dengan penyimpanan browser. Jangan klaim ada backend, akun admin, database server, AI langsung, atau sinkronisasi.
- Saran otomatis pada aplikasi menggunakan rumus dan aturan lokal.
- Target gelas menutup biaya bulanan bukan waktu modal awal kembali. Selisih catatan kas bukan laba bersih.

## Cara bekerja

Baca fungsi yang disentuh dan pemanggilnya. Gunakan kembali helper/pustaka yang ada. Batasi perubahan pada tugas pemilik. Terapkan Ponytail dan komunikasi Caveman yang tetap jelas. Sebutkan skill yang benar-benar digunakan.

Jalankan `npm test` setelah perubahan kode. Ada enam kelompok tes; DOM dan GSAP sebagian disimulasikan. Tes tersebut tidak membuktikan tampilan, sentuhan, atau frame rate pada HP nyata. Lakukan pemeriksaan browser jika alat tersedia. Catat keterbatasan secara jujur.

Jangan meminta ulang izin yang sudah diberikan. Namun, membaca paket ini sendiri bukan izin melakukan perubahan baru yang tidak diminta, memakai akun hosting baru, mengubah akses situs, atau merombak seluruh aplikasi.

Aturan ini hanya dapat diterapkan setelah dibaca oleh AI penerus; paket tidak menjamin editor otomatis memuat GEMINI.md atau skill.
