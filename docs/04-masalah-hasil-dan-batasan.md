# 04 — Masalah, keberhasilan, dan batas yang masih ada

## Masalah yang sudah ditangani

| Masalah | Perbaikan | Bukti dan batasnya |
| --- | --- | --- |
| Banyak istilah bisnis sulit | Label awam, penjelasan contoh, CSV dan aria diperjelas | Kode dan tes; masih terbuka terhadap masukan bahasa |
| Fitur yang berhubungan terpencar | Bahan+stok digabung; target+untung satu kelompok; lima menu utama | Tes navigasi dan editor gabungan |
| Modal tidak terasa bisa diubah | Daftar kebutuhan, dana, dan cadangan bisa diedit; hasil berubah | Tes perhitungan dan input |
| Satuan bahan lama seragam pcs | Pilihan gram/ml/buah dan konversi yang menyesuaikan seluruh jumlah | Tes menjaga biaya resep dan nilai uang historis |
| UI kaku dan monoton | Buku kerja krem-hijau, aksen hangat, font, sidebar transparan, grafik | Implementasi tersedia; penilaian visual masih perlu pengguna |
| Navigasi HP kurang nyaman | Lima menu utama tetap di bagian bawah dan target kontrol sentuh | CSS responsif; belum tes visual terbaru pada perangkat nyata |
| Data rusak bisa ditimpa | Raw data dipertahankan, unduh lama, validasi backup, pratinjau, konfirmasi, arsip sebelum mengganti | Tes recovery, termasuk kegagalan storage dan perubahan lintas tab saat pemulihan |
| Intro muncul lagi pada tab baru | Penanda localStorage dan migrasi penanda lama | Tes controller |
| Intro dapat menahan pengguna | Lewati, Escape, ulang, timeout, inert/fokus, reduced motion | Tes simulasi; gerak visual bukan bagian tes controller |
| Angka bergerak bisa tertinggal saat input cepat | Animasi sebelumnya dibatalkan dan nilai akhir diselesaikan tepat | Tes angka terputus dan gerak minimal |
| Animasi masih kurang berani | Tirai menyilang, judul per kata, kartu berpindah arah dan berputar sedikit | Tes panggilan GSAP dan implementasi |
| Animasi perlu menyesuaikan HP | Jarak/durasi mobile, respons tombol sentuh, reveal sekali saat digulir | Tes logika layar kecil/observer; belum mengukur FPS/sentuhan nyata |
| Animasi menumpuk saat pindah cepat | GSAP context, timeline, observer, dan frame pointer dibersihkan | Tes lifecycle, fokus, intro, dan pointer keluar |
| Metadata belum siap berbagi | Open Graph, Twitter Card, Schema.org, ikon/gambar sosial | Tes sumber; situs privat belum dapat dirayapi publik |
| Unduhan dokumen lama tidak bekerja menurut pengguna | Paket terbaru dibuat sebagai file nyata dan diperiksa kembali | Keutuhan file diperiksa; keberhasilan klik pada perangkat pengguna perlu dicoba |

## Keberhasilan yang bisa dinyatakan

Enam kelompok tes otomatis lulus pada kode yang dikemas. Snapshot `website/` cocok dengan sumber terbaru; delapan versi kode lama tersedia. Publikasi terakhir berhasil melalui Sites. Rumus dan format data tidak diganti untuk memperkuat animasi.

Hasil tes bukan jaminan seluruh produk bebas bug. Tes menggunakan linkedom dan beberapa API tiruan. Pengujian koreografi merekam panggilan GSAP; tidak mengukur kelancaran pada GPU atau layar sentuh.

## Riwayat masalah dari Antigravity

Laporan Antigravity asli menyebut perbaikan urutan media query, lebar sidebar mobile, dialog satuan, titik putar teko, jeda navigasi 130 ms, latar bergulir, dan istilah teknis. Laporan itu juga menyebut pemeriksaan browser versi terdahulu. Simpan sebagai riwayat, jangan mengubahnya menjadi klaim bahwa animasi `f9626d5` sudah diperiksa secara visual.

Dokumen lama mencatat pemeriksaan komposisi HyperFrames dan cuplikan intro. Bukti itu ada di `arsip-dokumen-lama/bukti-intro-lama/`; cakupannya komposisi lama, bukan seluruh aplikasi atau revisi HP terbaru.

## Pekerjaan terbuka

1. Periksa UI terbaru pada lebar 360, 390, 768, dan 1440 piksel, serta pada HP nyata.
2. Nilai apakah animasi cukup jelas, terlalu cepat, atau berlebihan saat pemilik memakainya untuk menghitung.
3. Periksa sentuhan, keyboard, dialog satuan, ekspor/unduh nyata, dan impor ulang di browser lain.
4. Ekspor tidak dibatasi ukuran, sedangkan impor maksimal 2 MB. File besar bisa sulit dipulihkan; perlu perbaikan terarah sebelum menaikkan kapasitas data.
5. Tinjau undo setelah berpindah rencana, batas transaksi, dan kombinasi potongan layanan lebih dari pendapatan. Jangan menyebut semua kasus sudah diperiksa hanya karena tes umum lulus.
6. Rapikan CSS yang berlapis secara bertahap setelah ada pembanding visual. Jangan menghapus override tanpa memahami dampaknya.
7. Bila intro kelak dirombak, selaraskan SVG inline dengan berkas sumber; jangan memakai komposisi arsip sebagai versi aktif tanpa keputusan.
8. Publikasi sesuai aturan sekolah masih menunggu tahap GitHub/hosting yang dipilih pemilik.

## Yang belum dibangun

- Backend, database server, login admin, akun staf, sinkronisasi antarperangkat, dan kolaborasi real time.
- Kasir lengkap, pembayaran, struk, retur, utang/piutang, rekonsiliasi rekening, dan shift staf.
- Pajak, penyusutan alat, bunga/cicilan, dan laporan akuntansi lengkap.
- Valuasi persediaan FIFO atau rata-rata. Pembelian belum otomatis mengganti harga bahan di rencana.
- Edit transaksi lengkap; alur utama mencatat dan menghapus transaksi.
- PWA/service worker, offline penuh, dan notifikasi terjadwal.
- AI langsung di produk. Saran otomatis adalah aturan dalam `advice()`.

Biaya kemasan per cara membeli bukan stok kemasan otomatis. Jika kemasan dimasukkan sebagai bahan resep, hindari menghitung biayanya dua kali. Font utama mengambil Google Fonts; font cadangan ada bila koneksi tidak tersedia.
