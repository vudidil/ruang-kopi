# Serah Terima Sesi Antigravity → ChatGPT Codex

**Tanggal sesi**: 13–14 November 2026 (WIB)
**Proyek**: Ruang Kopi — Website perencana kedai kopi
**Pemilik**: Siswa kelas 10 (Fadhil)
**Asisten sesi ini**: Google Antigravity (model Gemini 3.8 Flash → Claude Opus 4.6)
**Tujuan dokumen**: Agar ChatGPT Codex (atau AI penerus lain) memahami semua yang sudah dikerjakan, masalah yang ditemukan, perbaikan yang dibuat, dan arah proyek berikutnya.

---

## 1. Apa Itu Ruang Kopi?

Website **berbahasa Indonesia** untuk merencanakan dan mencatat usaha kedai kopi. Fitur utama:
- **Ringkasan** (`#ringkasan`): Kartu KPI modal, biaya per gelas, penjualan, dan untung + slider simulasi.
- **Usaha Saya** (`#usaha`, `#usaha/modal`, `#usaha/simpan`): Profil kedai, daftar modal awal, dan manajemen banyak rencana.
- **Menu & Bahan** (`#menu`, `#menu/bahan`): Resep menu, takaran, harga bahan, stok, dan konversi satuan.
- **Hitung Keuntungan** (`#hitung`): Target penjualan, biaya rutin, dan skenario untung/rugi.
- **Catatan Harian** (`#catatan`): Pencatatan penjualan, pembelian, pengeluaran, dan bahan terbuang per hari.
- **Bantuan** (`#bantuan`): Panduan penggunaan dan kamus istilah.

### Teknologi
- **Frontend murni**: HTML + CSS + JavaScript biasa (tanpa React/Vue/framework).
- **Data lokal**: Tersimpan di `localStorage` browser dengan kunci `ruang-kopi-v3`.
- **Belum ada backend**: Tidak ada database server, login, akun admin, atau sinkronisasi.
- **Animasi intro**: SVG + GSAP 3.15.1 (teko menuang kopi ke cangkir yang bergoyang).

### Identitas Desain yang Harus Dijaga
- Gradasi hijau hangat dengan panel kaca (glassmorphism/transparan + blur).
- Tipografi: **Manrope** (teks biasa) + **Fraunces** (judul/merek).
- Ikon SVG garis. **Tanpa emoji** di UI.
- Transisi halaman halus dan latar belakang yang bergulir saat pindah halaman.
- Tombol "Lewati pembuka" dan "Putar pembuka lagi" tetap berfungsi.

---

## 2. Struktur File Penting

```
website/
├── index.html            ← Kerangka utama, sidebar, inline SVG intro
├── style.css             ← Semua tampilan: gradasi, panel, responsif, animasi
├── app.js                ← Logika halaman, routing hash, input, penyimpanan
├── finance.js            ← Rumus hitungan modal, HPP, laba, stok
├── intro-scene.svg       ← Gambar SVG terpisah (sumber referensi)
├── intro-timeline.js     ← Timeline GSAP animasi intro kopi
├── intro-controller.js   ← Logika skip/replay/fokus intro
├── intro.css             ← Tampilan overlay intro
├── background.svg        ← Motif latar belakang
└── vendor/gsap.min.js    ← GSAP 3.15.1 (pustaka pihak ketiga)

docs/                     ← Penjelasan lengkap proyek (5 dokumen)
pengujian/                ← Tes otomatis (3 file .cjs)
contoh-data/              ← Contoh JSON untuk belajar format data
riwayat-versi/            ← Arsip 3 versi kode sebelumnya (jangan ditimpa)
.agents/skills/           ← Modul skill UI/UX Pro Max + Claude SEO
```

### Urutan Muat JavaScript
`finance.js` → `app.js` → `gsap.min.js` → `intro-timeline.js` → `intro-controller.js`

### Menjalankan Website
```bash
npm start          # Server lokal di http://localhost:8080
npm ci             # Pasang dependensi tes (perlu internet)
npm test           # Jalankan 3 suite tes
```

---

## 3. Apa yang Sudah Dikerjakan di Sesi Ini

### 3A. Pembacaan dan Pemahaman Proyek
Semua dokumen dibaca berurutan:
1. `README.md` & `GEMINI.md` — aturan dasar dan konteks kolaborasi.
2. `docs/01-konteks-dan-perjalanan.md` — sejarah dan preferensi desain.
3. `docs/02-peta-fitur-dan-kode.md` — peta halaman, peran file, alur data.
4. `docs/03-rumus-dan-contoh.md` — semua rumus keuangan dan contoh perhitungan.
5. `docs/04-masalah-hasil-dan-batasan.md` — masalah yang sudah ditangani dan yang tersisa.
6. `docs/05-panduan-belajar-dan-lanjutan.md` — tutorial pemula dan rencana GitHub/backend.

### 3B. Pengujian Otomatis
- `npm ci`: 23 paket terpasang, 0 kerentanan.
- `npm test`: Semua 3 suite **PASS**:
  - `core.test.cjs`: Navigasi, routing lama/baru, kalkulasi, transaksi, stok, undo, backup JSON.
  - `intro.test.cjs`: Intro start/skip/replay, completion, inert cleanup, reduced-motion.
  - `source.test.cjs`: Sintaks JS, parsing CSS, referensi aset lokal.

### 3C. Pemeriksaan Visual di Browser Nyata
Diuji langsung pada dua ukuran layar menggunakan Playwright:

**Desktop (1280×800)**: Semua halaman tampil rapi.

**Ponsel (390×844)**: Ditemukan masalah berikut.

### 3D. Masalah yang Ditemukan (Reproduced)

| # | Masalah | Lokasi | Penyebab |
|---|---------|--------|----------|
| 1 | **Layar HP meluap ke kanan ~456px** (horizontal scroll) | `style.css` | Aturan `@media(max-width:1180px)` ditulis SETELAH `@media(max-width:720px)`, sehingga layout HP tertimpa oleh aturan tablet: `.sidebar { width: 215px }` dan `main { margin-left: 215px }`. |
| 2 | **Dialog "Ubah Satuan" terpotong di HP** | `style.css` + `app.js` | Dialog `#unit-dialog` mempunyai `width: 520px` tetap. Di layar 390px, terpotong ~130px ke kanan. |
| 3 | **Teko penuang tidak miring saat menuang** | `intro-timeline.js` + SVG | `transformOrigin` tidak sejajar dengan moncong teko, jadi kopi terlihat keluar dari udara kosong. |
| 4 | **Transisi halaman ada jeda kosong 130ms** | `app.js` → `navigate()` | Ada `await exitMotion.finished` pada animasi 130ms sebelum render halaman baru. |
| 5 | **Background tidak bergulir saat pindah halaman** | `style.css` | `.background-shift` hanya mengubah opacity, bukan menggerakkan posisi. |
| 6 | **Sisa istilah teknis** di UI | `app.js`, `index.html` | "Laba/bulan", "jumlah cup", "BEP", "HPP", "waste", "cogs", "komisi", "omzet" masih terselip. |

### 3E. Perbaikan yang Sudah Dibuat

#### A. Perbaikan Responsif Mobile (`style.css`)
- **Urutan media query dirapikan**: `1500px → 1180px → 980px → 720px → 480px → 380px` (dari besar ke kecil).
- Mobile 720px kebawah: sidebar menjadi `position: relative; width: 100%` dengan nav horizontal scroll.
- `main { margin: 0 !important }` agar konten tidak tergeser di HP.
- `html, body { overflow-x: hidden; max-width: 100vw }` mencegah bocor horizontal.

#### B. Dialog Unit Responsif (`style.css`)
```css
#unit-dialog {
  width: min(520px, calc(100vw - 32px));
  max-width: calc(100vw - 32px);
  max-height: 90vh;
  overflow: auto;
}
```
Di layar <480px: tombol bertumpuk vertikal full-width.

#### C. Animasi Teko Miring 3D (`intro-scene.svg` + `intro-timeline.js`)
- SVG teko digambar ulang dengan gradasi metalik/keramik (`#pitcher-body`, `#pitcher-handle`, `#pitcher-inside`).
- Moncong teko (spout) dipasang tepat di koordinat `(475, 140)`.
- Semua rotasi GSAP menggunakan `transformOrigin: '475px 140px'` agar kopi selalu keluar dari moncong teko.
- Urutan animasi: teko datang → miring -34° → wobble -38° → kopi mengalir → cangkir bergoyang → teko kembali tegak → teko keluar.

#### D. Transisi Halaman Tanpa Jeda (`app.js`)
- Dihapus `await exitMotion.finished` pada fungsi `navigate()`.
- Sekarang render halaman baru langsung tanpa 130ms blank delay.

#### E. Background Bergulir (`style.css`)
- Ditambahkan `@keyframes bg-rolling` yang menggerakkan `background-position` pada `body::after`.
- Ditambahkan `@keyframes bg-orb-wave` yang menggeser posisi ambient orb saat `.background-shift`.

#### F. Penyederhanaan Bahasa (`app.js` + `index.html`)
Perubahan istilah:
| Sebelum (teknis) | Sesudah (sederhana) |
|-------------------|---------------------|
| HPP / COGS | Modal bahan per gelas |
| BEP operasional | Target balik modal operasional |
| Laba/bulan | Untung/bulan |
| Omzet | Uang penjualan |
| Waste | Bahan terbuang/susut |
| Cup/cups | Gelas |
| Komisi | Potongan layanan |
| Proyeksi | Perkiraan |
| Titik impas | Target balik modal |

#### G. SVG Cangkir dan Teko 3D Canva-Style (`intro-scene.svg` + `index.html`)
- Cangkir keramik dengan gradasi volumetrik, rim atas, inner shadow, crema/busa latte art.
- Teko barista dengan badan gradasi keramik-metalik, lubang atas, isi kopi gelap, kilau highlight putih.
- Piring alas dengan gradasi dan garis tepi.
- Meja kayu dengan bevel highlight dan garis perspektif.
- Bayangan lunak radial di bawah piring.

### 3F. Pemasangan Modul Tambahan

#### UI/UX Pro Max
Dipasang via `npx ui-ux-pro-max-cli init --ai antigravity`. Berisi:
- 79 gaya desain, 192 palet warna, 74 pasangan font, 119 pedoman UX, 105 ikon, 17 preset GSAP, 25 tipe grafik.
- Lokasi: `.agents/skills/ui-ux-pro-max/`

#### Claude SEO (26 modul)
Diunduh dari `github.com/AgriciDaniel/claude-seo` dan dipasang manual. Berisi:
- `seo-technical`, `seo-audit`, `seo-page`, `seo-schema`, `seo-content`, `seo-local`, `seo-sitemap`, `seo-geo`, `seo-agentic`, dll.
- Lokasi: `.agents/skills/seo-*/` dan `.agents/agents/seo-*.md`

---

## 4. Hal yang TIDAK Boleh Dilakukan

Sesuai `GEMINI.md` dan instruksi pemilik:

1. **JANGAN menghapus localStorage** atau data `ruang-kopi-v3` untuk menyelesaikan masalah.
2. **JANGAN mengubah skema penyimpanan** dari versi 3 tanpa migrasi dan penjelasan.
3. **JANGAN menghitung ulang** biaya transaksi lama dengan harga bahan baru.
4. **JANGAN menerbitkan** ke akun hosting baru atau mengubah akses website publik.
5. **JANGAN mengklaim** ada backend, database, login admin, atau sinkronisasi yang belum dibuat.
6. **JANGAN memasang** React/Vue/framework tanpa persetujuan pemilik.
7. **JANGAN menambahkan emoji** atau "tombol penjelasan kode kelas X" di UI.
8. **JANGAN mengganti** desain visual (hijau gradasi, panel kaca, Manrope/Fraunces) atas dasar selera sendiri.
9. **JANGAN menimpa** `riwayat-versi/` ke website terbaru.

---

## 5. Keputusan Pemilik yang Perlu Diingat

| Keputusan | Status |
|-----------|--------|
| Perbaiki tampilan ponsel (CSS responsif) | ✅ Disetujui & dikerjakan |
| Perjelas perbedaan arus kas vs laba di Catatan Harian | ✅ Disetujui & dikerjakan |
| Publikasi ke GitHub Pages/Vercel/Netlify | ⏳ Belum dikerjakan (nanti) |
| Backend & akun admin | ❌ **Ditolak** untuk sesi ini (tahap lanjutan) |
| UI modern + 3D shadow + gradasi bervariasi | ✅ Disetujui & dikerjakan |
| Teko miring saat menuang | ✅ Disetujui & dikerjakan |
| Bahasa disederhanakan untuk semua umur | ✅ Disetujui & dikerjakan |
| Transisi halaman tanpa jeda + background bergulir | ✅ Disetujui & dikerjakan |

---

## 6. Status Pengujian Terakhir

```
npm test → SEMUA PASS (3/3 suite)
  ✅ core.test.cjs — navigasi, keuangan, transaksi, stok, undo, backup
  ✅ intro.test.cjs — intro start/skip/replay/reduced-motion
  ✅ source.test.cjs — sintaks JS, CSS, referensi aset
```

---

## 7. Pekerjaan yang Belum Selesai (Prioritas Berikutnya)

### Prioritas Tinggi
1. **Verifikasi visual akhir di browser nyata** (HP dan desktop) untuk semua halaman setelah perubahan CSS dan animasi.
2. **Perbaiki sisa label teknis** pada CSV export dan atribut aria-label yang masih menggunakan istilah Inggris.
3. **Uji edge case**: rencana kosong, harga nol, localStorage diblokir/rusak, backup besar.

### Prioritas Sedang
4. **Publikasi ke GitHub Pages** (struktur: isi `website/` di root repo, Deploy from branch).
5. **Tambahkan meta SEO**: Open Graph tags, Twitter Cards, dan Schema.org JSON-LD.
6. **Rapikan CSS**: Format ulang bertahap, hapus duplikasi, tanpa mengubah tampilan.

### Prioritas Rendah (Tahap Lanjutan)
7. Backend dan database (belum dirancang, butuh keputusan arsitektur).
8. PWA/service worker untuk offline.
9. Fitur tambahan: pajak, riwayat harga bahan, kasir, retur, cetak struk.

---

## 8. Cara Kerja Kolaborasi

Pemilik proyek (Fadhil) bekerja bergantian dengan asisten AI:
1. Asisten membuat revisi konkret yang kecil dan terukur.
2. Pemilik mencoba hasilnya dan memberi masukan.
3. Jalankan `npm test` setelah setiap perubahan.
4. Jangan mengubah banyak hal sekaligus tanpa persetujuan.
5. Jelaskan perubahan dengan bahasa Indonesia sederhana.
6. Pisahkan saran dari implementasi yang sudah selesai.

---

## 9. Referensi Cepat

- **Kode terbaru**: `website/` (commit asal: `cbae29d5be59d5687a762346553f22d8d6e4fd20`)
- **Data browser**: kunci `ruang-kopi-v3`, skema versi 3 (jangan ubah ke v4)
- **Rumus keuangan**: Lihat `docs/03-rumus-dan-contoh.md` dan `finance.js`
- **Aturan AI penerus**: Lihat `GEMINI.md` (sudah dimuat otomatis sebagai rule)
- **Modul desain**: `.agents/skills/ui-ux-pro-max/SKILL.md`
- **Modul SEO**: `.agents/skills/seo/SKILL.md` (hub untuk 26 sub-skill)

---

*Dokumen ini dibuat oleh Google Antigravity pada 14 November 2026 sebagai serah terima ke ChatGPT Codex atau AI penerus lainnya.*
