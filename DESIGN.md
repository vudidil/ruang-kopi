# Arah Desain Ruang Kopi (`DESIGN.md`)

> Design Read: Coffeehouse financial notebook & daily ledger for a 10th-grade founder, in a Warm Artisanal Cream Ledger & Deep Espresso Ink style, dial ENERGY 3 / RHYTHM 3 / MOTION 2.

## Palet Terkendali: Krem Kopi Hangat
- **Ground utama (`--paper`):** `#F3E8D2` (Warm Coffee-Milk Cream)
- **Permukaan (`--sheet` & `--receipt`):** `#E8D9BE` (Toasted Linen) dan `#F9F0DF` (Krem Gading untuk struk & input)
- **Tinta (`--ink` & `--muted`):** `#1E130B` (14.99:1) dan `#574332` (7.67:1)
- **Aksen (`--accent`):** `#B45309` (`#FFFDF8` di atasnya 4.94:1) dan `--accent-ink` `#8C3B06` (6.30:1)

## Tipografi & Ritme Buku Catatan (`RHYTHM 3`)
- **Judul (`--serif`):** `Newsreader` (serif editorial bergaya catatan keuangan & surat kabar dengan ukuran optik `opsz` dan angka tabular `tnum`, menggantikan `Fraunces` agar bebas dari kesan templat AI)
- **UI & angka (`--font`):** `Atkinson Hyperlegible Next` + `font-variant-numeric: tabular-nums` agar bentuk huruf humanis-unik (`l` berkait, angka `1`/`0`/`8` tegas, berbeda jauh dari `Inter`/`Manrope`) dan semua nominal rupiah jutaan (`18.000.000`) tetap sejajar rapi
- **Motif identitas (`C-1`, `R-05`, `R-12`):** Mengganti kartu kotak-kotak seragam dengan garis ledger editorial (`1.5px solid #1E130B` / `1px dashed`), zona terbuka di atas kertas `#F3E8D2`, strip aliran kas di atas linen `#E8D9BE`, dan **Kertas Struk Perhitungan** (`#F9F0DF` dengan offset bayangan cetak `6px 6px`) pada kolom hasil kanan.

## 3 Breakpoints & Kepatuhan Gerak
- **Desktop (`>= 1061px`):** Masthead navigasi atas sejajar + grid asimetris terbuka + struk hasil sticky.
- **Tablet (`681px–1060px`):** Navigasi 2 tingkat yang bernapas + kolom bertumpuk rapi.
- **Mobile (`<= 680px`):** Brand header ringkas + navigasi tab bawah 5 menu tetap dengan ruang bawah `112px` + `env(safe-area-inset-bottom)`, target sentuh minimum `44px`.
- Intro pembuka (`#intro-overlay`) menampilkan frame pertama (`sequence/ezgif-frame-001.webp`) sebagai latar awal di balik kartu sampul krem dan tombol 3D "Mulai Usahamu", lalu saat ditekan langsung memutar 117 frame berikutnya (`002`–`118`) tanpa jeda bersamaan dengan memudarnya kartu dan selaput gradasi hangat.
