const express = require('express');
const router  = express.Router();
const { getUserByUserId } = require('../db/queries/users.js');
const { getHistoryByUserId } = require('../db/queries/history.js');
const { getQuizzesByUserId } = require('../db/queries/quiz.js');

//load user profile page
router.get('/:user_id', (req, res) => {
  const templateVars = {};
  getUserByUserId(req.params.user_id)
    .then((user) => {
      templateVars.user = user;
      return getHistoryByUserId(req.params.user_id);
    })
    .then((history) => {
      templateVars.history = history;
      return getQuizzesByUserId(req.params.user_id);
    })
    .then((quizzes) => {
      templateVars.quizzes = quizzes;
      return res.render('userProfile', templateVars);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
});

module.exports = router;
