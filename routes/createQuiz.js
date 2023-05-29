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
router.post('/', async(req, res) => {
  try {
    const quizResult = await addQuiz(req.body.userId, req.body.quizName, req.body.quizDesc, req.body.isPrivate);
    const quizId = quizResult.id;
    // console.log(quizResult);
    // console.log(quizId);

    for (const question of req.body.questions) {
      const questionResult = await addQuestion(quizId, question.questionPrompt);
      const questionId = questionResult.id;
      // console.log(question);

      for (const answer of question.answers) {
        await addAnswer(quizId, questionId, answer.answer, answer.isCorrect);
        // console.log(answer);
      }
    }

    res
      .status(201).send('Your quiz is ready!')
      .redirect("/");

  } catch (err) {
    console.log(err);
    // throw err;
    res.status(500).send('Something went wrong while creating your quiz.');
  }
});


module.exports = router;
