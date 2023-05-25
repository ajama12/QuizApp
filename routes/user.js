const express = require('express');
const router  = express.Router();
const { getUserByEmail } = require('./db/queries/users.js');
const { getHistoryByUserId } = require('./db/queries/history.js');
const { getQuizzesByUserId } = require('./db/queries/quiz.js');




module.exports = router;
