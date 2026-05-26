<?php
session_start();
if (isset($_GET['lang'])) {
    $_SESSION['lang'] = $_GET['lang'];
}
$lang = $_SESSION['lang'] ?? 'id';

$translations = [
    'id' => ['title' => 'Tentang Kami', 'subtitle' => 'Mitra Souvenir Premium', 'desc' => 'Semesta Souvenir adalah perusahaan manufaktur souvenir di Kudus, Jawa Tengah. Kami berpengalaman memproduksi berbagai souvenir berkualitas untuk acara perusahaan, seminar, hingga perayaan pribadi.', 'vision_title' => 'Visi', 'vision' => 'Menjadi penyedia souvenir premium terdepan dengan produk berkualitas tinggi.', 'mission_title' => 'Misi', 'mission' => 'Menyediakan produk berkualitas dengan desain inovasi dan harga kompetitif.', 'values_title' => 'Nilai-nilai', 'values' => ['Kualitas', 'Inovasi', 'Integritas', 'Kepuasan Pelanggan']],
    'en' => ['title' => 'About Us', 'subtitle' => 'Premium Souvenir Partner', 'desc' => 'Semesta Souvenir is a souvenir manufacturing company in Kudus, Central Java. We have experience producing quality souvenirs for corporate events, seminars, and personal celebrations.', 'vision_title' => 'Vision', 'vision' => 'To become the leading premium souvenir provider with high-quality products.', 'mission_title' => 'Mission', 'mission' => 'To provide quality products with innovative design and competitive prices.', 'values_title' => 'Values', 'values' => ['Quality', 'Innovation', 'Integrity', 'Customer Satisfaction']]
];
$t = $translations[$lang];
?>
<!DOCTYPE html>
<html lang="<?= $lang ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $t['title'] ?> - Semesta Souvenir</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<nav class="navbar">
    <div class="container">
        <a href="index.php" class="logo">SEMESTA</a>
        <ul class="nav-links">
            <li><a href="index.php"><?= $lang == 'id' ? 'Beranda' : 'Home' ?></a></li>
            <li><a href="about.php" class="active"><?= $lang == 'id' ? 'Tentang' : 'About' ?></a></li>
            <li><a href="products.php"><?= $lang == 'id' ? 'Produk' : 'Products' ?></a></li>
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
    <div class="container" style="max-width: 900px;">
        <div style="background: white; padding: 48px; border-radius: 24px; margin-bottom: 32px;">
            <h2 style="font-size: 32px; margin-bottom: 24px;"><?= $t['vision_title'] ?></h2>
            <p style="color: #736c64; font-size: 18px;"><?= $t['vision'] ?></p>
        </div>
        <div style="background: white; padding: 48px; border-radius: 24px; margin-bottom: 32px;">
            <h2 style="font-size: 32px; margin-bottom: 24px;"><?= $t['mission_title'] ?></h2>
            <p style="color: #736c64; font-size: 18px;"><?= $t['mission'] ?></p>
        </div>
        <div style="background: #f7f5f2; padding: 48px; border-radius: 24px;">
            <h2 style="font-size: 32px; margin-bottom: 24px;"><?= $t['values_title'] ?></h2>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
                <?php foreach ($t['values'] as $v): ?>
                <div style="text-align: center;">
                    <div style="width: 80px; height: 80px; background: #1e1919; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 24px;"><?= substr($v, 0, 1) ?></div>
                    <p><?= $v ?></p>
                </div>
                <?php endforeach; ?>
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