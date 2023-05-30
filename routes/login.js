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
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).send('Empty field.');
  }
  const user = await getUserByEmail(email);
  if (!user) {
    console.log("Test1");
    return res.status(400).send('Unauthorized access.');
  }

  if (user) {
    console.log("test");
  // Set the user ID in both session and cookies
    req.session.userId = user.id;
    console.log(req.session.userId);
    return res.redirect(`/user/${user.id}`);
  }
});


module.exports = router;


