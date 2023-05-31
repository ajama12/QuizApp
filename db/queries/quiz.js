const db = require('../connection');

const getAllQuizzes = function() {
  return db
    .query(`SELECT *
    FROM quiz`)
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
  // console.log("testing, reached db");
  return db
    .query(`SELECT *
    FROM quiz
    WHERE id = $1`, [quizId])
    .then((result) => {
      if (result.rows.length > 0) {
        console.log(result.rows);
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
  return db
    .query(`INSERT INTO quiz (user_id, quiz_name, quiz_desc, is_private)
    VALUES ($1, $2, $3, $4) RETURNING *`, [userId, quizName, quizDesc, isPrivate])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

module.exports = { getAllQuizzes, getQuizByQuizId, getQuizzesByUserId, addQuiz, getQuizByUserId };
