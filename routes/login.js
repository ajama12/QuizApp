const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../db/queries/users.js');

// load login page
router.get('/', (req, res) => {
  return res.render('login');
});

// //login
router.post('/login/:id', (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  if (!email || !password) {
    return res.status(400).send('Empty field!');
  }
  const user = getUserByEmail(email);
  if (!user) {
    return res.status(400).send('Unauthorized access!');
  }
  if (user) {
  // Set the user ID in both session and cookies
    req.session.userId = req.params.user_id;
    return res.redirect(`/user/${req.params.user_id}`);
  }
});

//logout
router.post('/logout', (req, res) => {
  req.session = null;
  return res.redirect('/');
});

module.exports = router;


