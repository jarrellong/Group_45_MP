const express = require('express');
const mysql = require('mysql');

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

  app.get('/', (req, res) => {
    // Query the database
    connection.query('SELECT * FROM users', (error, results, fields) => {
      if (error) throw error;
  
      // Render the results in the browser
      res.send('<h1>Users:</h1>' + JSON.stringify(results));
    });
  });

  const port = 8000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${8000}`);
});