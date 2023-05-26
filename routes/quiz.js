const express = require('express');
const router = express.Router();
const { getQuizByQuizId } = require('../db/queries/quiz');

//Load specific quiz
router.get('/quizzes/:quiz_id', (req, res) => {
  getQuizByQuizId(req.params.quiz_id)
    .then((quiz) => {
      const templateVars = {quiz};
      res.render('quiz', templateVars);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occured while retrieving quiz.');
    });
});

module.exports = router;
