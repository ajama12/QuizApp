const express = require('express');
const router = express.Router();
const { getUserByEmail, getUserByUserId } = require('../db/queries/users.js');

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

    return res.redirect(`/user/${user.id}`);
  } catch (error) {
    return res.status(500).send('An error occurred.');
  }
});

//get route for checking if user is logged in
<<<<<<< HEAD
router.get('/userActive', async(req, res) => {
=======
router.get('/userActive', async (req, res) => {
  // console.log("hitting userActive route");
  // console.log(req.session.userId);
>>>>>>> 1a9d630c022a1a7146d6566871c2f45d4fde34a2
  const userId = await getUserByUserId(req.session.userId);
  if (userId) {
    res.status(200).send(userId);
  } else {
    res.status(401).send(null);
  }
});

module.exports = router;


