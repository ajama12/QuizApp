const express = require("express");
const router = express.Router();
const { addQuiz } = require("../db/queries/quiz.js");
const { addQuestion } = require("../db/queries/questions.js");
const { addAnswer } = require("../db/queries/answers.js");

//load create quiz page
router.get("/:user_id", (req, res) => {
  const user = { id: req.session.userId };
  const templateVars = { user };
  res.render("createQuiz", templateVars);
});

//Create a new quiz
router.post("/:user_id", async(req, res) => {
  const userId = req.session.userId;
  if (userId) {
    try {
      const { quizName, quizDesc, isPrivate, questions } = req.body;
      const quizResult = await addQuiz(userId, quizName, quizDesc, isPrivate);
      const quizId = quizResult.id;

      for (let question of questions) {
        const prompt = question.questionPrompt;
        const questionResult = await addQuestion(quizId, prompt);
        const questionId = questionResult.id;
        const answers = question.answers;

        for (let answer of answers) {
          const singleAns = answer.answer;
          const isCorrect = answer.isCorrect;
          await addAnswer(quizId, questionId, singleAns, isCorrect);
        }
      }
      const quizIdStr = JSON.stringify(quizId);

      res.status(201).send(quizIdStr);

    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong while creating your quiz.");
    }
  } else {
    res.status(401).send("Unauthorized! Can't create quiz. Please log in.");
  }

});

module.exports = router;
