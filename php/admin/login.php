<?php
session_start();
$error = '';

// Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require '../config/database.php';
    $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = ? AND password = ?");
    $stmt->execute([$_POST['username'], $_POST['password']]);
    $admin = $stmt->fetch();
    
    if ($admin) {
        $_SESSION['admin_id'] = $admin['id'];
        $_SESSION['admin_user'] = $admin['username'];
        header('Location: index.php');
        exit;
    } else {
        $error = 'Username atau password salah!';
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Semesta Souvenir</title>
    <link rel="stylesheet" href="../style.css">
    <style>
        .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f7f5f2; }
        .login-card { background: white; padding: 48px; border-radius: 24px; width: 100%; max-width: 400px; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
        .login-card h2 { font-size: 24px; margin-bottom: 8px; text-align: center; }
        .login-card p { text-align: center; color: #736c64; margin-bottom: 32px; }
        .login-card input { width: 100%; padding: 12px 16px; border: 1px solid #e5e5e5; border-radius: 8px; margin-bottom: 16px; font-size: 16px; }
        .login-card button { width: 100%; }
        .error { background: #fee; color: #c00; padding: 12px; border-radius: 8px; margin-bottom: 16px; text-align: center; }
    </style>
</head>
<body>
    <div class="login-page">
        <div class="login-card">
            <h2>Admin Login</h2>
            <p>Masuk untuk mengelola website</p>
            <?php if ($error): ?>
            <div class="error"><?= $error ?></div>
            <?php endif; ?>
            <form method="POST">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit" class="btn btn-primary">Masuk</button>
            </form>
            <p style="margin-top: 24px; font-size: 14px;">Default: admin / semesta123</p>
        </div>
    </div>
</body>
</html>