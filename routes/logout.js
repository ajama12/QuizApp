const express = require('express');
const router = express.Router();

//logout
router.post('/', (req, res) => {
  //console.log("logging out");
  req.session = null;

  //console.log("session cleared, redirecting");
  res.redirect('/');
});

module.exports = router;
