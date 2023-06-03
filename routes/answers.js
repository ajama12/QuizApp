const express = require('express');
const router = express.Router();
const { getAnswersByQuestionId } = require('../db/queries/answers')

//Load specific quiz page
router.get('/:quizId', (req, res) => {
  // console.log('Answer Routes requested')
  getAnswersByQuestionId(req.params.questionId)
  console.log(req.params.questionId)
    .then((answer) => {
      // console.log('Answer', answer);
      // const templateVars = {quiz, quizId: req.params.quizId };
      // res.render('quiz', templateVars);
      res.json(answer);
     
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occured while retrieving answer.');
    });
});