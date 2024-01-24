const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ohwohbuuju1',
  database: 'simpleconnect',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/public' });
});

app.post('/ask', (req, res) => {
  const { question } = req.body;

  if (!question) {
    res.status(400).send('Please provide a question');
    return;
  }

  // Store the question in the database (Assuming a 'questions' table)
  connection.query(
    'INSERT INTO questions (question_text) VALUES (?)',
    [question],
    (error, results, fields) => {
      if (error) {
        res.status(500).send('Error storing the question in the database');
      } else {
        res.send('Question submitted and stored in the database!');
      }
    }
  );
});

// Route to display employees
app.get('/employees', (req, res) => {
  connection.query('SELECT * FROM employee', (error, results, fields) => {
    if (error) throw error;

    // Render the results in the browser
    res.send('<h1>Employees:</h1>' + JSON.stringify(results));
  });
});

// Route to display departments
app.get('/departments', (req, res) => {
  connection.query('SELECT * FROM department', (error, results, fields) => {
    if (error) throw error;

    // Render the results in the browser
    res.send('<h1>Departments:</h1>' + JSON.stringify(results));
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});