const express = require('express');
const mysql = require('mysql2');

const app = express();

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

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send('Username and password are required');
    return;
  }

  connection.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (error, results, fields) => {
      if (error) {
        res.status(500).send('Error connecting to the database');
      } else {
        if (results.length > 0) {
          res.send('Login successful!');
        } else {
          res.status(401).send('Invalid username or password');
        }
      }
    }
  );
});

app.get('/', (req, res) => {
  // Query the database to test connection
  connection.query('SELECT 1', (error, results, fields) => {
    if (error) {
      res.status(500).send('Error connecting to the database');
    } else {
      res.send('Database connection successful!');
    }
  });
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