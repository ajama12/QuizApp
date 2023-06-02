const db = require('../connection');
const { getCorrectAnswers } = require('./answers');
const { getQuestionsByQuizId } = require('./questions');

const getAllQuizzes = function() {
  return db
    .query(`SELECT *
    FROM quiz
    WHERE is_private = false`)
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getQuizByUserId = function(userId) {
  return db
    .query(`SELECT *
  FROM quiz
  WHERE user_id = $1`, [userId])
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getQuizByQuizId = function(quizId) {
  return db
    .query(`SELECT *
    FROM quiz
    WHERE id = $1`, [quizId])
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getQuizzesByUserId = function(userId) {
  return db
    .query(`SELECT *
    FROM quiz
    WHERE user_id = $1`, [userId])
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const addQuiz = function(userId, quizName, quizDesc, isPrivate) {
  console.log("reached addQuiz database");
  return db
    .query(`INSERT INTO quiz (user_id, quiz_name, quiz_desc, is_private)
    VALUES ($1, $2, $3, $4) RETURNING *`, [userId, quizName, quizDesc, isPrivate])
    .then((result) => {
      // console.log(result);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getQuizCorrectAnswers = function(quizId) {
  // console.log('QuizId', quizId)
  return getQuizByQuizId(quizId)
    .then((quiz) => {
      // console.log('Quiz', quiz)
      if (!quiz) {
        throw new Error("Quiz does not exist!");
      } else {
         return getQuestionsByQuizId(quizId)
          .then((questions) => {
            // console.log('Questions', questions)
            const questionIds = questions.map((question) => question.id);
            // console.log('Questions ID', questionIds)
            return getCorrectAnswers(quizId, questionIds);
          })
          .then((correctAnswers) => {
            // console.log('Correct Answers', correctAnswers)
            return {correctAnswers, quiz}
          })
      }
  })       
};

module.exports = { getAllQuizzes, getQuizByQuizId, getQuizzesByUserId, addQuiz, getQuizByUserId, getQuizCorrectAnswers };
