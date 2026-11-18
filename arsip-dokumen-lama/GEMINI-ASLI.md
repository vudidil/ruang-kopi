# Konteks kerja Ruang Kopi untuk AI penerus

Dokumen ini disediakan agar Google Antigravity atau asisten lain memahami konteks. Cara pemuatan otomatis bergantung editor; pengguna diminta menyuruh asisten membaca berkas ini secara eksplisit.

## Tujuan dan cara berkolaborasi

Pemilik proyek siswa kelas 10. Ajarkan dengan bahasa Indonesia sederhana. Ia ingin bekerja bergantian: asisten membuat revisi konkret, pemilik mencoba dan memberi masukan. Hargai permintaan terbaru tanpa kehilangan tujuan perencana usaha kedai kopi.

Paket ini adalah serah terima. Jangan menganggap pembacaan dokumen sebagai izin untuk merombak seluruh proyek, menghapus data, melakukan publikasi baru, atau mengubah akses website.

## Sumber kebenaran

- `website/` adalah kode terbaru yang benar-benar disalin dari versi terbit terakhir.
- `docs/` berisi penjelasan dan batasan. Jika berlawanan dengan kode, laporkan perbedaan dan verifikasi.
- `riwayat-versi/` adalah sumber lama; jangan menimpanya ke website terbaru tanpa tujuan jelas.
- Dokumentasi bukan rekaman verbatim seluruh percakapan.
- Frontend saja. Saran otomatis berbasis aturan dalam `advice()`, bukan panggilan model AI.

## Kebiasaan implementasi

- Pertahankan HTML, CSS, dan JavaScript biasa sampai pengguna menyetujui pergantian teknologi.
- Jangan mengganti desain atas dasar selera sendiri: hijau bergradasi, panel kaca, tipografi Manrope/Fraunces, gerakan lembut, ikon SVG tanpa emoji.
- Pertahankan lima kelompok halaman beserta subhalaman dan alamat hash lama.
- Gunakan bahasa yang dipahami orang awam. Istilah teknis boleh di dokumentasi dengan penjelasan.
- Logika finansial utama ada di `website/finance.js`; interaksi di `website/app.js`.
- Data produksi lokal memakai kunci `ruang-kopi-v3`. Nomor versi tampilan keempat tidak berarti skema penyimpanan harus diubah menjadi v4.
- Harga pembelian dan satuan resep harus konsisten. Konversi satuan harus menyesuaikan semua jumlah dan menjaga nilai uang historis.
- Bedakan perkiraan keuntungan dengan uang masuk/keluar aktual. Jangan menyebut arus kas sebagai laba bersih.
- Jangan menghitung ulang biaya transaksi lama dengan harga bahan baru.
- Sebelum perubahan data yang besar, bantu pengguna menyimpan salinan JSON. Jangan diam-diam menghapus localStorage.
- Jika membenahi UI, pertahankan navigasi keyboard, fokus, reduced motion, skip intro, dan pemulihan fokus.

## Pemeriksaan

`npm start` menyediakan website pada localhost:8080. `npm ci` dan `npm test` menjalankan tes portabel. Tes DOM menggunakan linkedom dan beberapa API browser digantikan stub. Tes ini tidak membuktikan seluruh animasi dan tampilan browser benar.

Lakukan pemeriksaan browser nyata untuk desktop dan ponsel ketika alat tersedia. Periksa seluruh halaman, dialog satuan, import/export, penyimpanan, tab keyboard, dan intro. Laporan HyperFrames hanya memeriksa komposisi intro; tidak membuktikan WCAG seluruh aplikasi.

## Tahap berikutnya

Baca daftar prioritas pada `docs/04-masalah-hasil-dan-batasan.md` dan `docs/05-panduan-belajar-dan-lanjutan.md`. Backend, autentikasi, kolaborasi banyak pengguna, POS, pembayaran, dan AI langsung belum dibuat. Pisahkan usulan dari implementasi yang sudah selesai.
