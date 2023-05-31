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
      return res.render('users', templateVars);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
});

//get user id
router.get("/getUserId/:user_id", (req, res) => {
  console.log("hi");
  if (req.session.userId) {
    const user = getUserByUserId(req.params.user_id);
    const userStr = JSON.stringify(user);
    res.status(200).send(userStr);
  } else {
    res.status(401).send(null);
  }
});


module.exports = router;
