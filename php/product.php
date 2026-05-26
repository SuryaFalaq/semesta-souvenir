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
    if (strpos($path, '../') === 0) {
        return $path;
    }
    if (strpos($path, '/') === 0) {
        $file = basename($path);
        return '../public/img/' . $file;
    }
    return $path;
}

$product_id = $_GET['id'] ?? 0;
$stmt = $pdo->prepare("SELECT p.*, c.name_id as cat_name_id, c.name_en as cat_name_en FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?");
$stmt->execute([$product_id]);
$product = $stmt->fetch();

if (!$product) {
    header('Location: products.php');
    exit;
}

$translations = [
    'id' => ['title' => 'Detail Produk', 'order' => 'Pesan Sekarang', 'select_product' => 'Pilih Produk'],
    'en' => ['title' => 'Product Detail', 'order' => 'Order Now', 'select_product' => 'Select Product']
];
$t = $translations[$lang];
?>
<!DOCTYPE html>
<html lang="<?= $lang ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $product['name_'.$lang] ?> - Semesta Souvenir</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .product-detail { padding: 48px 0; }
        .product-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        .product-detail-image img { width: 100%; border-radius: 24px; }
        .product-detail-info h1 { font-size: 40px; margin-bottom: 16px; }
        .product-detail-info .category { color: #61525a; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
        .product-detail-info .price { font-size: 32px; font-weight: 700; margin-bottom: 24px; }
        .product-detail-info .description { color: #736c64; font-size: 18px; line-height: 1.8; margin-bottom: 32px; }
        .product-detail-info .btn { width: 100%; justify-content: center; }
    </style>
</head>
<body>
<nav class="navbar">
    <div class="container">
        <a href="index.php" class="logo">SEMESTA</a>
        <ul class="nav-links">
            <li><a href="index.php"><?= $lang == 'id' ? 'Beranda' : 'Home' ?></a></li>
            <li><a href="about.php"><?= $lang == 'id' ? 'Tentang' : 'About' ?></a></li>
            <li><a href="products.php"><?= $lang == 'id' ? 'Produk' : 'Products' ?></a></li>
            <li><a href="contact.php"><?= $lang == 'id' ? 'Kontak' : 'Contact' ?></a></li>
        </ul>
        <a href="?lang=<?= $lang == 'id' ? 'en' : 'id' ?>" class="lang-switch"><?= strtoupper($lang) ?></a>
    </div>
</nav>

<section class="products-section">
    <div class="container">
        <div class="product-detail-grid">
            <div class="product-detail-image">
                <img src="<?= getImageUrl($product['image']) ?>" alt="<?= $product['name_'.$lang] ?>">
            </div>
            <div class="product-detail-info">
                <p class="category"><?= $product['cat_name_'.$lang] ?? '' ?></p>
                <h1><?= $product['name_'.$lang] ?></h1>
                <p class="description"><?= $product['description_'.$lang] ?></p>
                <a href="contact.php?product=<?= urlencode($product['name_'.$lang]) ?>" class="btn btn-primary"><?= $t['order'] ?> →</a>
            </div>
        </div>
    </div>
</section>

<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div><h3>SEMESTA</h3><p><?= $lang == 'id' ? 'Souvenir berkualitas.' : 'Quality souvenirs.' ?></p></div>
            <div><h3>Link</h3><ul><li><a href="index.php"><?= $lang == 'id' ? 'Beranda' : 'Home' ?></a></li><li><a href="products.php"><?= $lang == 'id' ? 'Produk' : 'Products' ?></a></li></ul></div>
            <div><h3>Kontak</h3><ul><li>+62 858 6901 5609</li><li>semestasouvenir@gmail.com</li></ul></div>
        </div>
        <div class="footer-bottom">© 2026 Semesta Souvenir</div>
    </div>
</footer>
</body>
</html>