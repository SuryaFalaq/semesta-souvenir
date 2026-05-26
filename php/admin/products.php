<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: login.php');
    exit;
}

require '../config/database.php';

$categories = $pdo->query("SELECT * FROM categories ORDER BY id ASC")->fetchAll(PDO::FETCH_ASSOC);
$success = $_GET['success'] ?? '';
$error = $_GET['error'] ?? '';

// CREATE
if (isset($_POST['create'])) {
    $imagePath = '/img/placeholder.jpg';
    
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../../public/img/';
        $fileName = time() . '_' . basename($_FILES['image']['name']);
        $targetPath = $uploadDir . $fileName;
        
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            $imagePath = '/img/' . $fileName;
        }
    }
    
    try {
        $stmt = $pdo->prepare("INSERT INTO products (name_id, name_en, description_id, description_en, category_id, image) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $_POST['name_id'], $_POST['name_en'], 
            $_POST['description_id'], $_POST['description_en'],
            $_POST['category_id'] ?: null, 
            $imagePath
        ]);
        header('Location: products.php?success=create');
        exit;
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}

// UPDATE
if (isset($_POST['update'])) {
    $imagePath = $_POST['old_image'];
    
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../../public/img/';
        $fileName = time() . '_' . basename($_FILES['image']['name']);
        $targetPath = $uploadDir . $fileName;
        
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            $imagePath = '/img/' . $fileName;
        }
    }
    
    try {
        $stmt = $pdo->prepare("UPDATE products SET name_id=?, name_en=?, description_id=?, description_en=?, category_id=?, image=? WHERE id=?");
        $stmt->execute([
            $_POST['name_id'], $_POST['name_en'], 
            $_POST['description_id'], $_POST['description_en'],
            $_POST['category_id'] ?: null, 
            $imagePath,
            $_POST['id']
        ]);
        header('Location: products.php?success=update');
        exit;
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}

// DELETE
if (isset($_POST['delete'])) {
    $pdo->prepare("DELETE FROM products WHERE id = ?")->execute([$_POST['id']]);
    header('Location: products.php?success=delete');
    exit;
}

$products = $pdo->query("SELECT p.*, c.name_id as cat_name_id, c.name_en as cat_name_en FROM products p LEFT JOIN categories c ON p.category_id = c.id ORDER BY p.id DESC")->fetchAll(PDO::FETCH_ASSOC);
$edit_product = null;
if (isset($_GET['edit'])) {
    $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->execute([$_GET['edit']]);
    $edit_product = $stmt->fetch();
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelola Produk - Admin</title>
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
        .form-card { background: white; padding: 24px; border-radius: 16px; margin-bottom: 32px; }
        .form-card h3 { margin-bottom: 24px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; font-weight: 500; margin-bottom: 8px; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 12px; border: 1px solid #e5e5e5; border-radius: 8px; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; background: white; border-radius: 16px; overflow: hidden; }
        th, td { padding: 16px; text-align: left; border-bottom: 1px solid #f7f5f2; }
        th { background: #f7f5f2; font-weight: 600; }
        .btn-sm { padding: 8px 16px; font-size: 12px; border-radius: 8px; text-decoration: none; display: inline-block; }
        .btn-danger { background: #dc2626; color: white; border: none; cursor: pointer; }
        .btn-edit { background: #2563eb; color: white; }
        .btn-success { background: #16a34a; color: white; }
        .success-msg { background: #d4edda; color: #155724; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
        .error-msg { background: #f8d7da; color: #721c24; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
        .product-img { width: 60px; height: 60px; object-fit: cover; border-radius: 8px; }
        .empty-state { text-align: center; padding: 48px; color: #736c64; }
    </style>
</head>
<body>
    <div class="admin-layout">
        <aside class="sidebar">
            <h2>SEMESTA Admin</h2>
            <ul>
                <li><a href="index.php">📊 Dashboard</a></li>
                <li><a href="products.php" class="active">📦 Produk</a></li>
                <li><a href="orders.php">📋 Pesanan</a></li>
                <li><a href="categories.php">🏷️ Kategori</a></li>
                <li><a href="login.php?logout=1">🚪 Logout</a></li>
            </ul>
        </aside>
        <main class="main-content">
            <div class="page-header">
                <h1>Kelola Produk</h1>
                <button class="btn-sm btn-success" onclick="document.getElementById('form-tambah').scrollIntoView()">+ Tambah Produk</button>
            </div>
            
            <?php if ($success): ?>
            <div class="success-msg">
                <?php if ($success == 'create'): ?>✅ Produk berhasil ditambahkan!
                <?php elseif ($success == 'update'): ?>✅ Produk berhasil diupdate!
                <?php elseif ($success == 'delete'): ?>✅ Produk berhasil dihapus!
                <?php endif; ?>
            </div>
            <?php endif; ?>
            
            <?php if ($error): ?>
            <div class="error-msg">⚠️ Error: <?= $error ?></div>
            <?php endif; ?>
            
            <!-- Form Tambah/Edit Produk -->
            <div class="form-card" id="form-tambah">
                <h3><?= $edit_product ? 'Edit Produk' : 'Tambah Produk Baru' ?></h3>
                <form method="POST" enctype="multipart/form-data">
                    <?php if ($edit_product): ?>
                    <input type="hidden" name="update" value="1">
                    <input type="hidden" name="id" value="<?= $edit_product['id'] ?>">
                    <input type="hidden" name="old_image" value="<?= $edit_product['image'] ?>">
                    <?php else: ?>
                    <input type="hidden" name="create" value="1">
                    <?php endif; ?>
                    
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Nama (Indonesia) *</label>
                            <input type="text" name="name_id" required value="<?= $edit_product['name_id'] ?? '' ?>" placeholder="Nama produk Bahasa Indonesia">
                        </div>
                        <div class="form-group">
                            <label>Nama (English) *</label>
                            <input type="text" name="name_en" required value="<?= $edit_product['name_en'] ?? '' ?>" placeholder="Product name in English">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Deskripsi (Indonesia) *</label>
                        <textarea name="description_id" rows="3" required placeholder="Deskripsi produk"><?= $edit_product['description_id'] ?? '' ?></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Deskripsi (English) *</label>
                        <textarea name="description_en" rows="3" required placeholder="Product description"><?= $edit_product['description_en'] ?? '' ?></textarea>
                    </div>
                    
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Kategori</label>
                            <select name="category_id">
                                <option value="">Pilih Kategori</option>
                                <?php foreach ($categories as $c): ?>
                                <option value="<?= $c['id'] ?>" <?= $edit_product['category_id'] == $c['id'] ? 'selected' : '' ?>><?= $c['name_id'] ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Gambar Produk <?= $edit_product ? '(Opsional)' : '' ?></label>
                            <input type="file" name="image" accept="image/*" <?= $edit_product ? '' : 'required' ?>>
                            <?php if ($edit_product && $edit_product['image']): ?>
                            <p style="margin-top: 8px; font-size: 12px; color: #736c64;">Gambar saat ini: <?= basename($edit_product['image']) ?></p>
                            <?php endif; ?>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 12px;">
                        <?php if ($edit_product): ?>
                        <button type="submit" class="btn-sm btn-success">💾 Simpan Perubahan</button>
                        <a href="products.php" class="btn-sm" style="background: #6b7280; color: white;">Batal</a>
                        <?php else: ?>
                        <button type="submit" class="btn-sm btn-success">➕ Simpan Produk</button>
                        <?php endif; ?>
                    </div>
                </form>
            </div>
            
            <!-- Tabel Produk -->
            <table>
                <thead>
                    <tr>
                        <th>Gambar</th>
                        <th>Nama</th>
                        <th>Kategori</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($products)): ?>
                    <tr>
                        <td colspan="4" class="empty-state">Belum ada produk. Silakan tambah produk pertama Anda!</td>
                    </tr>
                    <?php else: ?>
                    <?php foreach ($products as $p): ?>
                    <tr>
                        <td>
                            <?php if ($p['image']): ?>
                            <img src="../../public/img/<?= basename($p['image']) ?>" class="product-img" alt="<?= $p['name_id'] ?>">
                            <?php else: ?>
                            <div class="product-img" style="background: #f7f5f2;"></div>
                            <?php endif; ?>
                        </td>
                        <td>
                            <strong><?= $p['name_id'] ?></strong><br>
                            <small style="color: #736c64;"><?= $p['name_en'] ?></small>
                        </td>
                        <td><?= $p['cat_name_id'] ?? '<span style="color: #736c64;">-</span>' ?></td>
                        <td>
                            <a href="products.php?edit=<?= $p['id'] ?>" class="btn-sm btn-edit">✏️ Edit</a>
                            <form method="POST" style="display: inline;">
                                <input type="hidden" name="delete" value="1">
                                <input type="hidden" name="id" value="<?= $p['id'] ?>">
                                <button type="submit" class="btn-sm btn-danger" onclick="return confirm('Yakin hapus produk <?= $p['name_id'] ?>?')">🗑️ Hapus</button>
                            </form>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </main>
    </div>
</body>
</html>