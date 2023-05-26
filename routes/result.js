const express = require("express");
const router = express.Router();

//Helpers
const calcScore = (correctAnswers, totalQuestions) => {
  if (totalQuestions === 0) {
    throw new Error('No questions in the quiz.');
  } else {
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    return score;
  }
};

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

//Load result page after quiz
router.post('/quizzes/:quizId/result', (req, res) => {
  const quizId = req.params.quizId;
  const userAnswers = req.body.answers;

  getQuizByQuizId(quizId)
    .then((quiz) => {
      if (!quiz) {
        res.status(404).send('Quiz does not exist!');
      } else {
        const correctAnswers = quiz.questions.map((question) => question.correctAnswer);

        const comparisonResult = compareAnswers(userAnswers, correctAnswers);
        const { totalQuestions, correctCount, incorrectCount } = comparisonResult;

        const score = calcScore(correctCount, totalQuestions);

        res.status(200).send({ score, correctCount, incorrectCount, totalQuestions });
      }
    })
    .catch((err) => {
      res.status(500).send('Something went wrong while processing the quiz result.');
    });
});

module.exports = router;
