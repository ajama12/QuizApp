const express = require('express');
const router  = express.Router();

//Load homepage
router.get('/', (req, res) => {
  res.render('createQuiz');
});


module.exports = router;
