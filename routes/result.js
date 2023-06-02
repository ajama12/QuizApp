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
  console.log("hitting compareAnswers");
  console.log(typeof userAnswers);

  const parsedUserAnswers = JSON.parse(userAnswers);

  console.log(correctAnswers);
  let correctCount = 0;
  let incorrectCount = 0;

  parsedUserAnswers.forEach((userAnswer) => {
    // console.log("UA", userAnswer);
    const correspondingCorrectAns = correctAnswers.find((correctAnswer) => {
      // console.log("CCA", correspondingCorrectAns);
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

  const totalQuestions = parsedUserAnswers.length;

  return {
    totalQuestions,
    correctCount,
    incorrectCount,
  };
};


// Result page after quiz
router.post('/:quizId', async(req, res) => {
  const quizId = req.params.quizId;
  const userAnswers = req.body.answers;
  // console.log(req.body.answers);
  // console.log("UA", userAnswers);

  let comparisonResult;

  await getQuizByQuizId(quizId)
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
            // console.log("CA", correctAnswers);
            comparisonResult = compareAnswers(userAnswers, correctAnswers);

            const { totalQuestions, correctCount, incorrectCount } = comparisonResult;

            const score = Math.round((correctCount / totalQuestions) * 100);

            console.log("quiz", quiz);
            console.log("correctCount", correctCount);
            console.log("score", score);
            console.log("incorrectCount", incorrectCount);
            console.log("totalQuestions", totalQuestions);

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

