<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: login.php');
    exit;
}

require '../config/database.php';

$success = $_GET['success'] ?? '';

// DELETE
if (isset($_POST['delete'])) {
    $pdo->prepare("DELETE FROM contact_messages WHERE id = ?")->execute([$_POST['id']]);
    header('Location: orders.php?success=delete');
    exit;
}

// UPDATE status
if (isset($_POST['update_status'])) {
    $pdo->prepare("UPDATE contact_messages SET status = ? WHERE id = ?")->execute([$_POST['status'], $_POST['id']]);
    header('Location: orders.php?success=update');
    exit;
}

$messages = $pdo->query("SELECT * FROM contact_messages ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelola Pesanan - Admin</title>
    <link rel="stylesheet" href="../style.css">
    <style>
        .admin-layout { display: flex; min-height: 100vh; }
        .sidebar { width: 260px; background: #1e1919; color: white; padding: 24px; flex-shrink: 0; position: fixed; height: 100vh; overflow-y: auto; }
        .sidebar h2 { font-size: 20px; margin-bottom: 32px; }
        .sidebar ul { list-style: none; }
        .sidebar a { display: block; padding: 12px 16px; border-radius: 8px; color: white; transition: background 0.3s; text-decoration: none; }
        .sidebar a:hover, .sidebar a.active { background: #61525a; }
        .main-content { flex: 1; padding: 32px; background: #f7f5f2; margin-left: 260px; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        table { width: 100%; border-collapse: collapse; background: white; border-radius: 16px; overflow: hidden; }
        th, td { padding: 16px; text-align: left; border-bottom: 1px solid #f7f5f2; vertical-align: top; }
        th { background: #f7f5f2; font-weight: 600; }
        .btn-sm { padding: 8px 16px; font-size: 12px; border-radius: 8px; text-decoration: none; display: inline-block; border: none; cursor: pointer; }
        .btn-danger { background: #dc2626; color: white; }
        .btn-view { background: #2563eb; color: white; }
        .success-msg { background: #d4edda; color: #155724; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
        .empty-state { text-align: center; padding: 48px; color: #736c64; }
        
        .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; }
        .status-barlu { background: #fef3c7; color: #92400e; }
        .status-diproses { background: #dbeafe; color: #1e40af; }
        .status-selesai { background: #d1fae5; color: #065f46; }
        .status-batal { background: #fee2e2; color: #991b1b; }
        
        .detail-modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; }
        .detail-modal.active { display: flex; align-items: center; justify-content: center; }
        .detail-content { background: white; padding: 32px; border-radius: 16px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; }
        .detail-content h2 { margin-bottom: 24px; }
        .detail-row { margin-bottom: 16px; }
        .detail-row strong { display: block; color: #61525a; font-size: 12px; margin-bottom: 4px; }
        .detail-row p { margin: 0; }
        .close-modal { float: right; cursor: pointer; font-size: 24px; }
    </style>
</head>
<body>
    <div class="admin-layout">
        <aside class="sidebar">
            <h2>SEMESTA Admin</h2>
            <ul>
                <li><a href="index.php">📊 Dashboard</a></li>
                <li><a href="products.php">📦 Produk</a></li>
                <li><a href="orders.php" class="active">📋 Pesanan</a></li>
                <li><a href="categories.php">🏷️ Kategori</a></li>
                <li><a href="login.php?logout=1">🚪 Logout</a></li>
            </ul>
        </aside>
        <main class="main-content">
            <div class="page-header">
                <h1>Kelola Pesanan</h1>
                <span style="color: #736c64;">Total: <?= count($messages) ?> pesanan</span>
            </div>
            
            <?php if ($success): ?>
            <div class="success-msg">
                <?php if ($success == 'delete'): ?>✅ Pesanan berhasil dihapus!
                <?php elseif ($success == 'update'): ?>✅ Status pesanan berhasil diupdate!
                <?php endif; ?>
            </div>
            <?php endif; ?>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Pelanggan</th>
                        <th>Produk</th>
                        <th>Jumlah</th>
                        <th>Status</th>
                        <th>Tanggal</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($messages)): ?>
                    <tr>
                        <td colspan="7" class="empty-state">Belum ada pesanan masuk.</td>
                    </tr>
                    <?php else: ?>
                    <?php foreach ($messages as $m): ?>
                    <tr>
                        <td>#<?= str_pad($m['id'], 4, '0', STR_PAD_LEFT) ?></td>
                        <td>
                            <strong><?= htmlspecialchars($m['name']) ?></strong><br>
                            <small style="color: #736c64;"><?= htmlspecialchars($m['email']) ?></small><br>
                            <small><?= htmlspecialchars($m['phone']) ?></small>
                        </td>
                        <td><?= htmlspecialchars($m['product'] ?? '-') ?></td>
                        <td><?= $m['quantity'] ?? '-' ?></td>
                        <td>
                            <form method="POST" style="display: inline;">
                                <input type="hidden" name="update_status" value="1">
                                <input type="hidden" name="id" value="<?= $m['id'] ?>">
                                <select name="status" onchange="this.form.submit()" style="padding: 4px 8px; border-radius: 4px; border: 1px solid #e5e5e5; font-size: 12px;">
                                    <option value="Baru" <?= ($m['status'] ?? 'Baru') == 'Baru' ? 'selected' : '' ?>>Baru</option>
                                    <option value="Diproses" <?= $m['status'] == 'Diproses' ? 'selected' : '' ?>>Diproses</option>
                                    <option value="Selesai" <?= $m['status'] == 'Selesai' ? 'selected' : '' ?>>Selesai</option>
                                    <option value="Batal" <?= $m['status'] == 'Batal' ? 'selected' : '' ?>>Batal</option>
                                </select>
                            </form>
                        </td>
                        <td>
                            <?= date('d/m/Y', strtotime($m['created_at'])) ?><br>
                            <small style="color: #736c64;"><?= date('H:i', strtotime($m['created_at'])) ?></small>
                        </td>
                        <td>
                            <button class="btn-sm btn-view" onclick="showDetail(<?= $m['id'] ?>)">👁️ Lihat</button>
                            <form method="POST" style="display: inline;">
                                <input type="hidden" name="delete" value="1">
                                <input type="hidden" name="id" value="<?= $m['id'] ?>">
                                <button type="submit" class="btn-sm btn-danger" onclick="return confirm('Yakin hapus pesanan ini?');">🗑️</button>
                            </form>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </main>
    </div>
    
    <!-- Detail Modal -->
    <div class="detail-modal" id="detail-modal" onclick="if(event.target === this) this.classList.remove('active')">
        <div class="detail-content">
            <span class="close-modal" onclick="document.getElementById('detail-modal').classList.remove('active')">&times;</span>
            <h2>Detail Pesanan #<span id="detail-id"></span></h2>
            <div class="detail-row">
                <strong>Nama Pelanggan</strong>
                <p id="detail-name"></p>
            </div>
            <div class="detail-row">
                <strong>Email</strong>
                <p id="detail-email"></p>
            </div>
            <div class="detail-row">
                <strong>Telepon</strong>
                <p id="detail-phone"></p>
            </div>
            <div class="detail-row">
                <strong>Produk</strong>
                <p id="detail-product"></p>
            </div>
            <div class="detail-row">
                <strong>Jumlah</strong>
                <p id="detail-quantity"></p>
            </div>
            <div class="detail-row">
                <strong>Pesan</strong>
                <p id="detail-message"></p>
            </div>
            <div class="detail-row">
                <strong>Tanggal Pesan</strong>
                <p id="detail-date"></p>
            </div>
        </div>
    </div>
    
    <script>
    const orders = <?= json_encode($messages) ?>;
    
    function showDetail(id) {
        const order = orders.find(o => o.id == id);
        if (order) {
            document.getElementById('detail-id').textContent = String(order.id).padStart(4, '0');
            document.getElementById('detail-name').textContent = order.name;
            document.getElementById('detail-email').textContent = order.email;
            document.getElementById('detail-phone').textContent = order.phone;
            document.getElementById('detail-product').textContent = order.product || '-';
            document.getElementById('detail-quantity').textContent = order.quantity || '-';
            document.getElementById('detail-message').textContent = order.message || '-';
            document.getElementById('detail-date').textContent = new Date(order.created_at).toLocaleString('id-ID');
            document.getElementById('detail-modal').classList.add('active');
        }
    }
    </script>
</body>
</html>