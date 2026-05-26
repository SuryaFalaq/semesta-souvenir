<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: login.php');
    exit;
}

require '../config/database.php';

$products = $pdo->query("SELECT * FROM products ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
$messages = $pdo->query("SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 10")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Semesta Souvenir</title>
    <link rel="stylesheet" href="../style.css">
    <style>
        .admin-layout { display: flex; min-height: 100vh; }
        .sidebar { width: 260px; background: #1e1919; color: white; padding: 24px; flex-shrink: 0; position: fixed; height: 100vh; overflow-y: auto; }
        .sidebar h2 { font-size: 20px; margin-bottom: 32px; }
        .sidebar ul { list-style: none; }
        .sidebar li { margin-bottom: 4px; }
        .sidebar a { display: block; padding: 12px 16px; border-radius: 8px; color: white; transition: background 0.3s; text-decoration: none; }
        .sidebar a:hover, .sidebar a.active { background: #61525a; }
        .main-content { flex: 1; padding: 32px; background: #f7f5f2; overflow-y: auto; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .stat-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 48px; }
        .stat-card { background: white; padding: 24px; border-radius: 16px; }
        .stat-card h3 { font-size: 14px; color: #736c64; margin-bottom: 8px; }
        .stat-card p { font-size: 32px; font-weight: 700; }
        .table-wrapper { background: white; border-radius: 16px; padding: 24px; }
        .table-wrapper h3 { margin-bottom: 24px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #f7f5f2; }
        th { font-weight: 600; color: #61525a; font-size: 14px; }
        .btn-sm { padding: 6px 12px; font-size: 12px; }
        .btn-danger { background: #dc2626; color: white; }
    </style>
</head>
<body>
    <div class="admin-layout">
        <aside class="sidebar">
            <h2>SEMESTA Admin</h2>
            <ul>
                <li><a href="index.php" class="active">Dashboard</a></li>
                <li><a href="products.php">Produk</a></li>
                <li><a href="orders.php">Pemesanan</a></li>
                <li><a href="login.php?logout=1">Logout</a></li>
            </ul>
        </aside>
        <main class="main-content">
            <div class="admin-header">
                <h1>Dashboard</h1>
                <p>Halo, <strong><?= $_SESSION['admin_user'] ?></strong></p>
            </div>
            <div class="stat-cards">
                <div class="stat-card">
                    <h3>Total Produk</h3>
                    <p><?= count($products) ?></p>
                </div>
                <div class="stat-card">
                    <h3>Pemesanan</h3>
                    <p><?= count($messages) ?></p>
                </div>
                <div class="stat-card">
                    <h3>Kategori</h3>
                    <p><?= $pdo->query("SELECT COUNT(*) FROM categories")->fetchColumn() ?></p>
                </div>
            </div>
            <div class="table-wrapper">
                <h3>Pemesanan Terbaru</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Telepon</th>
                            <th>Produk</th>
                            <th>Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($messages as $m): ?>
                        <tr>
                            <td><?= $m['name'] ?></td>
                            <td><?= $m['email'] ?></td>
                            <td><?= $m['phone'] ?></td>
                            <td><?= $m['product'] ?? '-' ?></td>
                            <td><?= date('d/m/Y', strtotime($m['created_at'])) ?></td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</body>
</html>