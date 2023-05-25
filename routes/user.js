const express = require('express');
const router  = express.Router();
const {getUserByEmail} = require('./db/queries/users.js');


//Load homepage
router.get('/', (req, res) => {
  res.render('index');
});


module.exports = router;
