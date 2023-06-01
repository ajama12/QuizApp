const express = require('express');
const { getAllQuizzes } = require('../db/queries/quiz');
const router  = express.Router();

//Load homepage
router.get('/', (req, res) => {
  getAllQuizzes()
    .then((quizzes) => {
      const templateVars = {quizzes};
      res.render('index', templateVars);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occured while retrieving quizzes.');
    });
});

//pulling quizzes from databases
router.get("/api/quizzes", (req, res) => {
  getAllQuizzes()
    .then((quizzes) => {
      const stringifyQuizzes = JSON.stringify(quizzes);
      // console.log(stringifyQuizzes);
      res.send(stringifyQuizzes);
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).send('An error occurred while retrieving quizzes.');
    });
});

module.exports = router;
