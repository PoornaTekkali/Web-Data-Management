const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Find the user in the database
  pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error finding user:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    if (results.length === 0) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }
    
    const user = results[0];
    
    // Compare the password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
      }
      // Generate JWT
      const token = jwt.sign({ email: user.email , role: "Patient" }, 'your_secret_key');
      res.status(200).json({ token });
    });
  });
});


router.post('/adminlogin', (req, res) => {
  const { email, password } = req.body;
  
  // Find the user in the database
  pool.query('SELECT * FROM users WHERE email = ? and role="ADMIN"', [email], (err, results) => {
    if (err) {
      console.error('Error finding user:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    if (results.length === 0) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }
    
    const user = results[0];
    
    // Compare the password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }
      
      if (!isMatch) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
      }
      // Generate JWT
      const token = jwt.sign({ email: user.email , role: "ADMIN" }, 'your_secret_key');
      res.status(200).json({ token });
    });
  });
});


module.exports = router;