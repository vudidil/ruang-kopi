# 02 — Peta fitur, kode, dan aliran data

## Halaman yang tersedia

| Alamat hash | Fungsi |
| --- | --- |
| `#ringkasan` | Kebutuhan modal, perkiraan untung, langkah berikutnya, grafik, dan bahan yang perlu diperiksa |
| `#usaha` | Nama, konsep, dan rencana tanggal buka kedai |
| `#usaha/modal` | Daftar kebutuhan pembukaan, dana tersedia, dan cadangan |
| `#usaha/simpan` | Beberapa rencana, salin/hapus, unduh dan buka backup JSON |
| `#menu` | Resep, takaran, harga menurut cara membeli, dan porsi penjualan |
| `#menu/bahan` | Harga/isi kemasan, satuan, stok, batas pengingat, dan konversi satuan |
| `#hitung` | Target gelas, biaya rutin/layanan, perkiraan untung, dan skenario |
| `#catatan` | Penjualan, pembelian, pengeluaran, bahan terbuang, dan riwayat bulanan |
| `#bantuan` | Panduan penggunaan dan arti istilah |

Ada lima kelompok navigasi utama dan tautan panduan terpisah. Alamat lama seperti `#profil`, `#modal`, `#hpp`, `#bahan`, `#omzet`, `#laba`, `#operasional`, `#rencana`, dan `#panduan` tetap diterima. `#laba` diarahkan ke perhitungan untung.

Ini satu aplikasi HTML dengan beberapa tampilan berdasarkan bagian alamat setelah tanda `#`. Perpindahan tidak membutuhkan server API atau pemuatan HTML baru.

## Peran berkas

| Berkas | Tanggung jawab |
| --- | --- |
| `website/index.html` | Kerangka, sidebar, topbar, wadah halaman, SVG intro, dialog, tirai, dan pemuatan script |
| `website/finance.js` | Model rencana, rumus, validasi, migrasi lama, dan konversi satuan; diekspor melalui `window.RK` |
| `website/app.js` | Routing, render, input, simpan/pulihkan, transaksi, CSV/JSON, dan pemanggilan animasi |
| `website/style.css` | Gaya dasar dan responsif yang diwarisi |
| `website/workbook.css` | Gaya buku kerja terbaru; menimpa sebagian aturan dasar |
| `website/motion.js` | Animasi halaman/angka, pilihan intensitas, cleanup, scroll reveal, dan tilt mouse |
| `website/motion.css` | Tirai, teks kinetik, mode ringan, respons sentuh, dan aturan mobile |
| `website/intro-timeline.js` | Urutan gerak cangkir, teko, kopi, cipratan, dan uap |
| `website/intro-controller.js` | Mulai/selesai/lewati/ulang intro, fokus, penanda sudah dilihat, dan timeout |
| `website/intro.css` | Tampilan pembuka kopi |
| `website/vendor/gsap.min.js` | Pustaka animasi GSAP 3.15.1 yang tersedia lokal |
| `website/intro-scene.svg` | Salinan sumber ilustrasi intro; SVG tampil juga ditanam di index.html |
| `website/paper.svg`, `background.svg` | Aset latar |
| `website/favicon.svg`, `social-card.*` | Ikon dan gambar metadata berbagi |
| `tools/serve.cjs` | Server file untuk mencoba proyek pada komputer |
| `tools/set-site-url.cjs` | Menyesuaikan alamat metadata saat pindah hosting |
| `pengujian/*.test.cjs` | Enam kelompok pengujian otomatis |

Urutan script sekarang: `finance.js`, `vendor/gsap.min.js`, `motion.js`, `app.js`, `intro-timeline.js`, lalu `intro-controller.js`. Jangan memakai urutan pada dokumentasi lama.

CSS terbaru dibaca setelah CSS dasar. Cari seluruh aturan terkait sebelum menambahkan override baru. Ketika suatu warna atau ukuran tidak berubah, penyebabnya bisa aturan lain yang dimuat lebih akhir atau memiliki selector lebih kuat.

## Alur saat membuka aplikasi

1. `finance.js` menyediakan fungsi model.
2. `motion.js` menyiapkan pengaturan gerak dan `window.RKMotion`.
3. `app.js` mencoba membaca `ruang-kopi-v3`, lalu mempertimbangkan migrasi v1 jika v3 belum ada.
4. Data yang ada divalidasi. Data rusak mengaktifkan pemulihan; rencana sementara tidak langsung menimpa data lama.
5. `route()` memilih tampilan. `render()` membuat isi `#page`, memperbarui status penyimpanan, lalu memanggil animasi.
6. `intro-controller.js` menentukan apakah pembuka perlu ditampilkan. Animasi halaman berhenti selama pembuka aktif.

## Alur ketika angka diubah

Kolom memakai atribut seperti `data-path="assumptions.cups"`. `app.js` memeriksa input, memperbarui bagian model yang ditunjuk, menyimpan, lalu memanggil `refresh()`. `calculate(plan())` menghasilkan nilai baru. `RKMotion.number()` hanya membuat angka tampak berjalan; hasil finansial tetap berasal dari model.

`navigate()` memanggil render tanpa menunggu animasi keluar selesai, kemudian memindahkan fokus dan posisi gulir. `stopPage()` membersihkan animasi terdahulu supaya perpindahan cepat tidak menumpuk.

## Model data dan penyimpanan

Bentuk ringkas penyimpanan adalah objek dengan `version: 3`, `activeId`, dan array `plans`. Setiap rencana memiliki profil, kebutuhan modal, dana, cadangan, bahan, menu/resep, cara membeli, asumsi, biaya rutin, serta `ledger` transaksi.

| Kunci browser | Isi |
| --- | --- |
| `ruang-kopi-v3` | Semua rencana dan catatan usaha |
| `ruang-kopi-v1` | Sumber migrasi lama jika tersedia |
| `ruang-kopi-intro-seen` | Penanda pembuka sudah dilihat; bukan data usaha |
| `ruang-kopi-ui-sidebar` | Pilihan sidebar diperkecil atau diperluas |
| `ruang-kopi-motion` | Pilihan `full` atau `light` |
| `ruang-kopi-recovery-...` | Arsip data mentah sebelum pemulihan |

Impor JSON dibatasi 2 MB, maksimal 20 rencana, 200 bahan, 100 menu, 200 kebutuhan modal, dan 5.000 transaksi per rencana. Resep dibatasi 100 baris. Batas ini diperiksa di kode; jangan menghilangkannya hanya supaya suatu file besar bisa masuk.

Impor biasa menambah rencana; alur pemulihan data rusak menggunakan cadangan yang dikonfirmasi untuk mengganti data aktif setelah pengarsipan. Ekspor CSV bukan backup lengkap. LocalStorage berbeda untuk domain, protokol, dan port yang berbeda.

## Batas pemisahan kode

`finance.js` terpisah dari UI, tetapi `app.js` masih besar dan padat. Tidak perlu mengganti seluruh struktur saat membenahi satu fitur. Baca fungsi, pemanggil, tes, dan bentuk datanya dahulu. Komposisi HyperFrames di arsip bukan sumber runtime terbaru.
