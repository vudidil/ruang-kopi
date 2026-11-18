# RUANG KOPI

## Catatan proyek dan serah terima untuk Google Antigravity

14 November 2026 • Sumber f9626d5

Paket lanjutan, bukan proyek baru. Berisi perjalanan permintaan, fitur dan kode, rumus keuangan, perbaikan, keterbatasan, animasi terbaru untuk HP, pengujian, dan langkah melanjutkan.

Kode lengkap yang bisa diedit ada dalam folder website/ pada ZIP pendamping. Delapan arsip kode lama disertakan untuk memahami perkembangan. PDF dan Word ini menjelaskan proyek; bukan pengganti berkas program.

Catatan disusun dari percakapan yang tersedia, dokumen sebelumnya, sumber program, riwayat Git, dan hasil tes. Ini bukan transkrip verbatim seluruh percakapan. Data usaha pribadi di browser tidak ikut paket.

## Urutan baca

1. Mulai di sini dan serah terima Codex.
2. Tujuan dan perjalanan pemilik.
3. Peta fitur, kode, dan aliran data.
4. Rumus dan contoh hitungan.
5. Masalah, hasil, dan batasan.
6. Panduan belajar serta langkah berikutnya.
7. Catatan desain dan animasi.
8. Pemeriksaan, publikasi, skill, dan arsip versi.
9. Prompt siap ditempel ke Antigravity.


# Mulai di sini

## Untuk pemilik proyek

1. Simpan ZIP, lalu ekstrak seluruh isinya. Jangan membuka proyek dari dalam ZIP.
2. Buka folder `Ruang-Kopi-Antigravity` yang berisi `package.json` menggunakan Google Antigravity.
3. Buka `PROMPT_UNTUK_ANTIGRAVITY.txt`, salin semua isinya, lalu tempel ke percakapan Antigravity.
4. Minta Antigravity membaca dokumen dan menjalankan tes sebelum mengubah kode.
5. Jika ingin membawa angka usaha asli, simpan salinan JSON dari website lama dahulu. File kode berbeda dengan file data usaha.

Kalau baru belajar, baca `docs/05-panduan-belajar-dan-lanjutan.md`. PDF dan Word berisi penjelasan; kode lengkap yang bisa diedit berada dalam folder `website/` pada ZIP.

## Urutan baca untuk AI penerus

1. `GEMINI.md` dan `AGENTS.md`.
2. `SERAH-TERIMA-CODEX.md`.
3. `docs/01-konteks-dan-perjalanan.md`.
4. `docs/02-peta-fitur-dan-kode.md`.
5. `docs/03-rumus-dan-contoh.md`.
6. `docs/04-masalah-hasil-dan-batasan.md`.
7. `docs/05-panduan-belajar-dan-lanjutan.md`.
8. `docs/06-revisi-buku-kerja.md` dan `docs/07-arah-animasi.md`.
9. `docs/08-panduan-animasi-dan-debug.md`, `docs/09-pemeriksaan-dan-publikasi.md`, dan `docs/10-skill-dan-alat.md`.
10. Kode di `website/`, tes di `pengujian/`, lalu `bukti/hasil-npm-test.txt`.

Dokumen dalam `arsip-dokumen-lama/` menjelaskan sejarah. Jika statusnya berbeda, periksa dokumen terbaru dan kode. Sebagai contoh: intro sekarang memakai penanda localStorage, jumlah tes enam kelompok, dan animasi halaman memakai `motion.js`.


# Serah terima Codex ke Google Antigravity

Tanggal paket: 14 November 2026. Kode aktif: `f9626d5c22faf16fd8acc12ea3988fc1bec6a3d7`.

## Gambaran dalam satu menit

Ruang Kopi membantu menyusun modal pembukaan, bahan/resep, harga jual, target penjualan, perkiraan untung, dan catatan usaha. Semua berjalan di browser. Website memakai HTML, CSS, JavaScript, serta GSAP lokal untuk animasi. Pemilik ingin melanjutkan proyek secara bergantian dengan AI, dengan penjelasan yang mudah dipahami.

Versi ini sudah diterbitkan di `https://ruang-kopi-rencana.flaredpear16.chatgpt.site`; publikasi terakhir berhasil, akses privat pemilik. Bukan GitHub Pages dan bukan login admin aplikasi. Sumber Git lokal tersedia, tetapi repositori GitHub pengguna belum disambungkan dalam pekerjaan ini.

## Perubahan penting setelah paket Antigravity sebelumnya

1. Ringkasan dibuat lebih terarah: kebutuhan modal, perkiraan untung, grafik, dan langkah berikutnya.
2. Bahasa bisnis diperjelas, termasuk CSV dan label aksesibilitas. Target penutupan biaya tidak lagi disamakan dengan modal awal kembali.
3. Data rusak tidak langsung ditimpa. Pengguna dapat mengunduh data lama, memilih cadangan, melihat pratinjau, lalu mengonfirmasi pemulihan. Pengarsipan data lama harus berhasil terlebih dahulu.
4. Penyimpanan diblokir/penuh diberi pemberitahuan; perubahan yang belum tersimpan dapat diunduh. Penimpaan data yang berubah di tab lain dicegah dalam alur pemulihan.
5. Intro otomatis memakai penanda localStorage sehingga tidak tampil ulang setiap tab baru. Ada migrasi penanda sessionStorage lama dan fallback. Tombol lewati dan putar ulang tetap ada.
6. Metadata Open Graph, Twitter Card, favicon, gambar sosial, dan Schema.org WebApplication ditambahkan.
7. UI menjadi buku kerja kedai: krem, hijau, aksen hangat, Manrope/Fraunces, panel samping transparan yang bisa diperkecil, serta menu bawah di HP.
8. Grafik penjualan/biaya dan skenario sepi-target-ramai dibuat lebih jelas. Form memiliki satuan dan pesan kesalahan di dekat kolom.
9. Animasi halaman dipindahkan ke `motion.js`/`motion.css`: tirai, kata judul, kartu, angka, respons hasil, scroll reveal, dan tilt mouse.
10. Revisi terbaru memperkuat gerakan: tirai menutup/membuka pada sumbu berbeda sekitar 710 ms, kartu mobile hingga 85 px selama 680 ms, dan tombol mengecil saat disentuh. Ada mode gerak ringan dan dukungan reduced motion.

## Koreksi status dari dokumen lama

| Catatan lama | Keadaan sekarang |
| --- | --- |
| Tiga kelompok tes | Enam kelompok tes |
| Intro sekali per sesi tab | Penanda localStorage, dengan migrasi/fallback sessionStorage |
| Belum ada metadata sosial/Schema.org | Sudah ada dan diperiksa tes sumber |
| CSV/aria masih menjadi prioritas penyederhanaan | Label yang ditangani sudah diperbaiki dan diuji; bahasa masih bisa disempurnakan dari masukan pengguna |
| Data rusak dapat ditimpa | Alur pemulihan dan perlindungan sudah dibuat dan diuji |
| Semua gerakan memakai CSS lama | GSAP di motion.js mengatur gerak penuh; CSS menyediakan tampilan/fallback |
| Sidebar HP menggulir horizontal | Lima menu utama menjadi navigasi tetap di bawah layar |
| Figma belum tersedia pada suatu sesi | Pada sesi berikutnya alatnya terlihat tersedia; tidak dibuat file Figma baru |
| Pemeriksaan browser pada versi lama | Tidak membuktikan versi animasi terbaru sudah lulus visual di HP |

## Yang masih terbuka

Prioritas berikutnya adalah mencoba versi terbaru pada HP nyata dan desktop, memeriksa posisi teks/kartu/dialog, ekspor-impor nyata, serta kelancaran gerakan. Rombakan cangkir menunggu pembahasan pemilik. GitHub dikerjakan belakangan. Batas ekspor backup besar, kerapian CSS yang berlapis, dan kasus transaksi/undo lanjutan masih perlu peninjauan terarah.

Backend, database, akun staf/admin, sinkronisasi, POS, pembayaran, struk, PWA, serta model pajak/penyusutan lengkap belum dibuat.

## Bukti dan cara melanjutkan

Enam kelompok tes lulus saat pengemasan; hasil ada di `bukti/hasil-npm-test.txt`. Tes animasi merekam panggilan GSAP, bukan merender animasi dalam browser. Asal commit dan publikasi ada di `bukti/asal-kode.json`.

Jalankan `npm ci --ignore-scripts`, `npm test`, lalu `npm start` untuk mencoba website. Jangan mengganti data `ruang-kopi-v3`. Baca dokumen rinci sebelum menyentuh rumus atau penyimpanan. Perubahan dokumentasi paket ini tidak mengubah kode situs aktif.


# 01 — Tujuan, perjalanan, dan keputusan pemilik

## Tujuan awal

Pemilik ingin alat bantu menghitung modal, omzet, dan kebutuhan bisnis, lalu memusatkannya pada kedai kopi. Teknologi yang diminta adalah HTML, CSS, dan JavaScript. Panel admin/backend pernah diusulkan, tetapi belum dikerjakan. Nama produk saat ini adalah Ruang Kopi.

Pemilik masih kelas 10. Ia ingin bekerja seperti co-driver: AI memberi kritik yang mudah dimengerti, membuat revisi konkret, lalu pemilik mencoba dan memberi masukan berikutnya. Jadi, jangan memperlakukan serah terima ini sebagai perintah membangun ulang seluruh produk.

## Ketentuan sekolah yang pernah dibagikan

Potongan gambar menyebut tema solusi digital sehari-hari berbantuan AI, kelompok dua siswa dari sekolah yang sama, produk website dengan HTML/CSS/JavaScript yang berfungsi, tampilan responsif, dan publikasi melalui GitHub Pages, Vercel, atau Netlify. Penggunaan AI diperbolehkan untuk membantu, tetapi siswa harus memahami logika dan kode.

Ini rangkuman potongan yang tersedia, bukan salinan peraturan lengkap. Publikasi demonstrasi lewat Sites tidak otomatis memenuhi ketentuan penyedia hosting sekolah. GitHub tetap menunggu tahap yang diminta pemilik.

## Perjalanan revisi

| Tahap | Masukan pemilik | Hasil atau keputusan |
| --- | --- | --- |
| Gagasan | Brainstorming modal, omzet, dan kebutuhan kedai | Perencana usaha kedai kopi |
| Prototipe | Modal bisa diedit, tombol berfungsi, tiap bagian punya halaman | Form interaktif dan navigasi hash |
| Tampilan awal | Kaku, monoton, terlalu generik | Gradasi hijau, kedalaman kartu, latar dan transisi |
| Bahasa dan fitur | Istilah sulit, fungsi sejenis terpisah | Lima kelompok; bahan+stok serta penjualan+untung digabung |
| Preferensi UI | Hapus tombol penjelasan kode kelas X dan emoji | Pembelajaran dipindahkan ke dokumen; ikon SVG pada produk |
| Pembuka | Kopi dituangkan cepat ke cangkir, bergoyang, ada cipratan | Intro SVG/GSAP, lewati, putar ulang, dan pemulihan fokus |
| Serah terima pertama | Dokumen serta kode untuk Antigravity | Paket awal; sempat ada keluhan tiga tautan unduhan tidak bekerja |
| Antigravity | Perbaikan responsif, dialog, teko, istilah, dan jeda navigasi | Dicatat dalam serah terima asli; kode dilanjutkan di Codex |
| Skill | Minta Ponytail, Caveman, UI/UX dan SEO | Skill dipakai sesuai kebutuhan; salinan lokal yang tersedia ikut paket |
| Penyederhanaan lanjut | Setuju kritik dan minta implementasi | Ringkasan, pemulihan data, bahasa, metadata, dan tes diperbaiki |
| Arah desain baru | UI masih terasa buatan AI, perlu lebih berkarakter | Gaya buku kerja kedai, grafik, ruang baca, navigasi HP |
| Animasi iklan | Gerak kiri/kanan/atas, masuk lalu hilang | Tirai adegan, judul per kata, kartu berlapis, tilt dan scroll reveal |
| Revisi paling baru | Lebih berani, tetap smooth dan jelas di HP | Transisi dua sumbu, gerakan mobile terbatas, respons sentuhan |
| Permintaan sekarang | Jelaskan seluruh perjalanan dan sertakan kode | Paket terbaru ini, termasuk delapan arsip kode lama |

Ada pertanyaan tentang sisa limit ChatGPT. Informasi kuota akun tidak tersedia dari kode atau alat proyek; tidak ada angka limit yang dapat dipastikan di sini.

## Keputusan yang masih berlaku

1. Gunakan bahasa Indonesia sederhana dan penjelasan per poin bila membantu.
2. Pertahankan HTML/CSS/JavaScript biasa. Framework baru perlu keputusan pemilik.
3. Animasi boleh kuat seperti iklan, tetapi formulir dan navigasi tetap harus bisa dipakai.
4. Jangan menambahkan emoji atau tombol pelajaran kode pada UI.
5. Rombakan total cangkir ditunda sampai pembahasan berikutnya.
6. GitHub dikerjakan belakangan; tidak ada alasan untuk menerbitkan ulang ke akun baru hanya karena membaca paket.
7. Gunakan skill yang diperlukan dan sebutkan secara jujur. Semua plugin tidak wajib dipanggil pada setiap pekerjaan.
8. Jaga data usaha. Preferensi tampilan tidak boleh menimpa data bisnis.

“Canva style” adalah arahan visual, bukan bukti adanya file Canva. Figma dan Superdesign tidak menghasilkan file desain baru pada tahap animasi terakhir. Penilaian apakah desain masih terasa generik tetap membutuhkan masukan pemilik.

## Batas rekonstruksi

Paket merangkum percakapan yang tersedia, dokumen lama, kode, dan riwayat Git. Tidak semua respons asisten terdahulu tersedia sebagai transkrip. Karena itu, perubahan hanya disebut selesai jika ada kode, tes, catatan yang diberi sumber, atau hasil publikasi yang mendukungnya. Riwayat commit lengkap yang ditemukan ada di `riwayat-versi/README.md`.


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


# 03 — Memahami rumus dan pencatatan

Rumus berikut menjelaskan implementasi saat paket dibuat. Angka ini adalah alat perencanaan, bukan laporan akuntansi lengkap atau jaminan laba.

## Modal awal

```text
Biaya pembukaan = jumlah semua biaya di daftar kebutuhan
Total dana dibutuhkan = biaya pembukaan + target cadangan
Kekurangan dana = maksimum(0, total dana dibutuhkan - uang tersedia)
Uang setelah pembukaan = maksimum(0, uang tersedia - biaya pembukaan)
```

Cadangan dimasukkan satu kali di kolom khusus. Jangan menambah baris cadangan lagi pada daftar kebutuhan karena akan terhitung dua kali.

Contoh: kebutuhan pembukaan Rp45.000.000, cadangan Rp5.000.000, dana Rp50.000.000. Total kebutuhan Rp50.000.000, kekurangan nol, uang setelah pembukaan Rp5.000.000. Jika biaya rutin Rp8.000.000/bulan, daya tahan tanpa penjualan sekitar 0,625 bulan. Ini hanya perkiraan membayar biaya rutin yang dimasukkan, bukan perkiraan lengkap seluruh kewajiban.

## Biaya bahan untuk satu gelas

```text
Harga per satuan = harga satu kemasan / jumlah isi kemasan
Biaya bahan dalam resep = harga per satuan × jumlah yang dipakai
Biaya dasar resep = jumlah semua biaya bahan dalam resep
```

Susu Rp20.000 per 1.000 ml, dipakai 125 ml: Rp20/ml × 125 = Rp2.500.

Resep contoh kopi susu:

| Bahan | Harga kemasan | Isi | Dipakai | Biaya |
| --- | --- | --- | --- | --- |
| Biji kopi | Rp150.000 | 1.000 gram | 18 gram | Rp2.700 |
| Susu | Rp20.000 | 1.000 ml | 125 ml | Rp2.500 |
| Sirup gula | Rp50.000 | 1.000 ml | 20 ml | Rp1.000 |
| Air & es | Rp1.000 | 1.000 ml | 150 ml | Rp150 |
| Total | | | | **Rp6.350** |

Satuan resep harus cocok dengan satuan bahan. Angka 125 berarti 125 satuan yang tertulis, bukan selalu 125 ml.

## Bahan terbuang, diskon, kemasan dan biaya layanan

```text
Biaya bahan perkiraan = biaya dasar resep / (1 - persen terbuang/100)
Harga setelah diskon = harga menu × (1 - diskon/100)
Biaya layanan = harga setelah diskon × (komisi kanal + biaya pembayaran)/100
Biaya menjual satu gelas = biaya bahan perkiraan + kemasan + biaya layanan
Sisa uang per gelas = harga setelah diskon - biaya menjual satu gelas
```

Bahan terbuang 5% memakai pembagian 0,95; bukan sekadar mengalikan biaya dengan 1,05. Batas input terbuang 95% mencegah pembagian nol.

Tiga cara membeli: minum di kedai, dibawa pulang, pesan lewat aplikasi. Harga, kemasan, dan komisi dapat berbeda. Diskon dan biaya pembayaran saat ini berupa asumsi umum rencana, bukan pengaturan setiap transaksi.

## Perkiraan gabungan banyak menu

Bobot menu dan bobot cara membeli dinormalisasi. Kopi susu 6 dan Americano 4 berarti 60% dan 40%; tidak harus ditulis 60 dan 40. Bobot 0 membuat menu tidak ikut perkiraan penjualan.

```text
Bobot pasangan = bobot menu / total bobot menu
                 × bobot cara membeli / total bobot cara membeli
Rata-rata harga/biaya = jumlah nilai setiap pasangan × bobot pasangan
```

Model mengasumsikan proporsi cara membeli yang sama untuk semua menu. Belum ada matriks “kopi susu lebih sering delivery, Americano lebih sering dine-in”. Jika total bobot menu atau kanal nol, perhitungan dianggap belum lengkap dan target penjualan untuk menutup biaya tidak ditampilkan sebagai angka sah.

## Penjualan, keuntungan, dan target biaya tertutup

```text
Jumlah gelas sebulan = target gelas/hari × hari buka
Uang penjualan = jumlah gelas × harga rata-rata setelah diskon
Biaya sesuai penjualan = jumlah gelas × biaya rata-rata menjual satu gelas
Biaya rutin = sewa + gaji + utilitas + biaya lain
Perkiraan untung = uang penjualan - biaya sesuai penjualan - biaya rutin
Target gelas/bulan = pembulatan ke atas(biaya rutin / sisa uang per gelas)
Target gelas/hari = pembulatan ke atas(target gelas/bulan / hari buka)
```

Target hanya dihitung bila sisa uang per gelas positif dan data bobot valid. Hari buka nol membuat target harian tidak tersedia.

Target ini sering disebut BEP operasional. Artinya biaya periode itu tertutup; **belum berarti modal membeli mesin sudah kembali**. Penyusutan alat, pajak, bunga pinjaman, dan biaya yang tidak dimasukkan belum diperhitungkan.

Contoh bawaan memakai 60 gelas/hari dan 26 hari: 1.560 gelas/bulan. Rata-rata harga Rp22.000 memberi uang penjualan Rp34.320.000/bulan. Biaya dasar bahan rata-rata Rp4.990; setelah bahan terbuang 5% menjadi sekitar Rp5.252,63. Kemasan rata-rata Rp780 dan layanan rata-rata Rp1.056. Biaya menjual rata-rata Rp7.088,63, biaya rutin Rp8.000.000, sehingga perkiraan untung sekitar **Rp15.261.735/bulan** dan target penutupan biaya **21 gelas/hari**. Seluruhnya merupakan angka contoh untuk belajar.

Kapasitas tim dihitung `jam kerja × jumlah barista × gelas per barista per jam`. Jika target melebihi perkiraan kapasitas, aplikasi memberi saran. Belum memodelkan jam sibuk, mesin, antrean, atau jadwal shift secara detail.

## Catatan harian berbeda dengan perkiraan

Setiap transaksi menyimpan nilai uang saat transaksi dibuat. Harga bahan yang diubah besok tidak mengubah biaya transaksi kemarin.

| Jenis | Uang masuk | Uang keluar | Dampak bahan |
| --- | --- | --- | --- |
| Penjualan | Harga setelah diskon dan potongan layanan × gelas | 0 pada entri ini | Berkurang menurut resep |
| Pembelian bahan | 0 | Uang pembelian yang diisi | Bertambah sebesar jumlah dibeli |
| Pengeluaran | 0 | Uang pengeluaran yang diisi | Tidak berubah |
| Terbuang/rusak | 0 | 0 | Berkurang; nilai bahan dicatat tersendiri |

Untuk penjualan, `cogs` menyimpan biaya dasar resep ditambah kemasan. Perkiraan tambahan bahan terbuang tidak ikut mengurangi stok saat penjualan; bahan rusak dicatat terpisah agar tidak dihitung dua kali.

Pembelian menambah stok dan uang keluar, tetapi **belum otomatis mengubah harga kemasan atau menghitung rata-rata biaya persediaan**. Ubah harga rencana secara sadar bila diperlukan. Metode FIFO/rata-rata tertimbang belum dibuat.

Bagian uang masuk dikurangi uang keluar adalah selisih catatan kas, bukan otomatis laba. Stok awal yang dibeli sebelum pencatatan, saldo awal rekening, pajak, utang, dan transaksi yang belum dicatat dapat membuatnya berbeda dengan saldo nyata.

Menghapus transaksi membalik pergerakan stoknya. Tombol Urungkan dapat memulihkan operasi penghapusan yang didukung selama notifikasi masih aktif.

## Persediaan dan konversi satuan

Status stok: negatif → periksa catatan; nol → belum ada bahan; positif dan tidak lebih dari ambang pengingat → hampir habis; lainnya → masih tersedia. Ambang 0 mematikan pengingat batas rendah, tetapi stok nol tetap diberi informasi.

Mengedit stok manual adalah koreksi jumlah, bukan transaksi uang. Jika ingin mencatat pembayaran pembelian, gunakan Catatan Harian.

Data lama memakai `pcs` sebagai satuan generik per takaran, bukan bukti semua bahan adalah benda satuan. Karena isi takaran lama tidak diketahui, aplikasi tidak menebak gram/ml dari nama bahan.

Dialog Ubah satuan meminta faktor: **1 satuan lama setara berapa satuan baru?** Jika 1 takaran susu lama adalah 125 ml, faktor 125. `convertUnit()` mengalikan isi kemasan, stok, batas minimum, takaran resep, dan semua pergerakan stok historis dengan faktor yang sama. Harga kemasan serta nilai uang transaksi tetap. Dengan demikian biaya resep tidak berubah. Setelah konversi, undo lama dibersihkan agar tidak menggunakan jumlah dari satuan lama.

Faktor gram ke mililiter tidak boleh ditebak: kepadatan bahan berbeda-beda. Pengguna harus memahami jumlah yang dikonversi.


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


# 05 — Belajar kode dan melanjutkan proyek

## Bayangkan website seperti kedai

HTML adalah susunan ruangan: judul, menu, tombol, dan kolom. CSS mengatur cat, ukuran, font, dan posisi. JavaScript menjalankan kasir hitungan dan respons tombol. `finance.js` seperti buku rumus. `app.js` menghubungkan buku rumus dengan tampilan. `motion.js` mengatur bagaimana bagian-bagian itu bergerak.

LocalStorage seperti buku catatan yang tertinggal di satu browser. Membuka website di komputer lain tidak membawa buku itu. Karena itu, JSON dipakai untuk membawa salinan data.

## Cara menjalankan

1. Ekstrak ZIP dan buka folder proyek.
2. Pasang Node.js versi 20 atau lebih baru jika belum tersedia.
3. Buka terminal pada folder yang memiliki `package.json`.
4. Jalankan perintah berikut.

```sh
npm ci --ignore-scripts
npm test
npm start
```

Perintah pertama memasang alat pengujian dari versi yang dikunci. Perintah kedua memeriksa perilaku yang sudah dicakup tes. Perintah ketiga membuka server lokal. Buka alamat `http://localhost:8080` di browser. Ctrl+C menghentikan server.

Jika port 8080 sudah dipakai, hentikan server lokal lain atau pilih port berbeda melalui variabel `PORT`. Hindari membuka HTML langsung dengan file:// karena perilaku penyimpanan dan izin browser dapat berbeda.

## Latihan membaca kode

### Latihan 1: memahami biaya susu

Di `finance.js`, cari `recipeCost()`. Urutannya: cari bahan resep, ambil harga kemasan, bagi dengan isi kemasan, lalu kalikan jumlah yang dipakai. Susu Rp20.000 per 1.000 ml, dipakai 125 ml: Rp2.500.

Fungsi memakai `reduce()` untuk menjumlahkan biaya setiap bahan. Coba jelaskan dengan kata sendiri sebelum mengubahnya.

### Latihan 2: menghitung contoh tanpa mengubah data browser

Pada console browser website, kode berikut membuat objek latihan terpisah:

```js
const latihan = window.RK.createPlan(true);
const hasil = window.RK.calculate(latihan);
console.log(hasil.revenue, hasil.profit, hasil.bepDaily);
```

Ini tidak memanggil penyimpanan aplikasi. Nilainya berasal dari contoh bawaan. `revenue` adalah uang penjualan, `profit` perkiraan untung, `bepDaily` target gelas untuk menutup biaya rutin.

### Latihan 3: memahami satu input

Cari `data-path="assumptions.cups"` di `app.js`. Itu menunjuk jumlah gelas per hari. Perhatikan alur input, validasi, perubahan model, `save()`, dan `refresh()`. Angka yang terlihat bergerak tidak berarti rumusnya berubah berkali-kali.

### Latihan 4: membaca animasi

Buka `motion.js`, cari `enter()`. `x` berarti gerak mendatar; `y` gerak atas/bawah; `rotation` sudut putaran; `scale` ukuran; `opacity` tingkat terlihat. `duration` memakai detik. `stagger` memberi selisih waktu antarelemen.

`stopPage()` seperti membereskan panggung sebelum adegan berikutnya. Tanpanya, animasi lama dapat mengganggu halaman baru. Baca tes `choreography.test.cjs` untuk melihat kondisi yang dijaga.

## Cara membuat perubahan yang mudah diperiksa

1. Pilih satu masalah nyata, misalnya judul bergerak terlalu jauh di HP.
2. Temukan fungsi dan aturan CSS yang mengaturnya; cari pemanggilnya juga.
3. Ubah bagian terkecil yang menyelesaikan masalah.
4. Jalankan `npm test` dan coba hasil pada browser yang relevan.
5. Jelaskan apa yang berubah, alasan, hasil pemeriksaan, dan batasnya.
6. Simpan commit atau salinan sebelum melanjutkan revisi berikutnya.

Jangan menghapus data browser untuk membuat tes manual terasa mudah. Pakai contoh kedai atau profil browser pengujian terpisah.

## Urutan pekerjaan berikutnya

Prioritas dekat: pemilik mencoba animasi pada HP, mencatat gerakan yang disukai/tidak disukai, lalu revisi kecil. Berikutnya, pemeriksaan backup besar dan kasus transaksi yang belum tercakup. Rombakan intro dibahas tersendiri. GitHub dan hosting sekolah setelah pemilik siap. Backend baru dirancang jika kebutuhan akun/staf/sinkronisasi sudah jelas.

Tidak perlu memasang semua plugin sekaligus. Gunakan alat yang menyelesaikan tugas saat itu dan jelaskan hasil sebenarnya.


# Revisi tampilan buku kerja kedai

Catatan tahap `774fdbc`. Setelah tahap ini, motion.js diperluas untuk animasi halaman, jumlah kelompok tes menjadi enam, dan animasi HP diperkuat. Baca dokumen 07 serta SERAH-TERIMA-CODEX.md untuk keadaan terbaru. Keterangan alat pada bagian bawah menggambarkan ketersediaannya saat tahap tersebut.

Revisi ini melanjutkan kode Ruang Kopi. Bahasa pemrograman tetap HTML, CSS, dan JavaScript. Tidak ada pustaka baru yang diperlukan.

## Yang berubah

1. Gaya kertas krem, tinta hijau, serta aksen cokelat dan terakota.
2. Sidebar transparan yang dapat diperkecil. Pilihan disimpan terpisah dari data usaha.
3. Navigasi lima bagian di bawah layar HP; panduan tetap dapat dibuka dari atas.
4. Judul menggunakan Fraunces, angka dan formulir menggunakan Manrope.
5. Ringkasan menonjolkan perkiraan untung, kecukupan modal, dan satu langkah berikutnya.
6. Grafik perbandingan penjualan, biaya bahan/layanan, dan biaya bulanan dengan angka serta label.
7. Ringkasan bahan mendahulukan bahan yang perlu diperiksa. Satuan bahan tetap terpisah.
8. Perbandingan sepi, target, dan ramai memakai skala grafik untung/rugi yang sama.
9. Kolom pengisian menampilkan satuan, contoh, dan kesalahan di dekat kolom.
10. Perpindahan halaman mengikuti arah menu. Latar dan isi bergerak singkat.
11. Angka berubah selama 320 milidetik. Perubahan yang datang saat animasi berjalan menggantikan tujuan sebelumnya.
12. Tombol memberi reaksi saat ditekan. Indikator tersimpan mengikuti hasil penyimpanan sebenarnya.
13. Bagian kosong memberi petunjuk awal. Rencana kosong mengarahkan pengguna ke halaman usaha.
14. Gerak dikurangi bila pengaturan perangkat meminta pengurangan animasi.

`website/workbook.css` berisi gaya baru. `website/motion.js` mengatur animasi angka. Perhitungan tetap memakai `website/finance.js`. Grafik tidak mengubah data sumber atau menambah rumus bisnis.

## Data dan batas lingkup

- Kunci dan struktur `ruang-kopi-v3` tetap sama.
- Preferensi sidebar memakai `ruang-kopi-ui-sidebar`.
- File intro, gambar cangkir, dan urutan animasi kopi tidak dirombak.
- Tidak ada koneksi GitHub baru, backend, login, atau sinkronisasi yang ditambahkan.
- Figma terdeteksi terpasang, tetapi alat mengedit Figma tidak tersedia pada sesi ini. Implementasi dibuat langsung pada website; belum ada file desain Figma baru.

## Pemeriksaan

Jalankan `npm test`. Lima kelompok tes mencakup perhitungan, transaksi, pemulihan data, intro, sidebar, validasi, grafik, animasi angka yang terputus, pengurangan gerak, arah navigasi, sintaks, CSS, dan metadata.

Tes UI memakai DOM tiruan. Belum ada verifikasi visual di browser nyata pada sesi ini karena alat browser Sites tidak tersedia. Periksa hasil pada lebar 360, 390, 768, dan 1440 piksel, terutama navigasi bawah, input, dialog satuan, dan perpindahan halaman cepat. Font Google memerlukan koneksi; font cadangan tetap tersedia.

Skill yang diterapkan: Ponytail untuk membatasi perubahan pada kebutuhan pengguna; Caveman untuk komunikasi ringkas; UI/UX Pro Max untuk hierarki, kontrol sentuh, fokus, pengurangan gerak, dan label grafik; Sites untuk publikasi versi website.


# Animasi bergaya iklan

## Referensi yang diteliti

- [Codrops — Building Async Page Transitions in Vanilla JavaScript](https://tympanus.net/codrops/2026/02/26/building-async-page-transitions-in-vanilla-javascript/): pergantian adegan memakai gerak dan penyingkapan bertahap.
- [Codrops — Choreographing Kinetic Typography on Scroll with GSAP](https://tympanus.net/codrops/2026/11/10/kinetic-typography-gsap/): teks masuk bergiliran dengan jeda pendek.
- [GSAP — matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/): menyesuaikan gerakan dengan perangkat dan pengaturan pengurangan gerak, lalu membersihkan efek yang sudah tidak diperlukan.

Artikel Codrops ditemukan melalui hasil pencarian; pembukaan langsung mengembalikan HTTP 403. Dokumentasi GSAP berhasil dibaca. Demo video dan tampilan situs referensi tidak diuji langsung. Referensi menjadi inspirasi teknik; aset dan kode situs lain tidak disalin.

## Yang diterapkan

- Tirai tiga lapis warna menutup lalu terbuka pada arah berbeda dalam 710 ms. Ada gradasi hijau dan huruf merek besar. Tulisan adegan masuk lalu menghilang.
- Judul muncul kata demi kata, dengan jeda 55 ms dan sedikit pantulan. Gerak judul dimulai saat tirai membuka, supaya lebih terlihat. Nama judul tetap utuh untuk pembaca layar.
- Kartu memakai arah berbeda menurut halaman: horizontal, dari bawah, atau dari atas, dengan sedikit putaran dan pembesaran.
- Grafik terisi bertahap. Bagian di bawah layar muncul saat masuk area pandang, satu kali untuk setiap render halaman.
- Kartu utama miring mengikuti posisi mouse. Hanya dijalankan untuk pointer mouse yang mendukung hover.
- Pada HP, kartu masuk dari jarak hingga 85 px dengan putaran kecil. Durasi kartu 680 ms dan jeda antarkartu dibatasi 160 ms. Efek memakai transform dan opacity; tidak menambah blur bergerak atau pustaka baru.
- Tombol dan tab mengecil saat disentuh lalu kembali saat dilepas. Respons sentuh memakai CSS `:active`, tanpa menangkap sentuhan atau menghalangi gulir. Ikon menu aktif juga memantul singkat.
- Hasil perhitungan dan pemberitahuan memberi respons pendek.
- Tombol **Gerak penuh / Gerak ringan** tersedia di atas halaman. Gerak penuh adalah pilihan awal; pengaturan gerak minimal pada perangkat tetap dihormati.

## Batas dan perilaku

Tidak ada penundaan pemrosesan navigasi atau penyimpanan untuk menunggu animasi. GSAP context sebelumnya dibersihkan setiap render dan pergantian halaman. Pengguna keyboard dapat memfokuskan kontrol tanpa menunggu animasi. Jika GSAP atau IntersectionObserver tidak tersedia, konten tetap dapat digunakan.

Preferensi gerak menggunakan `ruang-kopi-motion`, terpisah dari data bisnis `ruang-kopi-v3`. Rumus dan skema data tidak diganti. Ilustrasi serta koreografi cangkir tetap sama; controller intro hanya memberi sinyal kapan animasi halaman perlu dihentikan atau dimulai.

`website/motion.js` mengatur gerak, `website/motion.css` mengatur tirai dan teks. GSAP 3.15.1 yang sudah ada dipakai kembali; tidak ada pustaka tambahan.

## Pemeriksaan

Enam kelompok `npm test` mencakup regresi bisnis, pemulihan data, intro, angka, navigasi cepat, pilihan intensitas, fokus keyboard, urutan intro, dan kondisi pustaka tidak tersedia. Tes layar kecil juga memeriksa jarak dan durasi kartu, perpindahan dua sumbu, urutan judul sesudah tirai mulai membuka, serta kemunculan sekali saat digulir dan pembersihan observer. Pengujian koreografi mencatat panggilan GSAP dengan pengganti di memori; bukan pemeriksaan visual, sentuhan nyata, atau pengukuran frame rate.

Verifikasi browser nyata belum tersedia. Sites mengharuskan melewati browser QA saat `cua_repl.js` tidak tersedia. Periksa gerakan pada HP dan komputer sebelum menilai hasil visualnya selesai.

Panduan yang diterapkan: HyperFrames/GSAP untuk timeline, stagger, transform, cleanup, dan quickTo; Ponytail untuk menggunakan pustaka yang sudah tersedia; Caveman untuk komunikasi singkat; Sites untuk publikasi. Figma, Superdesign, dan Product Design telah dipertimbangkan; tidak dibuat dokumen atau kanvas baru karena pekerjaan ini berfokus pada animasi website yang sudah ada.


# 08 — Memahami animasi dan mencari masalahnya

## Dua sistem gerak

Pembuka kopi memakai `intro-timeline.js`, `intro-controller.js`, `intro.css`, dan SVG di `index.html`. Halaman aplikasi memakai `motion.js` dan `motion.css`. Rombakan total pembuka belum dilakukan pada revisi terakhir.

GSAP 3.15.1 tersedia di `website/vendor/`. Tidak ada kebutuhan MP4, layanan video, atau koneksi GSAP eksternal untuk memainkan animasi website.

## Urutan pergantian halaman

1. `render()` menghentikan gerakan halaman lama melalui `stopPage()`.
2. Konten baru dibuat, lalu `enter()` membaca kelompok halaman, arah navigasi, ukuran layar, dan preferensi gerak.
3. Tirai tiga lapis masuk, menutup, lalu membuka melalui sumbu berbeda. Total sekitar 710 milidetik.
4. Tulisan adegan muncul dan menghilang. Judul halaman mulai masuk pada detik 0,4, setelah tirai mulai membuka pada detik 0,3.
5. Kata judul berurutan dengan jeda 55 milidetik. Kartu mulai masuk setelah jeda 480 milidetik.
6. Grafik terisi; kartu di bawah area pandang bergerak sekali ketika masuk layar.

Sumbu adalah arah: x mendatar, y vertikal. Halaman memakai kombinasi berbeda supaya pergantian terasa seperti adegan, bukan semua elemen bergerak seragam.

## HP dan desktop

Pada lebar maksimal 720 px, jarak kartu mendatar 72 px dan gerak vertikal paling jauh 85 px, durasi 680 ms, serta selisih waktu keseluruhan antarkartu maksimal 160 ms. Pada desktop, jarak mendatar 150 px dan durasi kartu 820 ms. Nilai ini adalah konfigurasi kode, bukan hasil pengukuran performa perangkat.

Tombol dan tab pada pointer sentuh mengecil ke skala 0,94 saat aktif, kemudian kembali. Ini memakai CSS `:active`; tidak ada penangkapan sentuhan atau pencegahan gulir untuk efek itu. Tilt mengikuti mouse hanya saat perangkat mendukung hover dan pointer presisi. HP tidak menjalankan tilt mouse tersebut.

Gerakan baru memakai transform dan opacity. Tidak ada penambahan blur yang dianimasikan. CSS lama masih mempunyai dekorasi lain; performa keseluruhan tetap perlu diuji di perangkat nyata.

## Mode ringan dan aksesibilitas

Tombol Gerak penuh/Gerak ringan menyimpan pilihan di `ruang-kopi-motion`. Jika perangkat meminta `prefers-reduced-motion`, mode ringan dipaksakan dan tombol dinonaktifkan. Judul yang dipecah per kata tetap memiliki nama utuh untuk pembaca layar.

Fokus ke kontrol di halaman menghentikan gerakan agar pengguna keyboard tidak perlu mengejar input bergerak. Fokus programatis ke wadah `#page` tidak menghentikan animasi masuk. Saat intro dimulai, animasi halaman berhenti; setelah intro berakhir, animasi halaman dapat berjalan lagi.

## Membersihkan animasi

`stopPage()` memutus IntersectionObserver, mengembalikan GSAP context/timeline, membatalkan frame pointer yang tertunda, mengosongkan pegangan tilt, dan menyembunyikan tirai. Ini penting saat pengguna berpindah menu cepat, mengganti intensitas, membuka intro, atau menyembunyikan tab.

`RKMotion.number()` membatalkan animasi angka sebelumnya. Nilai model tidak diubah. Jika pengguna memilih gerak ringan di tengah jalan, angka langsung selesai pada nilai yang benar.

## Jika ada masalah

| Gejala | Mulai periksa |
| --- | --- |
| Animasi penuh tidak terlihat | Tombol intensitas, reduced motion perangkat, dan apakah vendor GSAP berhasil dimuat |
| Kartu terlalu jauh bergerak di HP | Media query 720 px dan profil jarak di enter() |
| Judul tertutup tirai terlalu lama | Posisi waktu judul, akhir tirai, dan panjang teks |
| Animasi berhenti ketika mengisi | Ini disengaja pada fokus kontrol; pastikan tidak terjadi hanya karena fokus wadah halaman |
| Miring tertinggal setelah mouse keluar | Pembatalan requestAnimationFrame, pointerout, dan pengembalian quickTo |
| Nilai uang tampak salah | Bandingkan hasil calculate() dengan format tampilan; jangan mengubah rumus untuk memperbaiki animasi |
| Pembuka muncul lagi | Ketersediaan/penanda localStorage; jangan menghapus data usaha untuk menguji |
| Mengubah SVG tidak memengaruhi tampilan | SVG aktif tertanam di index.html; intro-scene.svg adalah salinan sumber |

Setelah perbaikan, jalankan `npm test`. Untuk masalah posisi atau kelancaran, tetap diperlukan browser nyata. Jangan menyamakan tes GSAP tiruan dengan rekaman animasi.


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


# 10 — Skill, plugin, dan hasil penggunaannya

## Prinsip

Pemilik meminta memakai skill yang dibutuhkan dan selalu menyebutkan skill yang benar-benar digunakan, terutama Ponytail dan Caveman. Permintaan itu tidak berarti semua plugin wajib digunakan untuk setiap perubahan. Jangan menghabiskan waktu membuat dokumen Figma, video, atau canvas yang tidak membantu tugas aktif.

Skill adalah panduan kerja untuk AI. Plugin menyediakan kemampuan tambahan melalui koneksi/alat. Menyalin folder skill tidak otomatis memasang layanan plugin atau memasukkan akun pengguna.

| Panduan atau alat | Peran dalam perjalanan proyek | Keadaan paket |
| --- | --- | --- |
| Ponytail | Perubahan terkecil yang menyelesaikan kebutuhan, membaca pemanggil dan menjaga pemeriksaan | AGENTS.md dan folder skill lokal disertakan |
| Caveman | Komunikasi singkat yang tetap jelas, bahasa Indonesia | Folder skill lokal disertakan; tidak berarti menulis bahasa rusak |
| UI/UX Pro Max | Hierarki, kontrol sentuh, fokus, label, dan desain | Disebut pada sesi terdahulu; berkas modul tidak ditemukan di checkout terakhir, tidak diklaim ikut terpasang |
| Claude SEO | Perbaikan metadata/on-page dan Schema.org pada tahap sebelumnya | Catatan hasil tersedia; paket skill lengkap tidak ditemukan pada checkout terakhir |
| HyperFrames/GSAP | Referensi timeline, stagger, transform, cleanup, dan quickTo; komposisi intro pada tahap lama | GSAP runtime lokal serta arsip komposisi lama disertakan |
| Superdesign | Dipertimbangkan untuk desain; catatan lama menyebut login belum selesai | Tidak ada canvas baru yang diklaim berhasil dibuat |
| Product Design | Panduan dipertimbangkan/dibaca | Tidak ada audit visual penuh baru melalui plugin yang diklaim selesai |
| Figma | Terlihat tersedia pada sesi terakhir, tetapi tidak diperlukan untuk perubahan motion langsung | Tidak ada file Figma baru; koneksi ChatGPT tidak ikut ZIP |
| Sites | Penyimpanan sumber dan publikasi situs privat | URL dan bukti status dicatat, kredensial tidak disertakan |

Catatan Antigravity asli menyebut pemasangan UI/UX Pro Max serta modul SEO di lingkungan sebelumnya. Hal itu tidak membuktikan modul tersebut ada di lingkungan baru. Salinan lokal yang ditemukan sekarang berisi Ponytail, ponytail-help/audit/gain/review/debt, dan Caveman.

## Asal skill lokal

- Ponytail: `https://github.com/DietrichGebert/ponytail`
- Caveman: `https://github.com/JuliusBrussee/caveman`
- UI/UX Pro Max yang pernah diminta: `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill`
- Claude SEO yang pernah diminta: `https://github.com/AgriciDaniel/claude-seo`

Skill disertakan sebagaimana ditemukan, tanpa klaim versi upstream terbaru. Header atribusi pada kode vendor dipertahankan. Jangan menganggap referensi plugin di dokumen mengaktifkan plugin secara otomatis.

## Untuk Antigravity

Baca `.agents/skills/ponytail/SKILL.md` dan `.agents/skills/caveman/SKILL.md` ketika relevan. Cara deteksi skill otomatis bergantung editor; bila tidak tampil pada daftar, file masih bisa dibaca secara eksplisit. Katakan skill apa yang dipakai dan hasilnya. Jika alat tidak tersedia, jelaskan batasnya lalu gunakan cara yang tersedia dalam lingkup tugas.

Pada pembuatan paket ini, Ponytail dipakai untuk mempertahankan kode sumber apa adanya dan mengemas bagian yang diperlukan. Caveman dipakai untuk pembaruan singkat. PDF/Word dibuat dengan pustaka dokumen yang sudah tersedia; tidak dibuat desain Figma atau video baru.


# Riwayat kode yang tersedia

Tanggal adalah tanggal commit di repositori. Catatan Antigravity terpisah tersedia di arsip-dokumen-lama/. Arsip tidak mengandung .git, token, konfigurasi Sites, atau node_modules. Jangan menimpa website/ terbaru memakai versi lama.

| Commit | Tanggal | Perubahan | Lokasi |
| --- | --- | --- | --- |
| `c1a63e0` | 2026-11-13 | Build interactive coffee shop planner prototype | c1a63e0.zip |
| `1d1ee13` | 2026-11-13 | Redesign planner with gradients, layered cards and live interactions | 1d1ee13.zip |
| `2f46c88` | 2026-11-13 | Redesign planner with gradients, layered cards and live interactions | 2f46c88.zip |
| `cbae29d` | 2026-11-13 | Simplify planner navigation and language; add glass styling and animated coffee intro | cbae29d.zip |
| `23bd386` | 2026-11-13 | Provide downloadable Antigravity handoff ZIP PDF and Word | Dokumentasi/unduhan; bukan perubahan aplikasi |
| `e861b4d` | 2026-11-14 | Simplify planning dashboard and preserve unreadable browser data | e861b4d.zip |
| `774fdbc` | 2026-11-14 | Redesign coffee planner as a responsive workbook with meaningful motion | 774fdbc.zip |
| `25fb6b8` | 2026-11-14 | Add directional scene transitions and kinetic motion with intensity controls | 25fb6b8.zip |
| `02d6140` | 2026-11-14 | Add directional scene transitions and kinetic motion with intensity controls | 02d6140.zip |
| `f9626d5` | 2026-11-14 | Add directional scene transitions and kinetic motion with intensity controls | website/ terbaru |


# Prompt siap ditempel ke Antigravity

Kamu melanjutkan proyek Ruang Kopi. Proyek sudah berjalan; jangan bangun ulang dari nol. Pemilik siswa kelas 10. Jelaskan dengan bahasa Indonesia sederhana, per poin bila membantu.

Baca berurutan: GEMINI.md, AGENTS.md, SERAH-TERIMA-CODEX.md, docs/01 sampai docs/10, lalu kode website/ dan tes pengujian/. Arsip-dokumen-lama/ adalah sejarah, bukan instruksi terbaru. Kode aktif berasal dari commit f9626d5c22faf16fd8acc12ea3988fc1bec6a3d7.

Yang terbaru: tampilan buku kerja kedai dengan Manrope/Fraunces, panel samping transparan yang bisa diperkecil, navigasi bawah pada HP, ringkasan lebih sederhana, grafik biaya/untung, perlindungan data browser rusak, dan animasi bergaya iklan. motion.js mengatur tirai menyilang dua sumbu, judul per kata, kartu berputar sedikit, scroll reveal, tilt mouse, angka berjalan, dan pilihan Gerak penuh/Gerak ringan. Gerakan HP lebih pendek; tombol merespons sentuhan memakai CSS. Enam kelompok tes lulus saat paket disusun. Kelancaran dan tampilan versi terbaru pada HP nyata belum diperiksa.

Keputusan pemilik: animasi boleh berani tetapi tetap jelas dan lancar pada HP. Rombakan total cangkir ditunda sampai dibahas. GitHub dikerjakan belakangan. Pertahankan HTML/CSS/JavaScript biasa. Jangan menambahkan emoji atau tombol penjelasan kode pada UI. Jangan mengganti rumus/fitur bisnis demi perubahan visual.

Lindungi kunci ruang-kopi-v3 dan format version:3. Jangan menghapus localStorage atau mengubah skema tanpa migrasi. Jangan menimpa data yang tidak terbaca dengan rencana kosong. Jangan menghitung ulang nilai uang transaksi lama memakai harga bahan baru. Backup JSON berbeda dari CSV. Situs masih frontend lokal; jangan mengaku ada backend/login admin/sinkronisasi.

Gunakan skill yang relevan dan sebutkan yang benar-benar dipakai. Ponytail dan Caveman ada di .agents/skills/. Plugin ChatGPT tidak otomatis terpasang di Antigravity. Jangan mengklaim menggunakan Figma, Superdesign, atau alat lain jika tidak benar-benar memanggilnya.

Jalankan npm ci --ignore-scripts, lalu npm test. Jika diminta mencoba UI dan alat tersedia, jalankan npm start lalu periksa desktop dan HP. Nyatakan pemeriksaan yang tidak bisa dilakukan. Jangan mengganti website/ memakai kode dalam riwayat-versi/.

Setelah membaca, berikan ringkasan singkat tentang fitur saat ini, batasan, hasil tes, dan satu prioritas berikutnya. Jika pemilik sudah memberi tugas baru, lanjutkan tugas itu. Jika belum, tanyakan bagian mana yang ingin diubah. Membaca paket bukan izin untuk merombak intro, mengganti teknologi, menerbitkan ke akun baru, atau membuka akses situs.
