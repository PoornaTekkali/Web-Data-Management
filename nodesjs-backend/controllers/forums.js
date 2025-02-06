const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');
const authenticateToken = require('../middleware/auth');




router.post('/forums',authenticateToken , (req, res) => {
  const { title, description , userid  } = req.body;
  
  console.log(req.body)
    
	// Save the user to the database
	pool.query('INSERT INTO health_forum_posts (title, description , user_id ) VALUES (?, ? , ? )', [title, description, userid  ], (err, results) => {
	  if (err) {
	    console.error('Error registering user:', err);
	    res.status(500).send('Internal Server Error');
	    return;
	  }

	 res.status(200).json({ message: 'Forum Posted Successfully' });
	});

});


// DELETE endpoint to delete a forum post by its ID
router.delete('/forums/:postId',authenticateToken, (req, res) => {
  const postId = req.params.postId;

  // Delete the forum post from the database
  pool.query('DELETE FROM health_forum_posts WHERE id = ?', [postId], (err, results) => {
    if (err) {
      console.error('Error deleting forum post:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Forum post not found' });
      return;
    }

    res.status(200).json({ message: 'Forum post deleted successfully' });
  });
});

// PUT endpoint to update a forum post by its ID
router.put('/forums/:postId',authenticateToken ,  (req, res) => {
  const postId = req.params.postId;
  const { title, description, userId } = req.body;

  // Update the forum post in the database
  pool.query('UPDATE health_forum_posts SET title = ?, description = ?, user_id = ? WHERE id = ?', [title, description, userId, postId], (err, results) => {
    if (err) {
      console.error('Error updating forum post:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Forum post not found' });
      return;
    }

    res.status(200).json({ message: 'Forum post updated successfully' });
  });
});



router.post('/forums/answer',authenticateToken ,  (req, res) => {
  const { forum_id, answer, userid } = req.body;

  // Get the forum_id from the query parameters

  console.log(req.body);

  // Save the user to the database
  pool.query('INSERT INTO forum_answers (forum_id, answer, user_id) VALUES (?, ?, ?)', [forum_id, answer, userid], (err, results) => {
    if (err) {
      console.error('Error answering forum:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).json({ message: 'Forum Answer Posted Successfully' });
  });
});


router.delete('/forums/answer/:answerId',authenticateToken, (req, res) => {
  const answerId = req.params.answerId;

  // Delete the answer from the database
  pool.query('DELETE FROM forum_answers WHERE id = ?', [answerId], (err, results) => {
    if (err) {
      console.error('Error deleting forum answer:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Forum answer not found' });
      return;
    }

    res.status(200).json({ message: 'Forum answer deleted successfully' });
  });
});


router.put('/forums/answer/:answerId',authenticateToken, (req, res) => {
  const answerId = req.params.answerId;
  const { answer } = req.body;

  // Update the answer in the database
  pool.query('UPDATE forum_answers SET answer = ? WHERE id = ?', [answer, answerId], (err, results) => {
    if (err) {
      console.error('Error updating forum answer:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Forum answer not found' });
      return;
    }

    res.status(200).json({ message: 'Forum answer updated successfully' });
  });
});



router.get('/forums',authenticateToken, (req, res) => {
  const { offset = 0, limit = 10 } = req.query; // Default offset to 0 and limit to 10 if not provided

  // Parse offset and limit as integers
  const offsetInt = parseInt(offset, 10);
  const limitInt = parseInt(limit, 10);

  // Validate offset and limit values
  if (isNaN(offsetInt) || isNaN(limitInt) || offsetInt < 0 || limitInt <= 0) {
    res.status(400).json({ error: 'Invalid offset or limit' });
    return;
  }

  // Query the database with offset and limit
  pool.query('SELECT * FROM health_forum_posts LIMIT ? OFFSET ?', [limitInt, offsetInt], (err, results) => {
    if (err) {
      console.error('Error fetching forum posts:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Send the results back as JSON
    res.status(200).json(results);
  });
});


router.get('/forums/:id',authenticateToken, (req, res) => {
  const Id = req.params.id; // Extract the forumid parameter from the request URL

  // Query to fetch the forum post based on the forum_id
  const postQuery = 'SELECT * FROM health_forum_posts WHERE id = ?';

  pool.query(postQuery, [Id], (err, postResults) => {
    if (err) {
      console.error('Error fetching forum post:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Query to fetch all answers for the forum_id
    const answerQuery = 'SELECT * FROM forum_answers WHERE forum_id = ?';

    pool.query(answerQuery, [Id], (err, answerResults) => {
      if (err) {
        console.error('Error fetching forum answers:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Combine the forum post and its answers into a single object
      const responseData = {
        forumPost: postResults[0], // Assuming there's only one forum post per forum ID
        answers: answerResults
      };

      // Send the combined data as a JSON response
      res.status(200).json(responseData);
    });
  });
});

module.exports = router;

