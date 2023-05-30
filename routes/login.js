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

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).send('Unauthorized access.');
    }
    req.session.userId = user.id;

    // console.log(req.session);
    // console.log("User ID:", req.session.userId);

    return res.redirect(`/user/${user.id}`);
  } catch (error) {
    // console.log(error);
    return res.status(500).send('An error occurred.');
  }
});



module.exports = router;


