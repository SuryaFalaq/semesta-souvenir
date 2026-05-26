<?php
session_start();
if (isset($_GET['lang'])) {
    $_SESSION['lang'] = $_GET['lang'];
}
$lang = $_SESSION['lang'] ?? 'id';
$success = false;
$selected_product = $_GET['product'] ?? '';

require 'config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $pdo->prepare("INSERT INTO contact_messages (name, email, phone, product, quantity, message) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $_POST['name'],
        $_POST['email'],
        $_POST['phone'],
        $_POST['product'] ?? null,
        $_POST['quantity'] ?? null,
        $_POST['message'] ?? ''
    ]);
    $success = true;
}

$stmt = $pdo->query("SELECT name_id, name_en FROM products");
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

$translations = [
    'id' => [
        'title' => 'Hubungi Kami', 'subtitle' => 'Siap Membantu',
        'desc' => 'Jangan ragu untuk menghubungi kami untuk konsultasi atau pemesanan.',
        'form' => ['name' => 'Nama Lengkap', 'email' => 'Email', 'phone' => 'Telepon', 'product' => 'Produk', 'quantity' => 'Jumlah', 'message' => 'Pesan', 'submit' => 'Kirim Pesanan', 'success' => 'Pesan Terkirim!'],
        'info' => ['address' => 'Alamat', 'phone' => 'Telepon', 'email' => 'Email', 'social' => 'Social']
    ],
    'en' => [
        'title' => 'Contact Us', 'subtitle' => 'Ready to Help',
        'desc' => 'Feel free to contact us for consultation or orders.',
        'form' => ['name' => 'Full Name', 'email' => 'Email', 'phone' => 'Phone', 'product' => 'Product', 'quantity' => 'Quantity', 'message' => 'Message', 'submit' => 'Submit', 'success' => 'Message Sent!'],
        'info' => ['address' => 'Address', 'phone' => 'Phone', 'email' => 'Email', 'social' => 'Social']
    ]
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
            <li><a href="about.php"><?= $lang == 'id' ? 'Tentang' : 'About' ?></a></li>
            <li><a href="products.php"><?= $lang == 'id' ? 'Produk' : 'Products' ?></a></li>
            <li><a href="contact.php" class="active"><?= $lang == 'id' ? 'Kontak' : 'Contact' ?></a></li>
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

<section class="contact-section">
    <div class="container">
        <div class="contact-grid">
            <div class="contact-info">
                <h2><?= $lang == 'id' ? 'Info Kontak' : 'Contact Info' ?></h2>
                <div class="contact-item">
                    <div class="contact-icon">📍</div>
                    <div>
                        <h4><?= $t['info']['address'] ?></h4>
                        <p>Kudus, Jawa Tengah, Indonesia</p>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">📞</div>
                    <div>
                        <h4><?= $t['info']['phone'] ?></h4>
                        <p>+62 858 6901 5609</p>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">✉️</div>
                    <div>
                        <h4><?= $t['info']['email'] ?></h4>
                        <p>semestasouvenir@gmail.com</p>
                    </div>
                </div>
                <div class="contact-item">
                    <div class="contact-icon">📷</div>
                    <div>
                        <h4><?= $t['info']['social'] ?></h4>
                        <p>@semestasouvenirofficial</p>
                    </div>
                </div>
                <a href="https://wa.me/6285869015609" target="_blank" class="whatsapp-btn">
                    <span>💬</span> <?= $lang == 'id' ? 'Chat WhatsApp' : 'Chat WhatsApp' ?>
                </a>
            </div>
            <div class="contact-form">
                <?php if ($success): ?>
                <div class="form-success">
                    <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
                    <h3><?= $t['form']['success'] ?></h3>
                    <p><?= $lang == 'id' ? 'Kami akan menghubungi Anda segera.' : 'We will contact you soon.' ?></p>
                </div>
                <?php else: ?>
                <h2><?= $lang == 'id' ? 'Form Pemesanan' : 'Order Form' ?></h2>
                <form method="POST">
                    <div class="form-row">
                        <div class="form-group">
                            <label><?= $t['form']['name'] ?></label>
                            <input type="text" name="name" required placeholder="<?= $t['form']['name'] ?>">
                        </div>
                        <div class="form-group">
                            <label><?= $t['form']['email'] ?></label>
                            <input type="email" name="email" required placeholder="<?= $t['form']['email'] ?>">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label><?= $t['form']['phone'] ?></label>
                            <input type="tel" name="phone" required placeholder="<?= $t['form']['phone'] ?>">
                        </div>
                        <div class="form-group">
                            <label><?= $t['form']['quantity'] ?></label>
                            <input type="number" name="quantity" min="1" placeholder="<?= $t['form']['quantity'] ?>">
                        </div>
                    </div>
                    <div class="form-group">
                        <label><?= $t['form']['product'] ?></label>
                        <select name="product">
                            <option value=""><?= $lang == 'id' ? 'Pilih produk...' : 'Select product...' ?></option>
                            <?php foreach ($products as $p): ?>
                            <option value="<?= $p['name_'.$lang] ?>" <?= $selected_product == $p['name_'.$lang] ? 'selected' : '' ?>><?= $p['name_'.$lang] ?></option>
                            <?php endforeach; ?>
                            <option value="Other" <?= $selected_product == 'Other' ? 'selected' : '' ?>><?= $lang == 'id' ? 'Lainnya' : 'Other' ?></option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><?= $t['form']['message'] ?></label>
                        <textarea name="message" rows="5" placeholder="<?= $lang == 'id' ? 'Deskripsikan detail pesanan...' : 'Describe your order...' ?>"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;"><?= $t['form']['submit'] ?> →</button>
                </form>
                <?php endif; ?>
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