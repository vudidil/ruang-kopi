# 05 — Belajar dari kode dan melanjutkan proyek

## Cara belajar untuk kelas 10

Bayangkan website sebagai kedai: HTML menyusun ruang dan perabot, CSS mengatur warna serta penampilannya, JavaScript membuat tombol, input, dan hitungannya bekerja. LocalStorage adalah buku catatan yang ditaruh di perangkat pengunjung. Backend nantinya seperti kantor pusat yang menyimpan data untuk banyak perangkat.

Pelajari satu alur kecil sampai selesai sebelum seluruh program.

### Latihan 1: melacak perubahan modal

1. Buka Usaha Saya → Uang awal.
2. Tambahkan kebutuhan “Meja”, isi Rp1.000.000.
3. Cari `capitalPage()` pada `website/app.js` untuk melihat pembuat kolomnya.
4. Perhatikan `data-path`: kolom menunjuk `capital.<nomor>.cost`.
5. Event `input` mengecek angka lalu memanggil `setPath()`, `save()`, dan `refresh()`.
6. Buka `calculate()` pada `website/finance.js`. `p.capital.reduce(...)` menjumlah biaya.
7. `capitalResult()` membuat hasilnya tampil kembali.

Kamu bisa menjelaskan alurnya: pengguna mengetik → angka diperiksa → data berubah → rumus menghitung → hasil diperbarui → data disimpan.

### Latihan 2: mengerti biaya satu bahan

Gunakan contoh susu Rp20.000 per 1.000 ml. Hitung manual 125 ml = Rp2.500. Cocokkan dengan `recipeCost()`:

```js
// Inti rumus dari kode, ditulis lebih panjang agar mudah dibaca.
const hargaPerSatuan = bahan.packPrice / bahan.packQty;
const biayaDalamMinuman = hargaPerSatuan * takaranResep;
```

Jangan langsung mengganti rumus jika hasil tampak aneh. Cek satuan, isi kemasan, takaran, bahan terbuang dan kemasan terlebih dahulu.

### Latihan 3: mengubah satu label

Cari teks yang terlihat pada `app.js`. Ubah satu kalimat tanpa mengganti nama properti data. Jalankan website lalu lihat hasilnya. Nama tampilan boleh lebih mudah dipahami, sementara properti seperti `assumptions.cups` tetap boleh berbahasa teknis agar kompatibel.

Jangan mengganti semua kata `cup` melalui pencarian global tanpa memeriksa konteks; nama field/data tidak sama dengan label UI.

### Latihan 4: memahami animasi kopi

Buka `intro-timeline.js`. Angka terakhir pada perintah GSAP adalah waktu mulai. `.from()` berarti mulai dari keadaan tertentu menuju keadaan gambar aslinya; `.to()` menggerakkan keadaan sekarang ke tujuan. `duration` adalah lama gerakan. Contohnya rotasi cangkir berganti sekitar -3 sampai 3 derajat lalu kembali ke 0.

Gambar cangkir ada di SVG; gerakannya ada di timeline; aturan muncul/lewati ada di controller. Ketiganya punya tugas berbeda. Setelah mengubah gerak, periksa pembuka pada ukuran ponsel serta opsi reduced motion.

## Cara kerja yang disarankan bersama Antigravity

1. Jelaskan satu masalah dengan lokasi yang jelas, misalnya “di Menu & Bahan, satuan susu sulit ditemukan”.
2. Minta Antigravity menjelaskan penyebab dan perubahan kecil yang akan dilakukan.
3. Coba hasilnya dan berikan masukan.
4. Jalankan pengujian yang relevan, lalu simpan commit dengan pesan yang menjelaskan perubahan.
5. Kerjakan tahap berikut hanya setelah fungsi dasar tetap berjalan.

Minta penjelasan di percakapan atau dokumen, tidak perlu menaruh tombol pelajaran kode dalam UI pelanggan.

## Prioritas lanjutan

### Tahap A — memastikan versi sekarang nyaman dipakai

Periksa semua halaman pada lebar 360, 390, 768, dan 1440 piksel. Uji keyboard, form panjang, satuan, hapus/urungkan, banyak rencana, file backup, intro serta transisi cepat. Ukuran ini adalah rencana pemeriksaan, bukan hasil yang sudah lulus.

Perbaiki sisa istilah teknis, typo notifikasi, konsistensi judul dan label. Rapikan format kode agar mudah dipelajari tanpa mengubah perilaku. Prioritaskan pemulihan data rusak dan backup besar sebelum menambah fitur besar.

### Tahap B — GitHub dan publikasi sesuai aturan sekolah

Saran berikut belum dijalankan. Buat repositori GitHub milik pengguna, masukkan kode, dokumentasi dan atribusi dependensi. Jangan menyertakan data pribadi atau kredensial.

Untuk GitHub Pages tanpa build, cara paling mudah adalah menaruh **isi** `website/` di root repositori lalu menggunakan Deploy from a branch pada branch utama, folder root. Jika ingin mempertahankan struktur paket, gunakan GitHub Actions untuk mengunggah folder `website/` sebagai artifact Pages, atau salin isinya ke folder `/docs` khusus publikasi. GitHub Pages tidak menyediakan pilihan sembarang folder `/website` pada konfigurasi branch biasa.

Untuk Netlify/Vercel gunakan website statis, tanpa framework dan tanpa build bila penyedia mengizinkan, dengan direktori publikasi/output `website`. Pengaturan persis mengikuti antarmuka penyedia saat itu.

Routing hash dan path relatif memudahkan hosting pada subfolder. Setelah alamat berubah, pindahkan data dengan backup JSON karena localStorage lama tidak ikut berpindah. Periksa akses benar-benar publik jika akan diserahkan untuk penilaian; publikasi Sites sebelumnya bersifat privat.

### Tahap C — backend dan panel admin sungguhan

Ini rancangan awal yang belum diimplementasikan. Frontend HTML/CSS/JS dapat dipertahankan. Salah satu pilihan yang masuk akal untuk dipelajari adalah Node.js + Express + database SQL, atau layanan backend terkelola. Pilih satu setelah kebutuhan jelas.

Tentukan dahulu: satu pemilik atau banyak kedai; siapa yang boleh mencatat penjualan; apakah staf boleh melihat laba; apakah perlu lintas perangkat; dan apakah pencatatan wajib tetap bekerja offline.

Calon struktur data server: users, shops, memberships/roles, plans, ingredients, menus, recipe_lines, transactions, transaction_movements. Data contoh dan rencana simulasi sebaiknya tetap dibedakan dari catatan usaha sungguhan.

Login saja belum cukup. Server harus memeriksa akses setiap permintaan, memvalidasi angka, dan menyimpan transaksi serta perubahan stok sebagai satu operasi atomik. Tanpa itu, dua kasir dapat membuat stok tidak konsisten. Jangan menyimpan password atau kunci rahasia dalam JavaScript frontend.

Rencana migrasi: pengguna ekspor JSON lama → server memvalidasi → ID dipetakan ke database → data diimpor ke kedai yang benar → hasil jumlah/uang/stok dicocokkan. Data lama jangan dihapus sebelum hasil impor diverifikasi.

### Tahap D — fitur setelah kebutuhan nyata muncul

Pengaturan pajak, riwayat harga bahan, penilaian stok, retur, ekspor laporan, pemasok, kasir, dan kecerdasan buatan langsung dapat dipertimbangkan. Jangan menambah semuanya sekaligus. Saran AI harus memakai data dengan izin pengguna dan tidak dipresentasikan sebagai jaminan keuntungan.

## Daftar uji manual untuk penerus

- Muat pertama: rencana kosong, pilihan contoh, intro dan skip bekerja.
- Input modal/harga berubah dan tetap ada setelah reload.
- Semua lima menu dan subhalaman bisa dibuka; tautan lama tetap benar.
- Tambah bahan, pilih gram/ml/buah, isi harga/isi kemasan, buat resep dan cek hitungan manual.
- Jual satu minuman: stok tepat berkurang; pembelian menambah; bahan rusak mengurangi tanpa uang keluar kedua kali.
- Ubah harga setelah transaksi: nilai transaksi lama tetap.
- Konversi satuan: biaya resep dan uang historis tetap, semua jumlah ikut berubah.
- Hapus dan urungkan, termasuk setelah berpindah rencana.
- Ekspor JSON dan impor kembali: data cocok, file tidak menimpa rencana lama.
- Ekspor CSV bisa dibuka dan judul/angka dapat dipahami.
- Periksa nol, angka besar, kosong, data rusak, dan localStorage diblokir.
- Coba tab keyboard, Escape pada intro/dialog, reduced motion, serta layar kecil.

## Atribusi dan ketergantungan

GSAP 3.15.1 adalah pustaka pihak ketiga; header lisensi dipertahankan di `website/vendor/gsap.min.js`. Ketentuan: https://gsap.com/standard-license . Jangan mengganti lisensi pihak ketiga dengan klaim seluruh paket sepenuhnya karya sendiri.

Manrope dan Fraunces dimuat dari Google Fonts. Linkedom 0.18.15 dan css-tree 3.2.1 dipakai untuk pengujian, bukan kode runtime website. Komposisi opsional menggunakan CLI HyperFrames 0.9.41. Karya visual intro berupa SVG yang dibuat untuk proyek ini; tidak memerlukan login Canva untuk berjalan.

Untuk presentasi sekolah, pemilik sebaiknya dapat menjelaskan fungsi HTML/CSS/JS, satu contoh rumus, perbedaan simulasi dan transaksi, localStorage, serta bantuan AI yang digunakan. Paket ini membantu mempelajari hal tersebut; tidak menggantikan proses memahami kodenya.
