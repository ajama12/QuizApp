const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../db/queries/users.js');

// load login page
router.get('/', (req, res) => {
  return res.render('login');
});

//login
router.post('/', async(req, res) => {
  const email = req.body.email;
console.log(email, "hi");
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).send('Empty field!');
  }
  const user = await getUserByEmail(email);
  console.log(user, "user");
  if (!user) {
    return res.status(400).send('Unauthorized access!');
  }
  if (user) {
  // Set the user ID in both session and cookies
    req.session.userId = user.id;
    return res.redirect(`/user/${user.id}`);
  }
});

//logout
router.post('/logout', (req, res) => {
  req.session = null;
  return res.redirect('/');
});

module.exports = router;


