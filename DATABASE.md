# Dokumentasi Database Semesta Souvenir

## Overview
Database: `semesta_souvenir` (MySQL)

## Struktur Tabel

### 1. admins
Tabel untuk menyimpan data administrator/login.

| Kolom | Tipe | Keterangan |
|------|-----|------------|
| id | INT (PK, AUTO_INCREMENT) | ID unik admin |
| username | VARCHAR(50) | Username login (UNIQUE) |
| password | VARCHAR(255) | Password (plaintext/hash) |
| created_at | TIMESTAMP | Waktu pembuatan akun |

**Data Default:**
- Username: `admin`
- Password: `semesta123`

---

### 2. categories
Tabel untuk kategor produk (supports bilingual Indonesia-English).

| Kolom | Tipe | Keterangan |
|------|-----|------------|
| id | INT (PK, AUTO_INCREMENT) | ID unik kategori |
| name_id | VARCHAR(100) | Nama kategori (Indonesia) |
| name_en | VARCHAR(100) | Nama kategori (English) |
| description_id | TEXT | Deskripsi (Indonesia) |
| description_en | TEXT | Deskripsi (English) |
| created_at | TIMESTAMP | Waktu pembuatan |

**Kategori Default:**
1. Tas / Bags
2. Sticker / Stickers
3. Pesta / Party
4. Banner / Banners

---

### 3. products
Tabel untuk menampilkan produk.

| Kolom | Tipe | Keterangan |
|------|-----|------------|
| id | INT (PK, AUTO_INCREMENT) | ID unik produk |
| name_id | VARCHAR(200) | Nama produk (Indonesia) |
| name_en | VARCHAR(200) | Nama produk (English) |
| description_id | TEXT | Deskripsi (Indonesia) |
| description_en | TEXT | Deskripsi (English) |
| category_id | INT (FK) | Foreign key ke tabel categories |
| image | VARCHAR(255) | Path gambar produk |
| created_at | TIMESTAMP | Waktu pembuatan |

**Relasi:**
- `category_id` REFERENCES `categories(id)` ON DELETE SET NULL

---

### 4. contact_messages
Tabel untuk menyimpan pesan/order dari customer.

| Kolom | Tipe | Keterangan |
|------|-----|------------|
| id | INT (PK, AUTO_INCREMENT) | ID unik pesan |
| name | VARCHAR(100) | Nama pengirim |
| email | VARCHAR(100) | Email pengirim |
| phone | VARCHAR(20) | No. HP pengirim |
| product | VARCHAR(200) | Produk yang dipesan |
| quantity | INT | Jumlah pesanan |
| message | TEXT | Pesan tambahan |
| created_at | TIMESTAMP | Waktu pengiriman |

---

## Hubungan Antar Tabel

```
admins (1) ---- (0) contact_messages (0+)
    |
    +---- (0) categories (1) ---- (0) products (0+)
```

- `products.category_id` → `categories.id`

## Catatan
- Aplikasi menggunakan pendekatan bilingual (ID/EN)
- Password admin disimpan dalam bentuk plaintext (perlu diperbaiki untuk production)
- Gambar produk menggunakan path relatif dari `/img/`