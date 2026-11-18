# 02 — Peta fitur, kode, dan data

## Peta halaman

| Kelompok | Alamat | Yang dikerjakan |
| --- | --- | --- |
| Ringkasan | `#ringkasan` | Modal, biaya rata-rata, penjualan, laba, saran, simulasi slider |
| Usaha Saya / Tentang kedai | `#usaha` | Nama, konsep, target tanggal buka |
| Usaha Saya / Uang awal | `#usaha/modal` | Daftar kebutuhan pembukaan, uang tersedia, cadangan, kekurangan |
| Usaha Saya / Simpan rencana | `#usaha/simpan` | Banyak rencana, salin/hapus, simpan dan pulihkan JSON |
| Menu & Bahan / Resep | `#menu` | Menu, takaran bahan, tiga harga jual, perkiraan porsi penjualan |
| Menu & Bahan / Bahan | `#menu/bahan` | Harga kemasan, isi kemasan, satuan, persediaan, pengingat belanja |
| Hitung Keuntungan | `#hitung` | Target penjualan, biaya rutin, biaya layanan, keuntungan dan skenario |
| Catatan Harian | `#catatan` | Penjualan, belanja, pengeluaran, bahan terbuang, riwayat per bulan |
| Cara menggunakan | `#bantuan` | Urutan belajar dan arti istilah |

Ada lima tombol utama di sidebar. Bantuan merupakan tautan terpisah. Subhalaman menjaga fitur yang berkaitan tetap berdekatan tanpa mengumpulkan semuanya di satu layar.

Alamat lama tetap ditangani: `#profil`, `#modal`, `#hpp`, `#bahan`, `#omzet`, `#laba`, `#operasional`, `#rencana`, `#panduan`. Misalnya `#laba` sekarang menampilkan Hitung Keuntungan. Ini menjaga tautan lama tetap dapat dipakai.

## Peran setiap berkas

| Berkas di website/ | Peran |
| --- | --- |
| `index.html` | Kerangka halaman, sidebar, tempat konten, dialog, inline SVG intro, urutan script |
| `style.css` | Tampilan utama, responsif, kartu, form, transisi, latar, panel transparan |
| `finance.js` | Pembuatan data, perhitungan, validasi, migrasi lama, konversi satuan |
| `app.js` | Render halaman, routing, input, penyimpanan, transaksi, ekspor/impor |
| `background.svg` | Motif latar yang halus |
| `intro.css` | Tampilan overlay pembuka, ilustrasi, tombol dan progress |
| `intro-scene.svg` | Sumber gambar cangkir, meja, penuang kopi, tetesan dan uap |
| `intro-timeline.js` | Gerakan GSAP yang terukur dan bisa dicari posisi waktunya |
| `intro-controller.js` | Kapan intro muncul, skip/replay, fokus keyboard, pengamanan selesai |
| `vendor/gsap.min.js` | GSAP 3.15.1 yang disimpan lokal |

Urutan pemuatan JavaScript: `finance.js` → `app.js` → `gsap.min.js` → `intro-timeline.js` → `intro-controller.js`.

SVG intro juga ditanam langsung dalam `index.html`, sehingga mengganti `intro-scene.svg` saja tidak otomatis mengganti gambar di website. Komposisi terpisah di `animasi-hyperframes/` juga mempunyai salinan SVG/timeline. Saat mengubah animasi, sinkronkan salinan yang relevan atau buat proses pembangkitan yang jelas.

## Bagaimana program berjalan

1. `finance.js` menyediakan fungsi pada `window.RK`.
2. `app.js` mencoba membaca data `ruang-kopi-v3` dari localStorage.
3. Jika data versi lama tersedia, aplikasi mencoba migrasi `ruang-kopi-v1`.
4. Jika belum ada data yang dapat digunakan, dibuat satu rencana kosong.
5. `route()` membaca bagian alamat setelah `#`.
6. `render()` menggambar halaman sesuai rute dan rencana aktif.
7. Input beratribut `data-path` menunjuk bagian data, misalnya `assumptions.cups`.
8. Input yang valid diproses `setPath()`, kemudian `save()` dan `refresh()`.
9. `calculate()` menghasilkan angka terbaru; fungsi tampilan memperbarui kartu hasil.
10. Ketika rute berubah, `navigate()` menjalankan transisi keluar, menggambar halaman baru, menggerakkan latar dan memindahkan fokus.

Website ini adalah satu HTML dengan beberapa tampilan melalui hash. Tidak memerlukan server routing atau API untuk berpindah halaman.

## Bentuk data utama

```json
{
  "version": 3,
  "activeId": "id-rencana-yang-dibuka",
  "plans": ["objek rencana, bukan string seperti contoh ringkas ini"]
}
```

Contoh di atas hanya diagram bentuk penyimpanan, bukan file yang siap diimpor. Contoh JSON yang valid tersedia di `contoh-data/backup-contoh-kedai.json`.

| Bagian sebuah rencana | Isi |
| --- | --- |
| `id`, `name`, `example`, `createdAt` | Identitas rencana, penanda contoh, waktu dibuat |
| `profile` | Nama kedai, konsep, tanggal rencana buka |
| `capital` | Daftar kebutuhan pembukaan, masing-masing memiliki id/nama/biaya |
| `funds`, `reserve` | Dana tersedia dan target uang cadangan |
| `ingredients` | id, nama, harga kemasan, isi kemasan, satuan, stok, batas pengingat |
| `menus` | Nama menu, harga dinein/takeaway/delivery, bobot pesanan, resep |
| `channels` | Proporsi cara membeli, biaya kemasan, komisi layanan |
| `assumptions` | Hari buka, gelas/hari, bahan terbuang, diskon, biaya pembayaran, kapasitas tim |
| `fixed` | Sewa, gaji, utilitas, biaya rutin lain |
| `ledger` | Catatan transaksi dengan nilai uang dan pergerakan bahan |

Setiap rencana memiliki data sendiri. Menggandakan rencana membuat salinan mendalam. ID rencana baru dibuat, sementara ID bahan/menu di dalam rencana tetap dapat sama karena lingkupnya per rencana. Ini perlu diperhatikan jika kelak membuat database dengan ID global.

## Penyimpanan dan pemindahan data

- LocalStorage terikat browser dan origin: protokol, domain, port. Website lokal dan website Sites memiliki penyimpanan berbeda.
- Rencana disimpan otomatis setelah perubahan yang diterima aplikasi.
- Bila penyimpanan gagal, status memberi peringatan untuk menyimpan salinan.
- Backup JSON menyimpan semua rencana dan catatannya; impor menambah rencana baru.
- Batas impor 2 MB; maksimal 20 rencana, 200 bahan, 100 menu, 200 kebutuhan modal, 5.000 transaksi per rencana. Resep dibatasi 100 baris dalam validasi.
- CSV adalah laporan ringkasan, bukan format pemulihan seluruh data. Gunakan JSON untuk backup.
- Nomor format backup tetap `version: 3`.
- Data pengguna sungguhan di browser tidak tersedia bagi pembuat ZIP ini.

## Tampilan dan gerakan

Manrope digunakan untuk isi dan kontrol. Fraunces memberi karakter pada merek dan judul hero. Sidebar memakai gradien transparan dan blur; warna utama hijau dengan aksen hangat. CSS memakai orb gradien, motif SVG, shadow, hover dan efek klik.

`body.dataset.page` menentukan kelompok halaman dan posisi latar. Transisi keluar memakai Web Animations API sekitar 130 ms; masuk halaman memakai CSS sekitar 480 ms. Token navigasi mencegah hasil perpindahan lama menimpa klik yang lebih baru.

Intro berlangsung sekitar 6,2 detik: meja/cangkir muncul, penuang masuk dari atas, aliran kopi cepat, permukaan kopi naik, cangkir bergoyang, tetesan menyebar, penuang keluar, lalu uap dan tulisan selesai. Timeline disimpan sebagai `window.__timelines['coffee-intro']`.

Intro otomatis muncul sekali per sesi tab berdasarkan `sessionStorage` dengan kunci `ruang-kopi-intro-seen`. Pengguna bisa melewati, menekan Escape, atau memutar ulang dari sidebar. Saat overlay terbuka, bagian utama dibuat `inert`; fokus dibatasi pada tombol intro dan dikembalikan setelah selesai. Ada batas waktu 9 detik agar overlay tidak terus menahan pengguna. Preferensi `prefers-reduced-motion` dihormati. Jika GSAP tidak tersedia, aplikasi utama tetap dapat ditampilkan.
