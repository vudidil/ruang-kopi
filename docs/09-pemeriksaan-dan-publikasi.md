# 09 — Hasil pemeriksaan dan cara publikasi nanti

## Pengujian saat pengemasan

Kode terbaru disalin ke folder paket yang baru. `npm ci --ignore-scripts --no-audit --no-fund` memasang dependensi terkunci, lalu `npm test` selesai dengan enam kelompok lulus. Log lengkap tersedia di `bukti/hasil-npm-test.txt`. Tidak ada klaim audit kerentanan npm karena langkah audit tidak dijalankan.

| Kelompok tes | Cakupan utama |
| --- | --- |
| `core.test.cjs` | Navigasi, rute lama, rumus, transaksi, stok, backup/impor, dan konversi satuan |
| `intro.test.cjs` | Pertama kali, penanda intro, lewati/ulang, fokus/inert, reduced motion, dan prioritas pemulihan |
| `recovery.test.cjs` | Data rusak/tidak valid, storage diblokir/penuh, ekspor raw, konfirmasi dan arsip pemulihan, serta CSV |
| `experience.test.cjs` | Sidebar, data, grafik, validasi input, stok, skenario untung/rugi, animasi angka, dan arah navigasi |
| `choreography.test.cjs` | Panggilan GSAP, jarak/waktu mobile, tirai dua sumbu, scroll reveal, cleanup, fokus, intro, dan fallback |
| `source.test.cjs` | Sintaks JavaScript, parsing CSS, aset lokal, metadata sosial, dan URL publikasi |

Saat membuat ZIP, dilakukan pemeriksaan CRC arsip, daftar berkas, hash kode aktif, dokumen PDF/Word yang bisa dibaca kembali, serta contoh data yang valid. Rincian akhirnya dicatat di `bukti/pemeriksaan-paket.json`. Manifest SHA-256 membantu memeriksa apakah isi file berubah sesudah paket dibuat; itu bukan tanda tangan digital.

## Pemeriksaan yang belum dilakukan pada versi terbaru

- Render visual seluruh halaman pada 360, 390, 768, dan 1440 px.
- Kelancaran/FPS dan sentuhan nyata pada Android atau iPhone.
- Unduh dari tautan percakapan pada perangkat pemilik.
- Seluruh alur ekspor-impor melalui antarmuka browser nyata.
- Audit aksesibilitas menyeluruh dan pengujian semua pembaca layar.
- Publikasi GitHub Pages/Vercel/Netlify.

Pada sesi Codex sebelumnya, panduan Sites melarang mengimprovisasi browser QA ketika `cua_repl.js` tidak tersedia. Karena itu, pemeriksaan browser dilewati dan batasnya dilaporkan. Antigravity dapat menggunakan alat browser yang tersedia di lingkungannya; pembatasan alat sesi lama bukan bukti browser di komputer pemilik juga tidak tersedia.

## Daftar coba manual untuk Antigravity

Gunakan data contoh atau profil browser pengujian. Jangan reset data usaha pemilik.

1. Buka Ringkasan dan seluruh menu. Pastikan tidak ada teks, angka, atau dialog terpotong.
2. Ubah dana/cadangan dan resep. Pastikan angka sesuai rumus serta pesan kesalahan terlihat.
3. Coba navigasi cepat sepuluh kali, mode ringan, reduced motion, gulir, dan keyboard.
4. Coba sentuh tombol sambil menggulir. Tidak boleh ada tombol tersangkut dalam keadaan mengecil.
5. Putar pembuka, lewati, tekan Escape, lalu kembali ke input.
6. Simpan JSON, buka di profil browser pengujian lain, dan bandingkan isi rencana.
7. Catat penjualan/pembelian/terbuang; hapus/urungkan dan periksa stok.
8. Gunakan data buatan untuk batas backup besar dan storage rusak; simpan hasil serta kasus yang gagal.

## Status hosting

Versi sumber terakhir berhasil diterbitkan di `https://ruang-kopi-rencana.flaredpear16.chatgpt.site`. Akses terakhir privat pemilik. Gerbang akses Sites bukan fitur akun admin aplikasi. Riwayat Git di proyek juga bukan bukti repositori GitHub pengguna sudah dibuat.

Paket ini tidak menyertakan `.openai/hosting.json`, remote Git, token, atau `.env`. Tujuannya agar bisa dipelajari dan dijalankan di lingkungan baru tanpa membawa identitas deployment lama secara otomatis.

## GitHub Pages, saat pemilik meminta

Workflow `.github/workflows/pages.yml` sudah tersedia dan dijalankan manual. Unggah proyek ke repositori pilihan pemilik, aktifkan Settings → Pages → GitHub Actions, lalu jalankan workflow Publikasikan Ruang Kopi. Workflow menguji proyek, menyiapkan folder `_site` dari `website/`, menyesuaikan metadata URL, dan mengirim hanya website sebagai artefak publikasi.

Folder paket lain tidak ikut artefak Pages, tetapi akan terlihat jika diunggah ke repositori publik. Jangan menambahkan backup usaha pribadi. Untuk Netlify/Vercel, folder yang dipublikasikan adalah `website/`; proyek ini tidak membutuhkan backend build.

Jika alamat hosting berubah, gunakan `tools/set-site-url.cjs` pada salinan HTML yang akan diterbitkan, lalu jalankan tes. Backup dan impor JSON diperlukan untuk memindahkan data pengguna karena localStorage tidak berpindah domain.
