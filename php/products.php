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
        return '../public' . $path;
    }
    if (strpos($path, '../') === 0) {
        return $path;
    }
    return $path;
}

$stmt = $pdo->query("SELECT * FROM products ORDER BY id ASC");
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

$translations = [
    'id' => [
        'title' => 'Produk Kami', 
        'subtitle' => 'Koleksi Souvenir Premium',
        'desc' => 'Temukan berbagai produk souvenir berkualitas untuk setiap momen spesial Anda.',
        'order' => 'Pesan Sekarang'
    ],
    'en' => [
        'title' => 'Our Products',
        'subtitle' => 'Premium Souvenir Collection',
        'desc' => 'Discover various quality souvenir products for every special moment.',
        'order' => 'Order Now'
    ]
];
$t = $translations[$lang];
?>
<!DOCTYPE html>
<html lang="<?= $lang ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produk - Semesta Souvenir</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<nav class="navbar">
    <div class="container">
        <a href="index.php" class="logo">SEMESTA</a>
        <ul class="nav-links">
            <li><a href="index.php"><?= $lang == 'id' ? 'Beranda' : 'Home' ?></a></li>
            <li><a href="about.php"><?= $lang == 'id' ? 'Tentang' : 'About' ?></a></li>
            <li><a href="products.php" class="active"><?= $lang == 'id' ? 'Produk' : 'Products' ?></a></li>
            <li><a href="contact.php"><?= $lang == 'id' ? 'Kontak' : 'Contact' ?></a></li>
        </ul>
        <a href="?lang=<?= $lang == 'id' ? 'en' : 'id' ?>" class="lang-switch"><?= strtoupper($lang) ?></a>
    </div>
</nav>

<section class="page-hero">
    <div class="container">
        <p><?= $t['subtitle'] ?></p>
        <h1><?= $t['title'] ?></h1>
        <p><?= $t['desc'] ?></p>
    </div>
</section>

<section class="products-section">
    <div class="container">
        <div class="all-products">
            <?php foreach ($products as $i => $p): ?>
            <div class="product-full" <?= $i == 0 ? 'style="grid-column: span 2;"' : '' ?>>
                <a href="product.php?id=<?= $p['id'] ?>">
                    <img src="<?= getImageUrl($p['image']) ?>" alt="<?= $p['name_'.$lang] ?>">
                </a>
                <div class="product-full-content">
                    <p class="category"><?= $p['category_name_'.$lang] ?? '' ?></p>
                    <h2><?= $p['name_'.$lang] ?></h2>
                    <p><?= $p['description_'.$lang] ?></p>
                    <a href="product.php?id=<?= $p['id'] ?>" class="btn btn-primary"><?= $t['order'] ?> →</a>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<section class="cta">
    <div class="container">
        <h2><?= $lang == 'id' ? 'Butuh Desain Custom?' : 'Need Custom Design?' ?></h2>
        <p><?= $lang == 'id' ? 'Kami siap membantu mewujudkan souvenir dengan desain khusus.' : 'We are ready to help create custom souvenirs.' ?></p>
        <a href="contact.php" class="btn btn-secondary"><?= $lang == 'id' ? 'Hubungi Kami' : 'Contact Us' ?> →</a>
    </div>
</section>

<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div>
                <h3>SEMESTA</h3>
                <p class="brand-desc"><?= $lang == 'id' ? 'Mitra terpercaya untuk souvenir berkualitas tinggi.' : 'Your trusted partner for quality souvenirs.' ?></p>
            </div>
            <div>
                <h3><?= $lang == 'id' ? 'Menu' : 'Menu' ?></h3>
                <ul>
                    <li><a href="index.php"><?= $lang == 'id' ? 'Beranda' : 'Home' ?></a></li>
                    <li><a href="about.php"><?= $lang == 'id' ? 'Tentang' : 'About' ?></a></li>
                    <li><a href="products.php"><?= $lang == 'id' ? 'Produk' : 'Products' ?></a></li>
                    <li><a href="contact.php"><?= $lang == 'id' ? 'Kontak' : 'Contact' ?></a></li>
                </ul>
            </div>
            <div>
                <h3><?= $lang == 'id' ? 'Kontak' : 'Contact' ?></h3>
                <ul>
                    <li class="contact-item">📍 Kudus, Jawa Tengah</li>
                    <li class="contact-item">📞 +62 858 6901 5609</li>
                    <li class="contact-item">✉️ semestasouvenir@gmail.com</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            © 2026 <span>Semesta Souvenir</span>. <?= $lang == 'id' ? 'Hak Cipta Dilindungi.' : 'All Rights Reserved.' ?>
        </div>
    </div>
</footer>
        <div class="footer-bottom">© 2026 Semesta Souvenir</div>
    </div>
</footer>
</body>
</html>