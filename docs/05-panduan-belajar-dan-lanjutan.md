# 05 — Belajar kode dan melanjutkan proyek

## Bayangkan website seperti kedai

HTML adalah susunan ruangan: judul, menu, tombol, dan kolom. CSS mengatur cat, ukuran, font, dan posisi. JavaScript menjalankan kasir hitungan dan respons tombol. `finance.js` seperti buku rumus. `app.js` menghubungkan buku rumus dengan tampilan. `motion.js` mengatur bagaimana bagian-bagian itu bergerak.

LocalStorage seperti buku catatan yang tertinggal di satu browser. Membuka website di komputer lain tidak membawa buku itu. Karena itu, JSON dipakai untuk membawa salinan data.

## Cara menjalankan

1. Ekstrak ZIP dan buka folder proyek.
2. Pasang Node.js versi 20 atau lebih baru jika belum tersedia.
3. Buka terminal pada folder yang memiliki `package.json`.
4. Jalankan perintah berikut.

```sh
npm ci --ignore-scripts
npm test
npm start
```

Perintah pertama memasang alat pengujian dari versi yang dikunci. Perintah kedua memeriksa perilaku yang sudah dicakup tes. Perintah ketiga membuka server lokal. Buka alamat `http://localhost:8080` di browser. Ctrl+C menghentikan server.

Jika port 8080 sudah dipakai, hentikan server lokal lain atau pilih port berbeda melalui variabel `PORT`. Hindari membuka HTML langsung dengan file:// karena perilaku penyimpanan dan izin browser dapat berbeda.

## Latihan membaca kode

### Latihan 1: memahami biaya susu

Di `finance.js`, cari `recipeCost()`. Urutannya: cari bahan resep, ambil harga kemasan, bagi dengan isi kemasan, lalu kalikan jumlah yang dipakai. Susu Rp20.000 per 1.000 ml, dipakai 125 ml: Rp2.500.

Fungsi memakai `reduce()` untuk menjumlahkan biaya setiap bahan. Coba jelaskan dengan kata sendiri sebelum mengubahnya.

### Latihan 2: menghitung contoh tanpa mengubah data browser

Pada console browser website, kode berikut membuat objek latihan terpisah:

```js
const latihan = window.RK.createPlan(true);
const hasil = window.RK.calculate(latihan);
console.log(hasil.revenue, hasil.profit, hasil.bepDaily);
```

Ini tidak memanggil penyimpanan aplikasi. Nilainya berasal dari contoh bawaan. `revenue` adalah uang penjualan, `profit` perkiraan untung, `bepDaily` target gelas untuk menutup biaya rutin.

### Latihan 3: memahami satu input

Cari `data-path="assumptions.cups"` di `app.js`. Itu menunjuk jumlah gelas per hari. Perhatikan alur input, validasi, perubahan model, `save()`, dan `refresh()`. Angka yang terlihat bergerak tidak berarti rumusnya berubah berkali-kali.

### Latihan 4: membaca animasi

Buka `motion.js`, cari `enter()`. `x` berarti gerak mendatar; `y` gerak atas/bawah; `rotation` sudut putaran; `scale` ukuran; `opacity` tingkat terlihat. `duration` memakai detik. `stagger` memberi selisih waktu antarelemen.

`stopPage()` seperti membereskan panggung sebelum adegan berikutnya. Tanpanya, animasi lama dapat mengganggu halaman baru. Baca tes `choreography.test.cjs` untuk melihat kondisi yang dijaga.

## Cara membuat perubahan yang mudah diperiksa

1. Pilih satu masalah nyata, misalnya judul bergerak terlalu jauh di HP.
2. Temukan fungsi dan aturan CSS yang mengaturnya; cari pemanggilnya juga.
3. Ubah bagian terkecil yang menyelesaikan masalah.
4. Jalankan `npm test` dan coba hasil pada browser yang relevan.
5. Jelaskan apa yang berubah, alasan, hasil pemeriksaan, dan batasnya.
6. Simpan commit atau salinan sebelum melanjutkan revisi berikutnya.

Jangan menghapus data browser untuk membuat tes manual terasa mudah. Pakai contoh kedai atau profil browser pengujian terpisah.

## Urutan pekerjaan berikutnya

Prioritas dekat: pemilik mencoba animasi pada HP, mencatat gerakan yang disukai/tidak disukai, lalu revisi kecil. Berikutnya, pemeriksaan backup besar dan kasus transaksi yang belum tercakup. Rombakan intro dibahas tersendiri. GitHub dan hosting sekolah setelah pemilik siap. Backend baru dirancang jika kebutuhan akun/staf/sinkronisasi sudah jelas.

Tidak perlu memasang semua plugin sekaligus. Gunakan alat yang menyelesaikan tugas saat itu dan jelaskan hasil sebenarnya.
