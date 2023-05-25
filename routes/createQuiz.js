const express = require('express');
const router  = express.Router();

//load create quiz page
router.get('/createQuiz', (req, res) => {
  res.render('createQuiz');
});

module.exports = router;
