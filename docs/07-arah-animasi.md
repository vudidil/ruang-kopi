# Animasi bergaya iklan

## Referensi yang diteliti

- [Codrops — Building Async Page Transitions in Vanilla JavaScript](https://tympanus.net/codrops/2026/02/26/building-async-page-transitions-in-vanilla-javascript/): pergantian adegan memakai gerak dan penyingkapan bertahap.
- [Codrops — Choreographing Kinetic Typography on Scroll with GSAP](https://tympanus.net/codrops/2026/11/10/kinetic-typography-gsap/): teks masuk bergiliran dengan jeda pendek.
- [GSAP — matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/): menyesuaikan gerakan dengan perangkat dan pengaturan pengurangan gerak, lalu membersihkan efek yang sudah tidak diperlukan.

Artikel Codrops ditemukan melalui hasil pencarian; pembukaan langsung mengembalikan HTTP 403. Dokumentasi GSAP berhasil dibaca. Demo video dan tampilan situs referensi tidak diuji langsung. Referensi menjadi inspirasi teknik; aset dan kode situs lain tidak disalin.

## Yang diterapkan

- Tirai tiga lapis warna menutup lalu terbuka pada arah berbeda dalam 710 ms. Ada gradasi hijau dan huruf merek besar. Tulisan adegan masuk lalu menghilang.
- Judul muncul kata demi kata, dengan jeda 55 ms dan sedikit pantulan. Gerak judul dimulai saat tirai membuka, supaya lebih terlihat. Nama judul tetap utuh untuk pembaca layar.
- Kartu memakai arah berbeda menurut halaman: horizontal, dari bawah, atau dari atas, dengan sedikit putaran dan pembesaran.
- Grafik terisi bertahap. Bagian di bawah layar muncul saat masuk area pandang, satu kali untuk setiap render halaman.
- Kartu utama miring mengikuti posisi mouse. Hanya dijalankan untuk pointer mouse yang mendukung hover.
- Pada HP, kartu masuk dari jarak hingga 85 px dengan putaran kecil. Durasi kartu 680 ms dan jeda antarkartu dibatasi 160 ms. Efek memakai transform dan opacity; tidak menambah blur bergerak atau pustaka baru.
- Tombol dan tab mengecil saat disentuh lalu kembali saat dilepas. Respons sentuh memakai CSS `:active`, tanpa menangkap sentuhan atau menghalangi gulir. Ikon menu aktif juga memantul singkat.
- Hasil perhitungan dan pemberitahuan memberi respons pendek.
- Tombol **Gerak penuh / Gerak ringan** tersedia di atas halaman. Gerak penuh adalah pilihan awal; pengaturan gerak minimal pada perangkat tetap dihormati.

## Batas dan perilaku

Tidak ada penundaan pemrosesan navigasi atau penyimpanan untuk menunggu animasi. GSAP context sebelumnya dibersihkan setiap render dan pergantian halaman. Pengguna keyboard dapat memfokuskan kontrol tanpa menunggu animasi. Jika GSAP atau IntersectionObserver tidak tersedia, konten tetap dapat digunakan.

Preferensi gerak menggunakan `ruang-kopi-motion`, terpisah dari data bisnis `ruang-kopi-v3`. Rumus dan skema data tidak diganti. Ilustrasi serta koreografi cangkir tetap sama; controller intro hanya memberi sinyal kapan animasi halaman perlu dihentikan atau dimulai.

`website/motion.js` mengatur gerak, `website/motion.css` mengatur tirai dan teks. GSAP 3.15.1 yang sudah ada dipakai kembali; tidak ada pustaka tambahan.

## Pemeriksaan

Enam kelompok `npm test` mencakup regresi bisnis, pemulihan data, intro, angka, navigasi cepat, pilihan intensitas, fokus keyboard, urutan intro, dan kondisi pustaka tidak tersedia. Tes layar kecil juga memeriksa jarak dan durasi kartu, perpindahan dua sumbu, urutan judul sesudah tirai mulai membuka, serta kemunculan sekali saat digulir dan pembersihan observer. Pengujian koreografi mencatat panggilan GSAP dengan pengganti di memori; bukan pemeriksaan visual, sentuhan nyata, atau pengukuran frame rate.

Verifikasi browser nyata belum tersedia. Sites mengharuskan melewati browser QA saat `cua_repl.js` tidak tersedia. Periksa gerakan pada HP dan komputer sebelum menilai hasil visualnya selesai.

Panduan yang diterapkan: HyperFrames/GSAP untuk timeline, stagger, transform, cleanup, dan quickTo; Ponytail untuk menggunakan pustaka yang sudah tersedia; Caveman untuk komunikasi singkat; Sites untuk publikasi. Figma, Superdesign, dan Product Design telah dipertimbangkan; tidak dibuat dokumen atau kanvas baru karena pekerjaan ini berfokus pada animasi website yang sudah ada.
