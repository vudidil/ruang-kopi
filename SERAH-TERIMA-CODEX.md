# Serah terima Codex ke Google Antigravity

Tanggal paket: 14 November 2026. Kode aktif: `f9626d5c22faf16fd8acc12ea3988fc1bec6a3d7`.

## Gambaran dalam satu menit

Ruang Kopi membantu menyusun modal pembukaan, bahan/resep, harga jual, target penjualan, perkiraan untung, dan catatan usaha. Semua berjalan di browser. Website memakai HTML, CSS, JavaScript, serta GSAP lokal untuk animasi. Pemilik ingin melanjutkan proyek secara bergantian dengan AI, dengan penjelasan yang mudah dipahami.

Versi ini sudah diterbitkan di `https://ruang-kopi-rencana.flaredpear16.chatgpt.site`; publikasi terakhir berhasil, akses privat pemilik. Bukan GitHub Pages dan bukan login admin aplikasi. Sumber Git lokal tersedia, tetapi repositori GitHub pengguna belum disambungkan dalam pekerjaan ini.

## Perubahan penting setelah paket Antigravity sebelumnya

1. Ringkasan dibuat lebih terarah: kebutuhan modal, perkiraan untung, grafik, dan langkah berikutnya.
2. Bahasa bisnis diperjelas, termasuk CSV dan label aksesibilitas. Target penutupan biaya tidak lagi disamakan dengan modal awal kembali.
3. Data rusak tidak langsung ditimpa. Pengguna dapat mengunduh data lama, memilih cadangan, melihat pratinjau, lalu mengonfirmasi pemulihan. Pengarsipan data lama harus berhasil terlebih dahulu.
4. Penyimpanan diblokir/penuh diberi pemberitahuan; perubahan yang belum tersimpan dapat diunduh. Penimpaan data yang berubah di tab lain dicegah dalam alur pemulihan.
5. Intro otomatis memakai penanda localStorage sehingga tidak tampil ulang setiap tab baru. Ada migrasi penanda sessionStorage lama dan fallback. Tombol lewati dan putar ulang tetap ada.
6. Metadata Open Graph, Twitter Card, favicon, gambar sosial, dan Schema.org WebApplication ditambahkan.
7. UI menjadi buku kerja kedai bertema gelap Obsidian Espresso & Gula Aren Amber (`#0A0600` / `#D4943A`), Manrope/Fraunces, panel samping transparan yang bisa diperkecil, serta menu bawah di HP.
8. Grafik penjualan/biaya dan skenario sepi-target-ramai dibuat lebih jelas. Form memiliki satuan dan pesan kesalahan di dekat kolom.
9. Animasi halaman dipindahkan ke `motion.js`/`motion.css`: tirai, kata judul, kartu, angka, respons hasil, scroll reveal, dan tilt mouse.
10. Revisi terbaru memperkuat gerakan: tirai menutup/membuka pada sumbu berbeda sekitar 710 ms, kartu mobile hingga 85 px selama 680 ms, dan tombol mengecil saat disentuh. Ada mode gerak ringan dan dukungan reduced motion.

## Koreksi status dari dokumen lama

| Catatan lama | Keadaan sekarang |
| --- | --- |
| Tiga kelompok tes | Enam kelompok tes |
| Intro sekali per sesi tab | Penanda localStorage, dengan migrasi/fallback sessionStorage |
| Belum ada metadata sosial/Schema.org | Sudah ada dan diperiksa tes sumber |
| CSV/aria masih menjadi prioritas penyederhanaan | Label yang ditangani sudah diperbaiki dan diuji; bahasa masih bisa disempurnakan dari masukan pengguna |
| Data rusak dapat ditimpa | Alur pemulihan dan perlindungan sudah dibuat dan diuji |
| Semua gerakan memakai CSS lama | GSAP di motion.js mengatur gerak penuh; CSS menyediakan tampilan/fallback |
| Sidebar HP menggulir horizontal | Lima menu utama menjadi navigasi tetap di bawah layar |
| Figma belum tersedia pada suatu sesi | Pada sesi berikutnya alatnya terlihat tersedia; tidak dibuat file Figma baru |
| Pemeriksaan browser pada versi lama | Tidak membuktikan versi animasi terbaru sudah lulus visual di HP |

## Yang masih terbuka

Prioritas berikutnya adalah mencoba versi terbaru pada HP nyata dan desktop, memeriksa posisi teks/kartu/dialog, ekspor-impor nyata, serta kelancaran gerakan. Rombakan cangkir menunggu pembahasan pemilik. GitHub dikerjakan belakangan. Batas ekspor backup besar, kerapian CSS yang berlapis, dan kasus transaksi/undo lanjutan masih perlu peninjauan terarah.

Backend, database, akun staf/admin, sinkronisasi, POS, pembayaran, struk, PWA, serta model pajak/penyusutan lengkap belum dibuat.

## Bukti dan cara melanjutkan

Enam kelompok tes lulus saat pengemasan; hasil ada di `bukti/hasil-npm-test.txt`. Tes animasi merekam panggilan GSAP, bukan merender animasi dalam browser. Asal commit dan publikasi ada di `bukti/asal-kode.json`.

Jalankan `npm ci --ignore-scripts`, `npm test`, lalu `npm start` untuk mencoba website. Jangan mengganti data `ruang-kopi-v3`. Baca dokumen rinci sebelum menyentuh rumus atau penyimpanan. Perubahan dokumentasi paket ini tidak mengubah kode situs aktif.
