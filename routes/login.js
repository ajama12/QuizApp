const express = require('express');
const router = express.Router();
const {getUserByEmail} = require('./db/queries/users.js');

//load login page
router.get('/login', (req, res) => {
  return res.render('login');
});

//login
router.post('/login', (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  if (!email || !password) {
    res.status(400).send('Empty field!');
  }
  const user = getUserByEmail(email);
  if (!user) {
    res.status(400).send('Unauthorized access!');
  }
  if (user) {
    return res.redirect('/userProfile');
  }
});

//logout
router.post('/logout', (res, req) => {
  req.session = null;
  return res.redirect('/');
});

module.exports = router;


