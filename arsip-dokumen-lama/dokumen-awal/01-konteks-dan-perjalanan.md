# 01 — Tujuan dan perjalanan proyek

## Mengapa website ini dibuat

Pemilik ingin membuat website untuk menghitung modal, omzet, dan kebutuhan menjalankan bisnis. Fokus dipersempit menjadi kedai kopi agar bahan, resep, jumlah gelas, dan biaya operasional memiliki contoh yang konkret. Nama yang digunakan dalam implementasi adalah **Ruang Kopi**.

Pengguna awalnya meminta brainstorming dan peta konsep, dengan HTML, CSS, JavaScript, serta keinginan panel admin/backend. Selanjutnya ia meminta prototipe yang benar-benar dapat dicoba dan terus memberi masukan desain. Backend masih merupakan tujuan lanjutan.

## Ketentuan sekolah yang terlihat dalam gambar

Potongan aturan yang diberikan pengguna menyebut tema “Solusi Digital untuk Kehidupan Sehari-hari Berbantuan Kecerdasan Artifisial”, kerja kelompok dua siswa dari sekolah yang sama, produk berbasis website yang mengintegrasikan HTML/CSS/JavaScript secara fungsional, tampilan responsif dan ramah pengguna, serta publikasi langsung menggunakan GitHub Pages, Vercel, atau Netlify.

Bagian penggunaan AI mendorong bantuan untuk ide, rancangan, pemrograman, animasi, dan debugging, tetapi peserta harus memahami logika serta fungsi kode. Tidak diperbolehkan mengumpulkan hasil AI tanpa pemahaman yang baik. Ini rangkuman potongan gambar yang terlihat, bukan pengganti naskah peraturan lengkap.

Implikasinya: bantuan AI dalam pengerjaan sudah relevan dengan tema. Website ini sendiri belum memiliki chatbot atau API AI. Publikasi melalui Sites sudah tersedia untuk demonstrasi pemilik, tetapi **belum memenuhi pilihan penyedia hosting yang disebut aturan jika aturan tersebut diterapkan secara ketat**. Pindah ke salah satu penyedia yang disebut tetap perlu dilakukan.

## Perjalanan permintaan pengguna

| Tahap | Masukan pengguna | Tanggapan dalam produk saat ini |
| --- | --- | --- |
| Gagasan awal | Alat bantu bisnis kedai kopi, perhitungan modal/omzet, rencana backend | Perencana kedai kopi; backend belum dibuat |
| Prototipe | Semua tombol berfungsi, modal dapat diubah, bagian memiliki halaman sendiri | Input dapat diedit, halaman memakai hash, hasil dihitung otomatis |
| Kesederhanaan | Hapus tombol “lihat penjelasan kode kelas X”, jangan pakai emoji | Tidak ada tombol tersebut; ikon memakai SVG |
| Desain lebih serius | UI kaku, monoton, perlu gradasi, shadow/3D, gaya seperti Canva | Warna hijau dengan aksen, kartu berlapis, ilustrasi dan animasi |
| Kolaborasi | Ringkas kritik agar dipahami siswa kelas 10, bekerja seperti co-driver | Panduan sederhana di aplikasi dan paket ini; revisi mengikuti masukan |
| Struktur | Banyak istilah susah dan fitur yang berkaitan terpencar | Lima kelompok utama; modal di Usaha Saya, bahan dan stok digabung, target dan laba digabung |
| Contoh stok | Screenshot menampilkan bahan semuanya bersatuan pcs dan angka nol | Satuan gram/mililiter/buah, pesan status yang jelas, dialog konversi |
| Revisi terakhir | Sidebar transparan, font lebih bagus, gradasi/background bergerak | Sidebar kaca, Manrope/Fraunces, latar bergerak saat berpindah halaman |
| Pembuka | Cangkir kosong di meja, kopi dituang cepat, bergoyang dan memercik | Komposisi SVG/GSAP sekitar 6,2 detik, tombol lewati dan putar ulang |
| Serah terima | Semua catatan dan kode dibawa ke Google Antigravity | Paket dokumentasi, kode terbaru, arsip versi, tes dan bukti |

Ada juga pertanyaan tentang sisa limit ChatGPT. Kuota akun tidak tersedia dari kode proyek atau alat yang digunakan, sehingga tidak ada angka kuota yang dapat dipastikan dalam serah terima ini.

## Preferensi yang perlu dipertahankan

- Bahasa Indonesia yang langsung dan mudah dipahami masyarakat umum.
- Fitur yang berkaitan diletakkan berdekatan; tetap ada halaman/subhalaman yang jelas.
- Semua tombol memiliki tujuan nyata. Hindari tombol dekorasi yang tidak bekerja.
- Gaya visual lebih hangat, rapi, bergradasi, dan memiliki kedalaman.
- Animasi halus yang mendukung penggunaan; tetap bisa dilewati atau dikurangi.
- Tanpa emoji pada tampilan produk. Ikon garis SVG diperbolehkan.
- Font dan susunan tulisan tidak terasa seperti template generik.
- Pemilik ingin dapat memahami dan menjelaskan kode, bukan hanya menerima hasil.

“Gaya Canva” adalah arah visual yang diminta, bukan klaim adanya proyek Canva atau integrasi akun Canva.

## Empat versi kode yang ditemukan

| Urutan dokumentasi | Commit | Isi utama yang terlihat dari sumber |
| --- | --- | --- |
| 1 | `c1a63e02f2b6e1ab4a5a4d1ba8644ec0264ad74c` | Prototipe interaktif awal: HTML, CSS, JavaScript dan manifest Sites |
| 2 | `1d1ee138af6dcc804d6a626e2660856466fe816d` | Pengembangan desain gradasi, kartu berlapis, dan interaksi |
| 3 | `2f46c88ac045f601940ff9dffb02d895888a9f8a` | Pemisahan finance.js, model rencana yang lebih lengkap dan pencatatan usaha |
| 4 / terbaru | `cbae29d5be59d5687a762346553f22d8d6e4fd20` | Penyederhanaan bahasa/navigasi, bahan+stok, konversi satuan, panel transparan, intro kopi |

Tiga versi pertama tersedia sebagai ZIP terpisah di `riwayat-versi/`. Versi keempat berada di `website/`. Penomoran ini hanya urutan dokumentasi, bukan penamaan resmi rilis. Skema penyimpanan versi terbaru tetap bernomor 3.

Publikasi terakhir sebelum paket ini berhasil, dengan deployment `appgdep_6af6f7f3656081918c45cba1ee2455bf`. Paket dokumentasi dibuat setelahnya dan tidak mengubah website yang sedang diterbitkan.
