const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// สร้าง Express app
const app = express();

// เชื่อมต่อกับ MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // ใส่รหัสผ่าน MySQL ของคุณ
  database: 'shopdb'  // ชื่อฐานข้อมูลที่ใช้
});

// ตรวจสอบการเชื่อมต่อกับฐานข้อมูล
db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log('Connected to database');
});

// Middleware
app.use(cors());
app.use(express.json()); // รองรับ JSON request

// ดึงข้อมูลสินค้า
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send({ error: 'Database query failed' });
      return;
    }
    res.json(results);
  });
});

// เพิ่มข้อมูลสินค้าใหม่
app.post('/api/products', (req, res) => {
  const { name, description, price, image_url } = req.body;
  const query = 'INSERT INTO products (name, description, price, image_url) VALUES (?, ?, ?, ?)';
  db.query(query, [name, description, price, image_url], (err, results) => {
    if (err) {
      res.status(500).send({ error: 'Failed to add product' });
      return;
    }
    res.json({ message: 'Product added successfully', id: results.insertId });
  });
});

// อัปเดตข้อมูลสินค้า
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url } = req.body;
  const query = 'UPDATE products SET name = ?, description = ?, price = ?, image_url = ? WHERE id = ?';
  db.query(query, [name, description, price, image_url, id], (err) => {
    if (err) {
      res.status(500).send({ error: 'Failed to update product' });
      return;
    }
    res.json({ message: 'Product updated successfully' });
  });
});

// ลบข้อมูลสินค้า
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      res.status(500).send({ error: 'Failed to delete product' });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

// เริ่มต้น server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
