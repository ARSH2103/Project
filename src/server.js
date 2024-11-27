const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
   // Replace with your MySQL password.Hardcoding this based on my setup.
  password: 'password',
  database: 'userdb',
});


// Secret key for JWT
const SECRET_KEY = 'project-key';

// Signup API (POST request)
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send('Please provide all required fields');
  }

  // Hash the password before saving
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error hashing password');
    
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], (error, results) => {
      if (error) {
        return res.status(500).send('Error during signup');
      }
      res.status(201).send('User registered successfully');
    });
  });
});

// Login API (POST request)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Please provide email and password');
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).send('Invalid credentials');
    }

    // Compare password with stored hash
    bcrypt.compare(password, results[0].password, (error, isMatch) => {
      if (error || !isMatch) {
        return res.status(400).send('Invalid credentials');
      }

      // Generate JWT token
      const token = jwt.encode({ id: results[0].id, email }, SECRET_KEY);
      res.status(200).json({ token });
    });
  });
});

app.put('/dashboard', (req, res) => {
  const { token, updatedInfo } = req.body;;
    const { username, firstname, lastname, current_year, branch, password } = updatedInfo;
    const updates = [firstname, lastname, current_year, branch, username];
  
    let query = 'UPDATE users SET firstname = ?, lastname = ?, current_year = ?, branch = ? WHERE username = ?';

    db.query(query, updates, (error, results) => {
      if (error) {
        return res.status(500).send('Error updating profile');
      }
      res.status(200).send('Profile updated successfully');
    });

});

// Starting server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
