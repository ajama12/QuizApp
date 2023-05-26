const express = require('express');
const router  = express.Router();
const { addQuiz, addQuestion, addAnswer } = require('../db/queries/quiz');

//load create quiz page
router.get('/createQuiz', (req, res) => {
  res.render('createQuiz');
});

//Create a new quiz
router.post('/createQuiz', (req, res) => {
  addQuiz(req.body.userId, req.body.quizName, req.body.quizDesc, req.body.isPrivate, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Something went wrong while creating your quiz.');
    }
    const quizId = result.id;
    req.body.questions.forEach(question => {
      addQuestion(quizId, question.questionPrompt, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Something went wrong when adding your question.');
        }
        const questionId = result.id;
        question.answers.forEach(answer => {
          addAnswer(quizId, questionId, answer.answer, answer.isCorrect, (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).send('Something went wrong while adding your answer.');
            }
          });
        });
      });
    });
    return res.status(201).send('Your quiz is ready!');
  });
});

module.exports = router;
