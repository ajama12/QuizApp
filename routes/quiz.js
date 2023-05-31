const express = require('express');
const router = express.Router();
const { getQuizByQuizId } = require('../db/queries/quiz');
const { getCorrectAnswers } = require('../db/queries/answers');

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
