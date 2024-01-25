const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv'); // If you don't have dotenv installed, you can install it using: npm install dotenv

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Ohwohbuuju1',
  database: process.env.DB_NAME || 'simpleconnect',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
  const { question, email, phone, message, user } = req.body;
  console.log('Received form data:', { question, email, phone, message, user });

  const sql = 'INSERT INTO feedback (question, email, phone, message, user) VALUES (?, ?, ?, ?, ?)';
  const values = [question || null, email || null, phone || null, message || null, user || null];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log('Feedback submitted successfully');
    res.json({ success: 'Feedback submitted successfully' });
  });
});

process.on('SIGINT', () => {
  connection.end((err) => {
    console.log('MySQL connection closed');
    process.exit(err ? 1 : 0);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});