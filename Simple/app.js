const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const { body, validationResult } = require('express-validator');

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

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const validateFeedbackForm = [
  body('question').notEmpty().withMessage('Question is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('phone').optional().isNumeric().withMessage('Invalid phone number'),
  body('message').notEmpty().withMessage('Message is required'),
  body('name').notEmpty().withMessage('Name is required'),
];

// Handle the POST request to submit feedback
app.post('/submit', validateFeedbackForm, (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract the validated data from the request payload
  const { question, email, phone, message, name } = req.body;

  // Insert the feedback data into the MySQL database
  db.query('INSERT INTO feedback (question, email, phone, message, name) VALUES (?, ?, ?, ?, ?)', [question, email, phone, message, name], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error executing MySQL query' });
    }

    return res.status(200).json({ message: 'Feedback submitted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});