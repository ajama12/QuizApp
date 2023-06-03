const express = require('express');
const router = express.Router();
const { getQuestionsByQuizId } = require('../db/queries/questions');

//Load specific quiz page
router.get('/:quizId', (req, res) => {
  // console.log('Question Routes requested')
  getQuestionsByQuizId(req.params.quizId)
    .then((questions) => {
      // console.log('questions', questions);
      // const templateVars = {quiz, quizId: req.params.quizId };
      // res.render('quiz', templateVars);
      res.json(questions)
     
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
