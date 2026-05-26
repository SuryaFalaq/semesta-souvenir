<?php 
session_start();
$lang = $_SESSION['lang'] ?? 'id';

$translations = [
    'id' => [
        'nav' => ['home' => 'Beranda', 'about' => 'Tentang', 'products' => 'Produk', 'contact' => 'Kontak'],
        'hero' => ['title' => 'Semesta Souvenir', 'subtitle' => 'Elegant & Premium'],
        'btn' => ['products' => 'Lihat Produk', 'contact' => 'Hubungi Kami']
    ],
    'en' => [
        'nav' => ['home' => 'Home', 'about' => 'About', 'products' => 'Products', 'contact' => 'Contact'],
        'hero' => ['title' => 'Semesta Souvenir', 'subtitle' => 'Elegant & Premium'],
        'btn' => ['products' => 'View Products', 'contact' => 'Contact Us']
    ]
];

$current_page = basename($_SERVER['PHP_SELF'], '.php');
?>
<!DOCTYPE html>
<html lang="<?= $lang ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Semesta Souvenir</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<nav class="navbar">
    <div class="container">
        <a href="index.php" class="logo">SEMESTA</a>
        <ul class="nav-links">
            <li><a href="index.php" class="<?= $current_page == 'index' ? 'active' : '' ?>"><?= $translations[$lang]['nav']['home'] ?></a></li>
            <li><a href="about.php" class="<?= $current_page == 'about' ? 'active' : '' ?>"><?= $translations[$lang]['nav']['about'] ?></a></li>
            <li><a href="products.php" class="<?= $current_page == 'products' ? 'active' : '' ?>"><?= $translations[$lang]['nav']['products'] ?></a></li>
            <li><a href="contact.php" class="<?= $current_page == 'contact' ? 'active' : '' ?>"><?= $translations[$lang]['nav']['contact'] ?></a></li>
        </ul>
        <a href="?lang=<?= $lang == 'id' ? 'en' : 'id' ?>" class="lang-switch"><?= strtoupper($lang) ?></a>
    </div>
</nav>