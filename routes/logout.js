const express = require('express');
const router = express.Router();

//logout
router.post('/logout', (req, res) => {
  req.session = null;
  return res.redirect('/');
});

module.exports = router;
