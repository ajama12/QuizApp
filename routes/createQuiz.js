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
  // console.log(req.body);
  // console.log("create quiz route hit");
  // console.log(req.session.userId);

  if (req.session.userId) {
    try {
      const { userId, quizName, quizDesc, isPrivate, questions } = req.body;
      const quizResult = await addQuiz(userId, quizName, quizDesc, isPrivate);
      const quizId = quizResult.id;

      for (let question of questions) {
        const questionResult = await addQuestion(
          quizId,
          question.questionPrompt
        );
        const questionId = questionResult.id;

        for (let answer of question.answers) {
          await addAnswer(quizId, questionId, answer.answer, answer.isCorrect);
        }
      }

      res.status(201).redirect("/quiz/" + quizId);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong while creating your quiz.");
    }
  } else {
    res.status(401).send("Unauthorized! Can't create quiz. Please log in.");
  }
});

module.exports = router;
