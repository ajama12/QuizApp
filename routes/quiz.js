const express = require('express');
const router = express.Router();
const { getQuizByQuizId } = require('../db/queries/quiz');
const { getAnswersByQuestionId } = require('../db/queries/answers');

//Load specific quiz page
router.get('/:quizId', (req, res) => {
  getQuizByQuizId(req.params.quizId)
    .then((quiz) => {
      // console.log(quiz);
      const templateVars = {quiz, quizId: req.params.quizId };
      res.render('quiz', templateVars);
    
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occured while retrieving quiz.');
    });
});

router.get('/:quizId', (req, res) => {
  getAnswersByQuestionId(req.params.questionId)
  .then((answer) =>{
    const templateVars = {answer, questionId: req.params.questionId };
    res.render('answer', templateVars)
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('An error occured while retrieving answer.');
  });
});



// //Post new quiz to its own link
// router.post('/:quizId', (req, res) => {
//   getQuizByQuizId(req.params.quizId)
//     .then((quiz) => {
//       // console.log(quiz);
//       const templateVars = {quiz};
//       res.render('quiz', templateVars);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send('An error occured while retrieving quiz.');
//     });
// });

module.exports = router;
