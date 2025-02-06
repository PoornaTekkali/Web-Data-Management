const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');



router.post('/register/patient', (req, res) => {
  const { email, password, firstname , lastname , phoneNumber , roleid , dateofbirth , gender , emergencycontactnumber , primarycareprovider  } = req.body;
  
  console.log(req.body)
  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // Save the user to the database
    pool.query('INSERT INTO users (email, password , first_name , last_name  , phone_number ,  role_id  ) VALUES (?, ? , ? , ? , ? , ? )', [email, hashedPassword, firstname , lastname , phoneNumber , roleid ], (err, results) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

          pool.query('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
          if (err) {
            console.error('Error registering user:', err);
            res.status(500).send('Internal Server Error');
            return;
          }
            console.log(user[0])

              pool.query('INSERT INTO patients (user_id, date_of_birth , gender , emergency_contact , primarycare_provider_id ) VALUES (?, ? , ? , ? , ? )', [user[0].id, dateofbirth , gender , emergencycontactnumber , primarycareprovider], (err, results) => {
                if (err) {
                  console.error('Error registering user:', err);
                  res.status(500).send('Internal Server Error');
                  return;
                }
                res.status(200).json({ message: 'User registered successfully' });
              });

          });
    });
  });
});



router.post('/register/doctor', (req, res) => {
  const { email, firstname , lastname , phoneNumber , roleid , dateofbirth , gender , qualification , specialization , licensenumber , about, healthfacilityname} = req.body;
  
  console.log(req.body)
  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // Save the user to the database
    pool.query('INSERT INTO users (email, first_name , last_name , password , phone_number ,  role_id , created_time ) VALUES (?, ? , ? , ? , ? , ? )', [username, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200).send('User registered successfully');
    });
  });
});



router.post('/register/pharmacist', (req, res) => {
  const { email, firstname , lastname , phoneNumber , roleid , starteddate , qualification  , licensenumber , about , healthfacilityname } = req.body;
  
  console.log(req.body)
  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    
    // Save the user to the database
    pool.query('INSERT INTO users (email, first_name , last_name , password , phone_number ,  role_id , created_time ) VALUES (?, ? , ? , ? , ? , ? )', [username, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200).send('User registered successfully');
    });

  });
});





module.exports = router;
