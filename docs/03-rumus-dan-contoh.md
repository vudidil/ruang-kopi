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
