<?php
session_start();
if (isset($_GET['lang'])) {
    $_SESSION['lang'] = $_GET['lang'];
}
$lang = $_SESSION['lang'] ?? 'id';

require 'config/database.php';

function getImageUrl($path) {
    if (empty($path)) return '../public/img/placeholder.jpg';
    if (strpos($path, '/img/') === 0) {
        $file = basename($path);
        return '../public/img/' . $file;
    }
    if (strpos($path, '../public/img/') !== false) {
        return $path;
    }
    if (strpos($path, '/') === 0) {
        $file = basename($path);
        return '../public/img/' . $file;
    }
    return $path;
}

// Debug: cek path produk untuk troubleshooting
// error_log("Image path: " . print_r($products, true));

$stmt = $pdo->query("SELECT * FROM products ORDER BY id ASC");
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

$translations = [
    'id' => [
        'hero_subtitle' => 'Elegant & Premium',
        'hero_title' => 'Semesta Souvenir',
        'hero_desc' => 'Mitra terpercaya Anda untuk souvenir berkualitas tinggi dan merchandise custom yang meninggalkan kesan tak terlupakan.',
        'hero_cta' => 'Lihat Produk',
        'hero_cta2' => 'Hubungi Kami',
        'features_title' => 'Mengapa Memilih Kami',
        'features' => [
            ['title' => 'Kualitas Premium', 'desc' => 'Material terbaik untuk produk yang tahan lama.'],
            ['title' => 'Desain Custom', 'desc' => 'Setiap produk dapat disesuaikan dengan brand Anda.'],
            ['title' => 'Harga Kompetitif', 'desc' => 'Kualitas terbaik dengan harga bersaing.'],
            ['title' => 'Pengiriman Tepat', 'desc' => 'Komitmen pengiriman sesuai jadwal.']
        ],
        'products_subtitle' => 'Koleksi Souvenir Premium',
        'products_title' => 'Produk Kami',
        'cta_title' => 'Siap Membuat Souvenir Impian Anda?',
        'cta_desc' => 'Hubungi kami sekarang dan wujudkan souvenir berkualitas untuk acara Anda.'
    ],
    'en' => [
        'hero_subtitle' => 'Elegant & Premium',
        'hero_title' => 'Semesta Souvenir',
        'hero_desc' => 'Your trusted partner for high-quality souvenirs and custom merchandise that leave a lasting impression.',
        'hero_cta' => 'View Products',
        'hero_cta2' => 'Contact Us',
        'features_title' => 'Why Choose Us',
        'features' => [
            ['title' => 'Premium Quality', 'desc' => 'Best materials for durable products.'],
            ['title' => 'Custom Design', 'desc' => 'Every product can be customized to your brand.'],
            ['title' => 'Competitive Price', 'desc' => 'Best quality at competitive prices.'],
            ['title' => 'On-Time Delivery', 'desc' => 'Committed to on-time delivery.']
        ],
        'products_subtitle' => 'Premium Souvenir Collection',
        'products_title' => 'Our Products',
        'cta_title' => 'Ready to Create Your Dream Souvenirs?',
        'cta_desc' => 'Contact us now and create quality souvenirs for your event.'
    ]
];

$t = $translations[$lang];
$current_page = 'index';
?>
<!DOCTYPE html>
<html lang="<?= $lang ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Semesta Souvenir - <?= $lang == 'id' ? 'Beranda' : 'Home' ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<nav class="navbar">
    <div class="container">
        <a href="index.php" class="logo">SEMESTA</a>
        <ul class="nav-links">
            <li><a href="index.php" class="<?= $current_page == 'index' ? 'active' : '' ?>"><?= $lang == 'id' ? 'Beranda' : 'Home' ?></a></li>
            <li><a href="about.php"><?= $lang == 'id' ? 'Tentang' : 'About' ?></a></li>
            <li><a href="products.php"><?= $lang == 'id' ? 'Produk' : 'Products' ?></a></li>
            <li><a href="contact.php"><?= $lang == 'id' ? 'Kontak' : 'Contact' ?></a></li>
        </ul>
        <div style="display: flex; align-items: center; gap: 12px;">
            <a href="?lang=<?= $lang == 'id' ? 'en' : 'id' ?>" class="lang-switch"><?= strtoupper($lang) ?></a>
            <div class="menu-toggle" onclick="toggleMenu()">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</nav>
<script>
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}
</script>

<section class="hero">
    <div class="container">
        <div class="hero-content">
            <p class="subtitle"><?= $t['hero_subtitle'] ?></p>
            <h1><?= $t['hero_title'] ?></h1>
            <p><?= $t['hero_desc'] ?></p>
            <div class="hero-buttons">
                <a href="products.php" class="btn btn-primary"><?= $t['hero_cta'] ?> →</a>
                <a href="contact.php" class="btn btn-secondary"><?= $t['hero_cta2'] ?></a>
            </div>
        </div>
        <div class="hero-image">
            <div class="card">
                <img src="../public/img/tas imlek.jpg" alt="Semesta Souvenir">
                <div class="card-text">
                    <span>Premium Quality</span>
                    <h3>Souvenir Berkualitas</h3>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="features">
    <div class="container">
        <h2><?= $t['features_title'] ?></h2>
        <div class="divider"></div>
        <div class="features-grid">
            <?php foreach ($t['features'] as $f): ?>
            <div class="feature-card">
                <div class="feature-icon">★</div>
                <h3><?= $f['title'] ?></h3>
                <p><?= $f['desc'] ?></p>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<section class="products-preview">
    <div class="container">
        <div class="section-header">
            <div>
                <p><?= $t['products_subtitle'] ?></p>
                <h2><?= $t['products_title'] ?></h2>
            </div>
            <a href="products.php" class="btn btn-secondary"><?= $lang == 'id' ? 'Lihat Semua' : 'View All' ?> →</a>
        </div>
        <div class="products-grid">
            <?php foreach ($products as $p): ?>
            <a href="product.php?id=<?= $p['id'] ?>" class="product-card">
                <img src="<?= getImageUrl($p['image']) ?>" alt="<?= $p['name_'.$lang] ?>">
                <div class="product-card-content">
                    <h3><?= $p['name_'.$lang] ?></h3>
                    <p><?= substr($p['description_'.$lang], 0, 80) ?>...</p>
                </div>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<section class="cta">
    <div class="container">
        <h2><?= $t['cta_title'] ?></h2>
        <p><?= $t['cta_desc'] ?></p>
        <a href="contact.php" class="btn btn-secondary"><?= $lang == 'id' ? 'Hubungi Kami' : 'Contact Us' ?> →</a>
    </div>
</section>

<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div>
                <h3>SEMESTA</h3>
                <p class="brand-desc"><?= $lang == 'id' ? 'Mitra terpercaya Anda untuk souvenir berkualitas tinggi dan merchandise custom.' : 'Your trusted partner for high-quality souvenirs and custom merchandise.' ?></p>
            </div>
            <div>
                <h3><?= $lang == 'id' ? 'Menu' : 'Menu' ?></h3>
                <ul>
                    <li><a href="index.php"><?= $lang == 'id' ? 'Beranda' : 'Home' ?></a></li>
                    <li><a href="about.php"><?= $lang == 'id' ? 'Tentang Kami' : 'About Us' ?></a></li>
                    <li><a href="products.php"><?= $lang == 'id' ? 'Produk' : 'Products' ?></a></li>
                    <li><a href="contact.php"><?= $lang == 'id' ? 'Kontak' : 'Contact' ?></a></li>
                </ul>
            </div>
            <div>
                <h3><?= $lang == 'id' ? 'Produk' : 'Products' ?></h3>
                <ul>
                    <li><a href="products.php"><?= $lang == 'id' ? 'Tas Custom' : 'Custom Bags' ?></a></li>
                    <li><a href="products.php"><?= $lang == 'id' ? 'Sticker' : 'Stickers' ?></a></li>
                    <li><a href="products.php"><?= $lang == 'id' ? 'Topi Pesta' : 'Party Hats' ?></a></li>
                    <li><a href="products.php"><?= $lang == 'id' ? 'Banner' : 'Banners' ?></a></li>
                </ul>
            </div>
            <div>
                <h3><?= $lang == 'id' ? 'Kontak' : 'Contact' ?></h3>
                <ul>
                    <li class="contact-item">📍 Kudus, Jawa Tengah</li>
                    <li class="contact-item">📞 +62 858 6901 5609</li>
                    <li class="contact-item">✉️ semestasouvenir@gmail.com</li>
                    <li class="contact-item">📷 @semestasouvenirofficial</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            © 2026 <span>Semesta Souvenir</span>. <?= $lang == 'id' ? 'Hak Cipta Dilindungi.' : 'All Rights Reserved.' ?>
        </div>
    </div>
</footer>
        <div class="footer-bottom">
            © 2026 Semesta Souvenir. <?= $lang == 'id' ? 'Hak Cipta Dilindungi.' : 'All Rights Reserved.' ?>
        </div>
    </div>
</footer>
</body>
</html>