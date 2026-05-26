const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(s => s.trim()) 
  : ['http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

let pool;

async function initDb() {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'semesta_souvenir',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  console.log('Connected to MySQL database');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) return cb(null, true);
    cb(new Error('Hanya gambar yang diperbolehkan!'));
  }
});

// ========== AUTH ROUTES ==========

app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.execute('SELECT * FROM admins WHERE username = ?', [username]);
    
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Username tidak ditemukan' });
    }
    
    const admin = rows[0];
    if (admin.password !== password) {
      return res.status(401).json({ error: 'Password salah' });
    }
    
    res.json({ 
      success: true, 
      message: 'Login berhasil',
      admin: { id: admin.id, username: admin.username }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== CATEGORY ROUTES ==========

app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM categories ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { name_id, name_en, description_id, description_en } = req.body;
    if (!name_id || !name_en) {
      return res.status(400).json({ error: 'Nama kategori wajib diisi' });
    }
    const [result] = await pool.execute(
      'INSERT INTO categories (name_id, name_en, description_id, description_en) VALUES (?, ?, ?, ?)',
      [name_id, name_en, description_id || '', description_en || '']
    );
    const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/categories/:id', async (req, res) => {
  try {
    const { name_id, name_en, description_id, description_en } = req.body;
    const [result] = await pool.execute(
      'UPDATE categories SET name_id = ?, name_en = ?, description_id = ?, description_en = ? WHERE id = ?',
      [name_id, name_en, description_id || '', description_en || '', req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Kategori tidak ditemukan' });
    }
    const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM categories WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Kategori tidak ditemukan' });
    }
    res.json({ message: 'Kategori berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== PRODUCT ROUTES ==========

app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT p.*, c.name_id as category_name_id, c.name_en as category_name_en 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      ORDER BY p.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT p.*, c.name_id as category_name_id, c.name_en as category_name_en 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = ?
    `, [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { name_id, name_en, description_id, description_en, category_id } = req.body;
    if (!name_id || !name_en || !description_id || !description_en) {
      return res.status(400).json({ error: 'Semua field wajib diisi' });
    }
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await pool.execute(
      'INSERT INTO products (name_id, name_en, description_id, description_en, category_id, image) VALUES (?, ?, ?, ?, ?, ?)',
      [name_id, name_en, description_id, description_en, category_id || null, image]
    );
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { name_id, name_en, description_id, description_en, category_id } = req.body;
    const [existing] = await pool.execute('SELECT image FROM products WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    const image = req.file ? `/uploads/${req.file.filename}` : existing[0].image;
    await pool.execute(
      'UPDATE products SET name_id = ?, name_en = ?, description_id = ?, description_en = ?, category_id = ?, image = ? WHERE id = ?',
      [name_id, name_en, description_id, description_en, category_id || null, image, req.params.id]
    );
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const [existing] = await pool.execute('SELECT image FROM products WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Produk tidak ditemukan' });
    }
    if (existing[0].image) {
      const imagePath = path.join(__dirname, existing[0].image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
    await pool.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== CONTACT/PESANAN ROUTES ==========

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, product, quantity, message } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Nama, email, dan telepon wajib diisi' });
    }
    await pool.execute(
      'INSERT INTO contact_messages (name, email, phone, product, quantity, message) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, phone, product || null, quantity || null, message || '']
    );
    res.status(201).json({ success: true, message: 'Pesan berhasil dikirim' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/contact', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to database:', err);
});