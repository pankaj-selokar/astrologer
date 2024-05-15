const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

const upload = multer({ storage });

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'royal_web',
});

app.post('/api/astrologers/register', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const { name, gender, email, languages, specialties } = req.body;
  const file = req.file;

  const sql = 'INSERT INTO astrologers (name, gender, email, languages, specialties, image, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [name, gender, email, languages, specialties, file.filename, new Date()];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error saving file to database:', err);
      return res.status(500).send('Error saving file to database.');
    }

    console.log('File saved to database:', result);
    res.send('File uploaded and saved successfully.');
  });
});

app.get('/api/astrologers', (req, res) => {
  const sql = 'SELECT * FROM astrologers';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching astrologer data:', err);
      return res.status(500).json({ error: 'Failed to fetch astrologers' });
    }
    res.json(results);
  });
});

app.get('/api/astrologers/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM astrologers where id=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error fetching astrologer data:', err);
      return res.status(500).json({ error: 'Failed to fetch astrologers' });
    }
    res.json(result);
  });
});

app.put('/api/astrologers/:id', (req, res) => {
  const { name, gender, email, languages, specialties } = req.body;
  const id = req.params.id;

  const sql = 'UPDATE astrologers SET name=?, gender=?, email=?, languages=?, specialties=? WHERE id=?';
  const values = [name, gender, email, languages, specialties, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating astrologer:', err);
      return res.status(500).send('Error updating astrologer.');
    }

    console.log('Astrologer updated:', result);
    res.send('Astrologer updated successfully.');
  });
});

app.delete('/api/astrologers/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM astrologers WHERE id=?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting astrologer:', err);
      return res.status(500).send('Error deleting astrologer.');
    }

    console.log('Astrologer deleted:', result);
    res.send('Astrologer deleted successfully.');
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
