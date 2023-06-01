const express = require('express');
const router = express.Router();
const { getQuizByQuizId } = require('../db/queries/quiz');
const { getQuestionsByQuizId } = require('../db/queries/questions');
const { getAnswersByQuestionId } = require('../db/queries/answers');
const { getCorrectAnswers } = require('../db/queries/answers');

//Load specific quiz page
router.get('/:quizId', (req, res) => {
  // call query for getting list of questions by quiz id

  Promise.all(
    [
      getQuestionsByQuizId(req.params.quizId),
      getQuizByQuizId(req.params.quizId),

    ]
  ).then(async all => {
    const quiz = all[1];
    const justQuestions = all[0];
    const questions = [];
    for (const question of justQuestions) {
      const answersOfSpecificQuestion = await getAnswersByQuestionId(question.id);
      console.log("answersOfSpecificQuestion", answersOfSpecificQuestion);
      questions.push({
        ...question,
        answers: answersOfSpecificQuestion
      })
    }

    console.log("questions", questions)
    const templateVars = {
      questions,
      quiz: all[1],
    };
    res.render('quiz', templateVars);
  }).catch((err) => {
    console.log(err);
    res.status(500).send('An error occured while retrieving quiz.');
  });
});



router.post('/:quizId', (req, res) => {
  res.render(`/result/${req.params.quizId}`);
});
module.exports = router;
