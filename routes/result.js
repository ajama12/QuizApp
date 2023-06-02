const express = require("express");
const router = express.Router();
const { getQuizByQuizId } = require("../db/queries/quiz");
const { getQuestionsByQuizId } = require("../db/queries/questions");
const { getCorrectAnswers } = require("../db/queries/answers");

//Load result page
router.get("/:quizId", (req, res) => {
  const quizId = req.params.quizId;

  getQuizByQuizId(quizId)
    .then((quiz) => {
      if (!quiz) {
        // Quiz not found
        res.status(404).send("Quiz does not exist!");
      } else {
        res.render("quizResults", {
          quiz,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Something went wrong while retrieving the quiz.");
    });
});

//HELPERS
const calcScore = (correctAnswers, totalQuestions) => {
  if (totalQuestions === 0) {
    throw new Error("No questions in the quiz.");
  } else {
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    return score;
  }
};

//Compare user answers with correct answers
const compareAnswers = (userAnswers, correctAnswers) => {

  const parsedUserAnswers = userAnswers;

  // console.log("CorrectAnswers", correctAnswers);
  let correctCount = 0;
  let incorrectCount = 0;

  console.log("correctAnswers", correctAnswers);
  parsedUserAnswers.forEach((userAnswer) => {
    // const correspondingCorrectAns = correctAnswers.find((correctAnswer) => {
    //   console.log(correctAnswer, userAnswer);
    //   // console.log("CCA", correspondingCorrectAns);
    //   return correctAnswer.question_id === userAnswer.question_id;
    // });
    // console.log("correspondingCorrectAns", correspondingCorrectAns);
    // console.log("userAnswers", userAnswers);
    const checkAnswer = correctAnswers.find(item => Number(item.question_id) === Number(userAnswer.question_id))

    if (checkAnswer) {
      if (userAnswer.answer === checkAnswer.answer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }
  });
  // console.log(correctCount, incorrectCount);
  const totalQuestions = parsedUserAnswers.length;

  return {
    totalQuestions,
    correctCount,
    incorrectCount,
  };
};

// Result page after quiz
router.post("/:quizId", (req, res) => {
  const quizId = req.params.quizId;
  const userAnswers = [];
  for(const key in req.body){
    const obj = {};
    obj["question_id"] = key;
    obj["answer"] = req.body[key];
    userAnswers.push(obj);
  }

  // console.log("userAnswers#####", userAnswers);

  let comparisonResult;

  getQuizByQuizId(quizId)
    .then((quiz) => {
      if (!quiz) {
        res.status(404).send("Quiz does not exist!");
      } else {
        getQuestionsByQuizId(quizId)
          .then((questions) => {
            const questionIds = questions.map((question) => question.id);
            return getCorrectAnswers(quizId, questionIds);
          })
          .then((correctAnswers) => {
            // console.log("CA", correctAnswers);
            comparisonResult = compareAnswers(userAnswers, correctAnswers);
            // console.log("CR", comparisonResult);
            const { totalQuestions, correctCount, incorrectCount } =
              comparisonResult;

            const score = calcScore(correctCount, totalQuestions);

            //console.log(score);

            console.log("quiz", quiz);
            // console.log("correctCount", correctCount);
            // console.log("score", score);
            // console.log("incorrectCount", incorrectCount);
            // console.log("totalQuestions", totalQuestions);

            // console.log("quiz", quiz);
            // console.log("correctCount", correctCount);
            // console.log("score", score);
            // console.log("incorrectCount", incorrectCount);
            // console.log("totalQuestions", totalQuestions);
            console.log("userAnswers", userAnswers);


            res.render("quizResults", {
              correctAnswers,
              userAnswers,
              score,
              correctCount,
              incorrectCount,
              totalQuestions,
              quiz,
            });
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
});
module.exports = router;
