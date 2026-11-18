# 08 — Memahami animasi dan mencari masalahnya

## Dua sistem gerak

Pembuka kopi memakai `intro-timeline.js`, `intro-controller.js`, `intro.css`, dan SVG di `index.html`. Halaman aplikasi memakai `motion.js` dan `motion.css`. Rombakan total pembuka belum dilakukan pada revisi terakhir.

GSAP 3.15.1 tersedia di `website/vendor/`. Tidak ada kebutuhan MP4, layanan video, atau koneksi GSAP eksternal untuk memainkan animasi website.

## Urutan pergantian halaman

1. `render()` menghentikan gerakan halaman lama melalui `stopPage()`.
2. Konten baru dibuat, lalu `enter()` membaca kelompok halaman, arah navigasi, ukuran layar, dan preferensi gerak.
3. Tirai tiga lapis masuk, menutup, lalu membuka melalui sumbu berbeda. Total sekitar 710 milidetik.
4. Tulisan adegan muncul dan menghilang. Judul halaman mulai masuk pada detik 0,4, setelah tirai mulai membuka pada detik 0,3.
5. Kata judul berurutan dengan jeda 55 milidetik. Kartu mulai masuk setelah jeda 480 milidetik.
6. Grafik terisi; kartu di bawah area pandang bergerak sekali ketika masuk layar.

Sumbu adalah arah: x mendatar, y vertikal. Halaman memakai kombinasi berbeda supaya pergantian terasa seperti adegan, bukan semua elemen bergerak seragam.

## HP dan desktop

Pada lebar maksimal 720 px, jarak kartu mendatar 72 px dan gerak vertikal paling jauh 85 px, durasi 680 ms, serta selisih waktu keseluruhan antarkartu maksimal 160 ms. Pada desktop, jarak mendatar 150 px dan durasi kartu 820 ms. Nilai ini adalah konfigurasi kode, bukan hasil pengukuran performa perangkat.

Tombol dan tab pada pointer sentuh mengecil ke skala 0,94 saat aktif, kemudian kembali. Ini memakai CSS `:active`; tidak ada penangkapan sentuhan atau pencegahan gulir untuk efek itu. Tilt mengikuti mouse hanya saat perangkat mendukung hover dan pointer presisi. HP tidak menjalankan tilt mouse tersebut.

Gerakan baru memakai transform dan opacity. Tidak ada penambahan blur yang dianimasikan. CSS lama masih mempunyai dekorasi lain; performa keseluruhan tetap perlu diuji di perangkat nyata.

## Mode ringan dan aksesibilitas

Tombol Gerak penuh/Gerak ringan menyimpan pilihan di `ruang-kopi-motion`. Jika perangkat meminta `prefers-reduced-motion`, mode ringan dipaksakan dan tombol dinonaktifkan. Judul yang dipecah per kata tetap memiliki nama utuh untuk pembaca layar.

Fokus ke kontrol di halaman menghentikan gerakan agar pengguna keyboard tidak perlu mengejar input bergerak. Fokus programatis ke wadah `#page` tidak menghentikan animasi masuk. Saat intro dimulai, animasi halaman berhenti; setelah intro berakhir, animasi halaman dapat berjalan lagi.

## Membersihkan animasi

`stopPage()` memutus IntersectionObserver, mengembalikan GSAP context/timeline, membatalkan frame pointer yang tertunda, mengosongkan pegangan tilt, dan menyembunyikan tirai. Ini penting saat pengguna berpindah menu cepat, mengganti intensitas, membuka intro, atau menyembunyikan tab.

`RKMotion.number()` membatalkan animasi angka sebelumnya. Nilai model tidak diubah. Jika pengguna memilih gerak ringan di tengah jalan, angka langsung selesai pada nilai yang benar.

## Jika ada masalah

| Gejala | Mulai periksa |
| --- | --- |
| Animasi penuh tidak terlihat | Tombol intensitas, reduced motion perangkat, dan apakah vendor GSAP berhasil dimuat |
| Kartu terlalu jauh bergerak di HP | Media query 720 px dan profil jarak di enter() |
| Judul tertutup tirai terlalu lama | Posisi waktu judul, akhir tirai, dan panjang teks |
| Animasi berhenti ketika mengisi | Ini disengaja pada fokus kontrol; pastikan tidak terjadi hanya karena fokus wadah halaman |
| Miring tertinggal setelah mouse keluar | Pembatalan requestAnimationFrame, pointerout, dan pengembalian quickTo |
| Nilai uang tampak salah | Bandingkan hasil calculate() dengan format tampilan; jangan mengubah rumus untuk memperbaiki animasi |
| Pembuka muncul lagi | Ketersediaan/penanda localStorage; jangan menghapus data usaha untuk menguji |
| Mengubah SVG tidak memengaruhi tampilan | SVG aktif tertanam di index.html; intro-scene.svg adalah salinan sumber |

Setelah perbaikan, jalankan `npm test`. Untuk masalah posisi atau kelancaran, tetap diperlukan browser nyata. Jangan menyamakan tes GSAP tiruan dengan rekaman animasi.
