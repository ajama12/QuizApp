const express = require('express');
const { getAllQuizzes } = require('../db/queries/quiz');
const router  = express.Router();

//Load homepage
router.get('/', (req, res) => {
  getAllQuizzes()
    .then((quizzes) => {
      const templateVars = {quizzes};
      res.render('index', templateVars);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
