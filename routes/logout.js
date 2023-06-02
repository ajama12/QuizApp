const express = require('express');
const router = express.Router();

//logout
router.post('/', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
