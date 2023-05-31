const express = require('express');
const router  = express.Router();
const { getUserByUserId } = require('../db/queries/users.js');
const { getHistoryByUserId, getUserHistory } = require('../db/queries/history.js');
const { getQuizzesByUserId, getQuizByUserId } = require('../db/queries/quiz.js');

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
router.get("/getUserId/:user_id", async(req, res) => {
  if (req.session.userId) {
    // console.log(req.session.userId);
    const user = await(getUserByUserId(req.params.user_id));
    const userStr = JSON.stringify(user);
    // console.log("user", user);
    // console.log(userStr);
    res.status(200).send(userStr);
  } else {
    res.status(401).send(null);
  }
});

//get user history
router.get("/getUserHistory/:user_id", async(req, res) => {
  if (req.session.userId) {
    await(getUserHistory(req.params.user_id))
      .then((history) => {
        // console.log("history", history);
        const historyStr = JSON.stringify(history);
        res.status(200).send(historyStr);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  } else {
    res.status(401).send(null);
  }
});

//get user quizzes
router.get("/getUserQuizzes/:user_id", async(req, res) => {
  if (req.session.userId) {
    await(getQuizByUserId(req.params.user_id))
      .then((quizzes) => {
        // console.log("userQuizzes", quizzes);
        const userQuizzesStr = JSON.stringify(quizzes);
        res.status(200).send(userQuizzesStr);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  } else {
    res.status(401).send(null);
  }
});

module.exports = router;
