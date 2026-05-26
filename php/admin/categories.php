<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
    header('Location: login.php');
    exit;
}

require '../config/database.php';

$success = $_GET['success'] ?? '';
$error = $_GET['error'] ?? '';

// CREATE
if (isset($_POST['create'])) {
    $imagePath = null;
    
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../../public/img/categories/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $fileName = time() . '_' . basename($_FILES['image']['name']);
        $targetPath = $uploadDir . $fileName;
        
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            $imagePath = '/img/categories/' . $fileName;
        }
    }
    
    try {
        $stmt = $pdo->prepare("INSERT INTO categories (name_id, name_en, description_id, description_en, image) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $_POST['name_id'], $_POST['name_en'], 
            $_POST['description_id'] ?? '', $_POST['description_en'] ?? '',
            $imagePath
        ]);
        header('Location: categories.php?success=create');
        exit;
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}

// UPDATE
if (isset($_POST['update'])) {
    $imagePath = $_POST['old_image'] ?? null;
    
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = '../../public/img/categories/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $fileName = time() . '_' . basename($_FILES['image']['name']);
        $targetPath = $uploadDir . $fileName;
        
        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            $imagePath = '/img/categories/' . $fileName;
        }
    }
    
    try {
        $stmt = $pdo->prepare("UPDATE categories SET name_id=?, name_en=?, description_id=?, description_en=?, image=? WHERE id=?");
        $stmt->execute([
            $_POST['name_id'], $_POST['name_en'], 
            $_POST['description_id'] ?? '', $_POST['description_en'] ?? '',
            $imagePath,
            $_POST['id']
        ]);
        header('Location: categories.php?success=update');
        exit;
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
}

// DELETE
if (isset($_POST['delete'])) {
    // Set produk category_id ke null dulu sebelum hapus kategori
    $pdo->prepare("UPDATE products SET category_id = NULL WHERE category_id = ?")->execute([$_POST['id']]);
    $pdo->prepare("DELETE FROM categories WHERE id = ?")->execute([$_POST['id']]);
    header('Location: categories.php?success=delete');
    exit;
}

$categories = $pdo->query("SELECT * FROM categories ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
$edit_category = null;
if (isset($_GET['edit'])) {
    $stmt = $pdo->prepare("SELECT * FROM categories WHERE id = ?");
    $stmt->execute([$_GET['edit']]);
    $edit_category = $stmt->fetch();
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelola Kategori - Admin</title>
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
        .btn-add { background: #16a34a; color: white; }
        .success-msg { background: #d4edda; color: #155724; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
        .error-msg { background: #f8d7da; color: #721c24; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
        .empty-state { text-align: center; padding: 48px; color: #736c64; }
        .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
        .category-card { background: white; padding: 24px; border-radius: 16px; }
        .category-card h3 { margin-bottom: 8px; }
        .category-card .desc { color: #736c64; font-size: 14px; margin-bottom: 16px; }
    </style>
</head>
<body>
    <div class="admin-layout">
        <aside class="sidebar">
            <h2>SEMESTA Admin</h2>
            <ul>
                <li><a href="index.php">📊 Dashboard</a></li>
                <li><a href="products.php">📦 Produk</a></li>
                <li><a href="orders.php">📋 Pesanan</a></li>
                <li><a href="categories.php" class="active">🏷️ Kategori</a></li>
                <li><a href="login.php?logout=1">🚪 Logout</a></li>
            </ul>
        </aside>
        <main class="main-content">
            <div class="page-header">
                <h1>Kelola Kategori</h1>
                <button class="btn-sm btn-add" onclick="document.getElementById('form-tambah').scrollIntoView()">+ Tambah Kategori</button>
            </div>
            
            <?php if ($success): ?>
            <div class="success-msg">
                <?php if ($success == 'create'): ?>✅ Kategori berhasil ditambahkan!
                <?php elseif ($success == 'update'): ?>✅ Kategori berhasil diupdate!
                <?php elseif ($success == 'delete'): ?>✅ Kategori berhasil dihapus!
                <?php endif; ?>
            </div>
            <?php endif; ?>
            
            <?php if ($error): ?>
            <div class="error-msg">⚠️ Error: <?= $error ?></div>
            <?php endif; ?>
            
            <!-- Form Tambah/Edit Kategori -->
            <div class="form-card" id="form-tambah">
                <h3><?= $edit_category ? 'Edit Kategori' : 'Tambah Kategori Baru' ?></h3>
                <form method="POST">
                    <?php if ($edit_category): ?>
                    <input type="hidden" name="update" value="1">
                    <input type="hidden" name="id" value="<?= $edit_category['id'] ?>">
                    <?php else: ?>
                    <input type="hidden" name="create" value="1">
                    <?php endif; ?>
                    
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Nama (Indonesia) *</label>
                            <input type="text" name="name_id" required value="<?= $edit_category['name_id'] ?? '' ?>" placeholder="Contoh: Tas">
                        </div>
                        <div class="form-group">
                            <label>Nama (English) *</label>
                            <input type="text" name="name_en" required value="<?= $edit_category['name_en'] ?? '' ?>" placeholder="Example: Bags">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Deskripsi (Indonesia)</label>
                        <textarea name="description_id" rows="2" placeholder="Deskripsi kategori (opsional)"><?= $edit_category['description_id'] ?? '' ?></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Deskripsi (English)</label>
                        <textarea name="description_en" rows="2" placeholder="Category description (optional)"><?= $edit_category['description_en'] ?? '' ?></textarea>
                    </div>
                    
                    <div style="display: flex; gap: 12px;">
                        <?php if ($edit_category): ?>
                        <button type="submit" class="btn-sm btn-success">💾 Simpan Perubahan</button>
                        <a href="categories.php" class="btn-sm" style="background: #6b7280; color: white;">Batal</a>
                        <?php else: ?>
                        <button type="submit" class="btn-sm btn-success">➕ Simpan Kategori</button>
                        <?php endif; ?>
                    </div>
                </form>
            </div>
            
            <!-- Tabel Kategori -->
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Deskripsi</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($categories)): ?>
                    <tr>
                        <td colspan="4" class="empty-state">Belum ada kategori. Silakan tambah kategori pertama Anda!</td>
                    </tr>
                    <?php else: ?>
                    <?php foreach ($categories as $c): ?>
                    <tr>
                        <td><?= $c['id'] ?></td>
                        <td>
                            <strong><?= $c['name_id'] ?></strong><br>
                            <small style="color: #736c64;"><?= $c['name_en'] ?></small>
                        </td>
                        <td><?= $c['description_id'] ?: '<span style="color: #736c64;">-</span>' ?></td>
                        <td>
                            <a href="categories.php?edit=<?= $c['id'] ?>" class="btn-sm btn-edit">✏️ Edit</a>
                            <form method="POST" style="display: inline;">
                                <input type="hidden" name="delete" value="1">
                                <input type="hidden" name="id" value="<?= $c['id'] ?>">
                                <button type="submit" class="btn-sm btn-danger" onclick="return confirm('Yakin hapus kategori <?= $c['name_id'] ?>?\nNote: Produk dalam kategori ini akan kehilangan kategorinya.');">🗑️ Hapus</button>
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