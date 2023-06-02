const express = require('express');
const router = express.Router();
const { getQuizByQuizId } = require('../db/queries/quiz');
const { getQuestionsByQuizId } = require('../db/queries/questions');
const { getCorrectAnswers } = require('../db/queries/answers');

//Load result page
router.get('/:quizId', (req, res) => {
  const quizId = req.params.quizId;

  getQuizByQuizId(quizId)
    .then((quiz) => {
      if (!quiz) {
        // Quiz not found
        res.status(404).send('Quiz does not exist!');
      } else {
        res.render('quizResults', { quiz });
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

  userAnswers.forEach((userAnswer) => {
    const correspondingCorrectAns = correctAnswers.find((correctAnswer) => {
      return correctAnswer.question_id === userAnswer.question_id;
    });
    if (correspondingCorrectAns) {
      if (userAnswer.answer === correspondingCorrectAns.answer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }
  });

  const totalQuestions = userAnswers.length;

  return {
    totalQuestions,
    correctCount,
    incorrectCount,
  };
};


// Result page after quiz
router.post('/:quizId', (req, res) => {
  const quizId = req.params.quizId;
  const userAnswers = JSON.parse(req.body.answers);
  console.log("reqBody", req.body)
  const correctAnswersArray = [];


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
            for (const answer of correctAnswers) {
              correctAnswersArray.push(answer.answer);
            }

            console.log("correctAnswersArray" , correctAnswersArray);
            comparisonResult = compareAnswers(userAnswers, correctAnswersArray);
            const { totalQuestions, correctCount, incorrectCount } = comparisonResult;
            const score = Math.round((correctCount / totalQuestions) * 100);

            res.render('quizResults', {
              quiz,
              score,
              correctCount,
              incorrectCount,
              totalQuestions,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send('Something went wrong while calculating the quiz results.');
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Something went wrong while retrieving the quiz.');
    });
});


module.exports = router;

