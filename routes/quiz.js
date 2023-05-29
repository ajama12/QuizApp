const express = require('express');
const router = express.Router();
const { getQuizByQuizId } = require('../db/queries/quiz');

//Load specific quiz page
router.get('/:quizId', (req, res) => {
  getQuizByQuizId(req.params.quizId)
    .then((quiz) => {
      // console.log(quiz);
      const templateVars = {quiz};
      res.render('quiz', templateVars);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occured while retrieving quiz.');
    });
});

module.exports = router;
