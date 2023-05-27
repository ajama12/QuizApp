const express = require('express');
const router  = express.Router();
const { addQuiz } = require('../db/queries/quiz.js');
const { addQuestion } = require('../db/queries/questions.js');
const { addAnswer } = require('../db/queries/answers.js');



//load create quiz page
router.get('/', (req, res) => {
  res.render('createQuiz');
});

//Create a new quiz
router.post('/', async (req, res) => {
  try {
    const quizResult = await addQuiz(req.body.userId, req.body.quizName, req.body.quizDesc, req.body.isPrivate);
    const quizId = quizResult.id;

    for (let question of req.body.questions) {
      const questionResult = await addQuestion(quizId, question.questionPrompt);
      const questionId = questionResult.id;

      for (let answer of question.answers) {
        await addAnswer(quizId, questionId, answer.answer, answer.isCorrect);
      }
    }

    res.status(201).send('Your quiz is ready!');
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong while creating your quiz.');
  }
});


module.exports = router;
