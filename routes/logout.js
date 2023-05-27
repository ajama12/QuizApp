const express = require('express');
const router = express.Router();

//logout
router.post('/', (req, res) => {
  req.session = null;
  return res.redirect('/');
});

module.exports = router;
