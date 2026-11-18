# Arti bukti pemeriksaan

- `pengujian-paket.log`: pengujian fungsi, intro controller, sintaks JavaScript, CSS, dan referensi HTML pada paket yang disalin.
- `pemeriksaan-paket.json`: catatan pemeriksaan tambahan saat serah terima.
- `hasil-hitung-contoh.json`: hasil asli `calculate(createPlan(true))`, untuk mencocokkan rumus dokumentasi.
- `hyperframes-check.log` dan `.json`: laporan pemeriksaan komposisi intro pada pengerjaan sebelumnya. Path `/workspace/...` di log adalah lokasi lama, bukan dependensi untuk menjalankan paket.
- `animasi-kopi.jpg`: cuplikan intro pada 1,8; 4,5; dan 6,014 detik. Bukan screenshot semua halaman aplikasi.

Paket juga diuji dari folder lain dengan `npm ci --ignore-scripts --offline` dan `npm test`; dependensi tersedia di cache lingkungan saat pemeriksaan. Pengguna baru dapat menjalankan `npm ci` biasa dengan internet.

Server lokal berhasil memberikan halaman dan aset runtime melalui HTTP. Pemeriksaan ini tidak sama dengan pengujian interaktif seluruh UI di browser. Dokumen PDF diperiksa batas teks seluruh halaman dan beberapa halaman dilihat secara visual. File Word diperiksa integritas ZIP/XML; belum dirender di aplikasi Microsoft Word.
