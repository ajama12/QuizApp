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

const getQuizById = function(id) {
  return db
    .query(`SELECT *
    FROM quiz
    WHERE id = $1`, [id])
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

const addQuiz = function(user_id, quiz_name, quiz_description, is_private) {
  return db
    .query(`INSERT INTO quiz (user_id, quiz_name, quiz_description, is_private)
    VALUES ($1, $2, $3, $4) RETURNING *`, [user_id, quiz_name, quiz_description, is_private])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};


module.exports = { getAllQuizzes, getQuizById, getQuizzesByUserId, addQuiz };
