# 04 — Masalah, keberhasilan, dan pekerjaan tersisa

## Masalah yang sudah ditangani

| Masalah / masukan | Tindakan yang dibuat | Batas bukti |
| --- | --- | --- |
| UI terasa kaku dan monoton | Gradasi, shadow, kartu, efek tombol, ilustrasi dan animasi | Implementasi ada; selera visual tetap perlu masukan pengguna |
| Panel kiri terlalu padat dan terlihat solid | Panel transparan/blur, tipografi baru, deskripsi kedai dibatasi dua baris | Belum ada audit visual seluruh layar di browser |
| Terlalu banyak menu utama | Lima kelompok; modal/simpan di Usaha Saya, stok di bahan, penjualan/laba jadi satu | Routing dan pengelompokan lulus tes DOM |
| Istilah susah dipahami | Label diganti dengan kata sehari-hari dan panduan contoh | Masih ada sisa istilah pada CSV/atribut; lihat pekerjaan lanjutan |
| Stok dan harga bahan terpencar | Editor harga, isi kemasan, satuan, stok, batas belanja menjadi satu | Elemen yang diperlukan diperiksa melalui DOM |
| Satuan lama semuanya pcs | Dialog konversi yang menyesuaikan semua jumlah | Tes menjaga biaya resep dan nilai transaksi lama |
| Perkiraan dan transaksi nyata mudah tertukar | Hitung Keuntungan dan Catatan Harian dipisah dengan penjelasan | Ini tetap alat sederhana, bukan pembukuan penuh |
| Perubahan harga bisa mengaburkan sejarah | Nilai uang transaksi disimpan sebagai snapshot | Tes perubahan harga tidak mengubah biaya transaksi lama |
| Data browser perlu dipindah/diselamatkan | Backup JSON, validasi impor, salinan rencana | Penyimpanan masih lokal, belum sinkronisasi |
| Latar dan pergantian halaman kurang hidup | Orb gradasi berpindah, animasi keluar/masuk | Belum diuji seluruh kombinasi perangkat secara visual |
| Intro kopi perlu gerak yang jelas | SVG/GSAP: aliran, isi kopi, wobble, tetesan, uap | Frame diperiksa dan HyperFrames check lulus |
| Permukaan kopi terlihat kurang tepat saat pertengahan tuang | Titik origin SVG dan skala permukaan kopi disesuaikan | Contact sheet terbaru memperlihatkan cairan saat 1,8 detik |
| Tulisan akhir intro terlalu singkat terbaca | Kemunculan dimajukan ke sekitar 3,85 detik | Pemeriksaan craft terakhir tidak memberi peringatan |
| Intro bisa menghalangi pemakaian | Skip, replay, Escape, reduced motion, pemulihan fokus dan timeout | Siklus controller diuji dengan timeline stub |

## Keberhasilan yang didukung bukti

1. Empat commit sumber tersedia, dan versi terbaru berhasil diterbitkan melalui Sites.
2. Paket ini menyertakan seluruh berkas runtime terbaru, termasuk GSAP lokal dan SVG.
3. Tes regresi fungsi lulus: rute lama/baru, lima menu, editor gabungan, hasil finansial, input, transaksi, stok, penghapusan/undo, banyak rencana, backup/impor, migrasi, konversi satuan dan status stok.
4. Tes controller intro lulus untuk mulai, lewati, putar ulang, selesai, pelepasan inert, dan jalur reduced motion.
5. Pemeriksaan sintaks JavaScript dan parsing CSS lulus.
6. HyperFrames 0.9.41 memeriksa komposisi intro: lint/runtime/motion tanpa error/peringatan; layout tanpa masalah pada 9 sampel; 12/12 pemeriksaan teks lulus kontras WCAG AA; craft tanpa error/peringatan. Intro memang tanpa suara.
7. Gambar beberapa tahap intro diperiksa secara visual. Bukti disertakan di `bukti/animasi-kopi.jpg`.

Laporan kontras tersebut hanya untuk komposisi yang diperiksa, bukan sertifikasi aksesibilitas seluruh website.

## Apa yang belum dibuktikan oleh tes

Tes utama memakai `linkedom`, simulasi DOM di Node. Beberapa API browser seperti fokus, scroll, media query, file, timer, dan animasi digantikan stub. Tes ini membuktikan perilaku yang dicakup assertion, bukan seluruh perilaku browser nyata.

Belum dilakukan pemeriksaan visual lengkap semua halaman pada browser desktop dan ponsel. Perlu mengecek panjang teks, keyboard, posisi dialog, kontras panel transparan, responsif, ekspor file sebenarnya, performa blur, dan klik navigasi cepat. Jangan menulis “semua tampilan sudah sempurna” berdasarkan tes ini.

## Kendala alat saat pengerjaan

| Alat | Yang terjadi | Hasil sebenarnya |
| --- | --- | --- |
| HyperFrames by HeyGen | Komposisi lokal dibuat dan diperiksa dengan system Chrome | Berhasil; menggunakan fallback screenshot karena mode capture khusus tidak tersedia |
| Font pada komposisi HyperFrames | Font website belum terdaftar pada pemeriksaan awal | Komposisi pemeriksaan memakai font cadangan Georgia/Arial; website memakai Manrope/Fraunces |
| Superdesign | Proses login dimulai, tetapi sesi berakhir sebelum berhasil | Tidak ada canvas/draft remote yang berhasil dibuat; perubahan UI dibuat pada kode lokal |
| Product Design | Panduan dibaca; alat browser interaktif yang dibutuhkan tidak tersedia pada alur tersebut | Tidak ada audit visual penuh melalui Product Design |
| Sites | Source disimpan/didorong dan arsip dipublikasikan | Publikasi berhasil; akses terakhir owner-only |
| Pengemasan sumber | Helper sinkronisasi standar tidak ditemukan | Pengerjaan memakai helper lokal sementara; kredensial tidak disertakan dalam paket |

Komposisi HyperFrames bukan file Canva atau hasil Superdesign. Tidak ada MP4 yang diperlukan untuk menjalankan intro di website. Intro berjalan langsung sebagai SVG dan JavaScript.

## Keterbatasan produk yang masih ada

- Tidak ada backend, database server, login admin, peran staf, audit trail server, sinkronisasi, atau kolaborasi real-time.
- Akses privat Sites membatasi pengunjung situs, tetapi bukan implementasi akun admin di dalam program.
- Belum dipasang di GitHub Pages/Vercel/Netlify. Repositori Git yang digunakan sebelumnya adalah sumber Sites, bukan bukti GitHub pengguna sudah dibuat.
- Saran pada dashboard menggunakan kondisi `if` dan rumus lokal, bukan layanan AI langsung.
- Perkiraan laba belum mencakup pajak, depresiasi, cicilan, bunga, atau semua kebutuhan akuntansi.
- Belum ada kasir lengkap, pembayaran, cetak struk, pemasok, nomor pesanan, retur, rekonsiliasi kas, atau pencatatan shift.
- Catatan transaksi saat ini dapat ditambah dan dihapus; belum ada alur edit transaksi lengkap.
- Kemasan per cara membeli dihitung sebagai biaya; stok kemasan tidak otomatis berkurang kecuali dimodelkan sebagai bahan resep. Hindari menghitung biaya kemasan dua kali.
- Pembelian tidak otomatis memperbarui harga bahan dan tidak memakai metode valuasi persediaan FIFO/rata-rata.
- Tanggal rencana buka bukan pengingat otomatis. Tidak ada notifikasi terjadwal.
- Font utama mengandalkan Google Fonts; belum dibundel untuk penggunaan offline penuh. Tidak ada service worker/PWA.

## Temuan kode yang perlu diperiksa berikutnya

Bagian ini adalah catatan dari membaca sumber, bukan klaim bahwa semua kasus sudah direproduksi di browser.

| Prioritas | Pengamatan | Langkah berikut |
| --- | --- | --- |
| Tinggi | Rencana kosong langsung memiliki elemen hasil; `refresh()` memanggil `menuResult()` di halaman menu | Uji mengisi bahan/menu dari nol, termasuk resep kosong dan harga nol, dengan browser nyata |
| Tinggi | Error baca/parse localStorage dapat membuat aplikasi memulai data baru; render kemudian memanggil save | Uji data rusak/quota/storage diblokir. Simpan raw data lama atau minta ekspor sebelum overwrite pada recovery |
| Tinggi | Backup ekspor belum memiliki batas ukuran, sedangkan impor maksimal 2 MB | Uji data besar dan pastikan file yang diekspor tetap dapat dipulihkan; pertimbangkan pembatasan/peringatan |
| Sedang | Undo beberapa penghapusan menutup variabel rencana asal, sementara pengguna bisa beralih rencana | Uji hapus → pindah rencana → urungkan; pastikan data asal dipulihkan dan tampilan tidak menyesatkan |
| Sedang | Validator membatasi banyak bidang, tetapi ID unik rencana/modal, tipe transaksi tidak dikenal saat submit, dan penulisan langsung ke state perlu audit | Tambah validasi sesuai kasus nyata; jangan menyatakan validasi frontend sebagai pengaman server |
| Sedang | Komisi dan biaya pembayaran bisa masing-masing mencapai 100%; jumlah gabungannya bisa melebihi pendapatan | Penjualan aktual menolak pendapatan negatif. Uji dan beri penjelasan UI yang konsisten untuk simulasi |
| Sedang | CSV masih memuat “BEP”, “HPP”, “waste”, “cup”; ada aria-label dan pesan validasi dengan kata “cup” | Selesaikan penyederhanaan pada ekspor, metadata dan teks aksesibilitas; perbaiki “Unduh ringkasan diunduh” |
| Sedang | CSS ditambah berlapis dengan override dan baris panjang | Format ulang bertahap, rapikan duplikasi tanpa mengubah tampilan; lakukan perbandingan visual |
| Sedang | SVG/timeline ada pada website dan komposisi terpisah | Buat satu sumber utama atau pemeriksaan sinkronisasi agar tidak berbeda tanpa sengaja |
| Rendah | Sesi intro disimpan per tab; buka ulang tab/perilaku storage dapat membuat intro muncul lagi | Pastikan perilaku ini sesuai keinginan pengguna sebelum mengubah menjadi permanen |

Tes yang sudah lulus bukan alasan untuk mengabaikan kasus di luar cakupannya. Perbaikan lanjutan sebaiknya kecil, terukur, dan tidak mereset data pengguna.
