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
    console.error('Error connecting to MySQL database:', err);
    process.exit(1); // Terminate the application on database connection error
  }
  console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', function (req, res) {
  const { question, email, phone, message, user } = req.body;
  console.log('Received form data:', { question, email, phone, message, user });

  const query = 'INSERT INTO feedback (question, email, phone, message, user) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [question, email, phone, message, user], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log(`Logged feedback: question=${question}, email=${email}, phone=${phone}, message=${message}, user=${user}`);
    res.send('Feedback submitted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});