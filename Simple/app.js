const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ohwohbuuju1',
  database: 'simpleconnect',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

app.post('/submit', (req, res) => {
  const { topic, email, phone, message, name } = req.body;
  console.log('Received form data:', { topic, email, phone, message, name });

  const sql = `INSERT INTO feedback (topic, email, phone, message, name) VALUES (?, ?, ?, ?, ?)`;
  const values = [topic, email, phone, message, name];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log('Feedback submitted successfully');
    res.send('Feedback submitted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});