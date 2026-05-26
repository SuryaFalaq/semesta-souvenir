-- Database untuk Semesta Souvenir
-- Import ini melalui phpMyAdmin

CREATE DATABASE IF NOT EXISTS semesta_souvenir;
USE semesta_souvenir;

CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_id VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    description_id TEXT,
    description_en TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_id VARCHAR(200) NOT NULL,
    name_en VARCHAR(200) NOT NULL,
    description_id TEXT NOT NULL,
    description_en TEXT NOT NULL,
    category_id INT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    product VARCHAR(200),
    quantity INT,
    status VARCHAR(20) DEFAULT 'Baru',
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admins (username, password) VALUES ('admin', 'semesta123');

INSERT INTO categories (name_id, name_en, description_id, description_en) VALUES
('Tas', 'Bags', 'Berbagai jenis tas custom', 'Various custom bags'),
('Sticker', 'Stickers', 'Sticker berkualitas tinggi', 'High quality stickers'),
('Pesta', 'Party', 'Aksesoris untuk kebutuhan pesta', 'Accessories for party needs'),
('Banner', 'Banners', 'Banner dan backdrop', 'Backdrops and banners');

INSERT INTO products (name_id, name_en, description_id, description_en, category_id, image) VALUES
('Tas Custom', 'Custom Bags', 'Tas berkualitas tinggi dengan desain custom sesuai kebutuhan Anda. Cocok untuk seminar, event perusahaan, dan berbagai acara.', 'High-quality bags with custom designs according to your needs. Perfect for seminars, corporate events, and various occasions.', 1, '/img/tas imlek.jpg'),
('Sticker', 'Stickers', 'Sticker berkualitas dengan berbagai ukuran dan bahan. Dapat dicetak dengan desain apapun sesuai keinginan.', 'Quality stickers in various sizes and materials. Can be printed with any design as you wish.', 2, '/img/stk.jpg'),
('Topi Ulang Tahun', 'Birthday Hats', 'Topi pesta ulang tahun dengan berbagai desain menarik. Tambahkan kesan meriah pada perayaan Anda.', 'Birthday party hats with various attractive designs. Add a festive touch to your celebrations.', 3, '/img/topi.jpg'),
('Backdrop / Banner', 'Backdrop / Banner', 'Backdrop dan banner berkualitas untuk berbagai acara. Cetak dengan resolusi tinggi dan bahan premium.', 'Quality backdrops and banners for various events. Printed with high resolution and premium materials.', 4, '/img/bd.jpeg');
