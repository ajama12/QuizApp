const db = require('../connection');

const getHistoryByUserId = function(userId) {
  return db
    .query(`SELECT *
    FROM history
    WHERE user_id = $1`, [userId])
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      } else {
        return result.rows;
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getHistoryByQuizId = function(quizId) {
  return db
    .query(`SELECT *
    FROM history
    WHERE quiz_id = $1`, [quizId])
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      } else {
        return result.rows;
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const addHistory = function(userId, quizId, recentScore) {
  return db
    .query(`INSERT INTO history (user_id, quiz_id, recent_score) VALUES ($1, $2, $3) RETURNING *`, [userId, quizId, recentScore])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const calcHistory = function(

);

module.exports = { getHistoryByUserId, getHistoryByQuizId, addHistory };
