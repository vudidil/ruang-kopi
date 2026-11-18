# Revisi tampilan buku kerja kedai

Catatan tahap `774fdbc`. Setelah tahap ini, motion.js diperluas untuk animasi halaman, jumlah kelompok tes menjadi enam, dan animasi HP diperkuat. Baca dokumen 07 serta SERAH-TERIMA-CODEX.md untuk keadaan terbaru. Keterangan alat pada bagian bawah menggambarkan ketersediaannya saat tahap tersebut.

Revisi ini melanjutkan kode Ruang Kopi. Bahasa pemrograman tetap HTML, CSS, dan JavaScript. Tidak ada pustaka baru yang diperlukan.

## Yang berubah

1. Gaya kertas krem, tinta hijau, serta aksen cokelat dan terakota.
2. Sidebar transparan yang dapat diperkecil. Pilihan disimpan terpisah dari data usaha.
3. Navigasi lima bagian di bawah layar HP; panduan tetap dapat dibuka dari atas.
4. Judul menggunakan Fraunces, angka dan formulir menggunakan Manrope.
5. Ringkasan menonjolkan perkiraan untung, kecukupan modal, dan satu langkah berikutnya.
6. Grafik perbandingan penjualan, biaya bahan/layanan, dan biaya bulanan dengan angka serta label.
7. Ringkasan bahan mendahulukan bahan yang perlu diperiksa. Satuan bahan tetap terpisah.
8. Perbandingan sepi, target, dan ramai memakai skala grafik untung/rugi yang sama.
9. Kolom pengisian menampilkan satuan, contoh, dan kesalahan di dekat kolom.
10. Perpindahan halaman mengikuti arah menu. Latar dan isi bergerak singkat.
11. Angka berubah selama 320 milidetik. Perubahan yang datang saat animasi berjalan menggantikan tujuan sebelumnya.
12. Tombol memberi reaksi saat ditekan. Indikator tersimpan mengikuti hasil penyimpanan sebenarnya.
13. Bagian kosong memberi petunjuk awal. Rencana kosong mengarahkan pengguna ke halaman usaha.
14. Gerak dikurangi bila pengaturan perangkat meminta pengurangan animasi.

`website/workbook.css` berisi gaya baru. `website/motion.js` mengatur animasi angka. Perhitungan tetap memakai `website/finance.js`. Grafik tidak mengubah data sumber atau menambah rumus bisnis.

## Data dan batas lingkup

- Kunci dan struktur `ruang-kopi-v3` tetap sama.
- Preferensi sidebar memakai `ruang-kopi-ui-sidebar`.
- File intro, gambar cangkir, dan urutan animasi kopi tidak dirombak.
- Tidak ada koneksi GitHub baru, backend, login, atau sinkronisasi yang ditambahkan.
- Figma terdeteksi terpasang, tetapi alat mengedit Figma tidak tersedia pada sesi ini. Implementasi dibuat langsung pada website; belum ada file desain Figma baru.

## Pemeriksaan

Jalankan `npm test`. Lima kelompok tes mencakup perhitungan, transaksi, pemulihan data, intro, sidebar, validasi, grafik, animasi angka yang terputus, pengurangan gerak, arah navigasi, sintaks, CSS, dan metadata.

Tes UI memakai DOM tiruan. Belum ada verifikasi visual di browser nyata pada sesi ini karena alat browser Sites tidak tersedia. Periksa hasil pada lebar 360, 390, 768, dan 1440 piksel, terutama navigasi bawah, input, dialog satuan, dan perpindahan halaman cepat. Font Google memerlukan koneksi; font cadangan tetap tersedia.

Skill yang diterapkan: Ponytail untuk membatasi perubahan pada kebutuhan pengguna; Caveman untuk komunikasi ringkas; UI/UX Pro Max untuk hierarki, kontrol sentuh, fokus, pengurangan gerak, dan label grafik; Sites untuk publikasi versi website.
