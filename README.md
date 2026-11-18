# Ruang Kopi — Paket lanjutan untuk Google Antigravity

Disusun 14 November 2026. Sumber aplikasi: `f9626d5c22faf16fd8acc12ea3988fc1bec6a3d7`.

Proyek ini sudah berjalan. Jangan membangunnya ulang dari nol. Kode aktif ada di `website/`, termasuk animasi terbaru untuk HP. Mulai membaca dari `MULAI_DI_SINI.md`.

## Isi paket

- `PROMPT_UNTUK_ANTIGRAVITY.txt`: pesan siap ditempel ke Antigravity.
- `GEMINI.md`: aturan kerja dan perlindungan data.
- `SERAH-TERIMA-CODEX.md`: keadaan terbaru dan hal yang berubah dari serah terima lama.
- `docs/`: sejarah, fitur, rumus, masalah, pembelajaran, animasi, dan pemeriksaan.
- `website/`: seluruh kode HTML, CSS, JavaScript, gambar, dan GSAP lokal terbaru.
- `pengujian/`: enam kelompok tes otomatis.
- `tools/`, `package.json`, `package-lock.json`: cara menjalankan dan menguji aplikasi.
- `.github/workflows/pages.yml`: persiapan publikasi GitHub Pages secara manual; belum dijalankan pada GitHub pengguna.
- `.agents/skills/`: Ponytail beserta modul pendampingnya, serta Caveman yang ditemukan di proyek.
- `contoh-data/`: data kedai buatan untuk belajar; bukan data usaha pengguna.
- `bukti/`: hasil tes saat pengemasan dan asal kode.
- `riwayat-versi/`: delapan arsip kode sebelumnya dan daftar commit.
- `arsip-dokumen-lama/`: catatan Antigravity asli, dokumentasi awal, serta bukti komposisi intro lama.
- `LAPORAN_RUANG_KOPI.md`, `.pdf`, `.docx`: laporan dalam format teks, PDF, dan Word.

## Menjalankan

Pasang Node.js 20 atau lebih baru. Buka terminal di folder yang berisi `package.json`, lalu jalankan:

```sh
npm ci --ignore-scripts
npm test
npm start
```

Buka `http://localhost:8080`. Hentikan server dengan Ctrl+C. `npm start` hanya menjalankan server file lokal, bukan backend bisnis.

## Batas paket

Paket ini bukan transkrip lengkap percakapan. Isinya disusun dari pesan yang tersedia, dokumentasi sebelumnya, kode, riwayat Git, dan hasil tes. Keberhasilan visual pada HP nyata belum dapat dipastikan melalui tes otomatis.

Data usaha asli di browser tidak ikut tersalin. Untuk memindahkannya, unduh JSON dari **Usaha saya → Simpan rencana**, kemudian impor pada website baru. Jangan menghapus localStorage.

Tidak ada backend, login admin aplikasi, database server, atau sinkronisasi yang dibuat. Situs demonstrasi terakhir berhasil diterbitkan di `https://ruang-kopi-rencana.flaredpear16.chatgpt.site` dengan akses privat pemilik. Paket ini tidak membawa kredensial atau konfigurasi akun hosting tersebut.
