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

// Update the route to fetch data from the "Employees" table
app.get('/employees', (req, res) => {
  connection.query('SELECT * FROM Employees', (error, results, fields) => {
    if (error) throw error;
  
    // Render the results in the browser
    res.send('<h1>Employees:</h1>' + JSON.stringify(results));
  });
});

// Add a new route to fetch data from the "Department" table
app.get('/employees', (req, res) => {
    connection.query('SELECT * FROM Employees', (error, results, fields) => {
      if (error) throw error;
    
      // Render the results in the browser
      res.send('<h1>Employees:</h1>' + JSON.stringify(results));
    });
});

app.get('/departments', (req, res) => {
    connection.query('SELECT * FROM Department', (error, results, fields) => {
      if (error) throw error;
    
      // Render the results in the browser
      res.send('<h1>Departments:</h1>' + JSON.stringify(results));
    });
});
  

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});