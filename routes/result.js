const express = require('express');
const router = express.Router();
const { getQuizByQuizId } = require('../db/queries/quiz');
const { getQuestionsByQuizId } = require('../db/queries/questions');
const { getCorrectAnswers } = require('../db/queries/answers');

//Load result page
router.get('/quizzes/:quizId/result', (req, res) => {
  const quizId = req.params.quizId;

  getQuizByQuizId(quizId)
    .then((quiz) => {
      if (!quiz) {
        // Quiz not found
        res.status(404).send('Quiz does not exist!');
      } else {
        res.render('quizResults', {
          quiz,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Something went wrong while retrieving the quiz.');
    });
});

//HELPERS
const calcScore = (correctAnswers, totalQuestions) => {
  if (totalQuestions === 0) {
    throw new Error('No questions in the quiz.');
  } else {
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    return score;
  }
};

//Compare user answers with correct answers
const compareAnswers = (userAnswers, correctAnswers) => {
  let correctCount = 0;
  let incorrectCount = 0;

  userAnswers.forEach((userAnswer, index) => {
    const correctAnswer = correctAnswers[index];

    if (userAnswer === correctAnswer) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const totalQuestions = userAnswers.length;

  return {
    totalQuestions,
    correctCount,
    incorrectCount,
  };
};

//Result page after quiz
router.post('/quizzes/:quizId/result', (req, res) => {
  const quizId = req.params.quizId;
  const userAnswers = req.body.answers;

  let comparisonResult;

  getQuizByQuizId(quizId)
    .then((quiz) => {
      if (!quiz) {
        res.status(404).send('Quiz does not exist!');
      } else {
        getQuestionsByQuizId(quizId)
          .then((questions) => {
            const questionIds = questions.map((question) => question.id);
            return getCorrectAnswers(quizId, questionIds);
          })
          .then((correctAnswers) => {
            comparisonResult = compareAnswers(userAnswers, correctAnswers);
            const { totalQuestions, correctCount, incorrectCount } = comparisonResult;

            const score = calcScore(correctCount, totalQuestions);

            res.render('quizResults', {
              score,
              correctCount,
              incorrectCount,
              totalQuestions,
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
});


module.exports = router;
