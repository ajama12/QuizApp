const db = require('../connection');

const getQuestionsByQuizId = function(quizId) {
  return db
    .query(`SELECT *
    FROM questions
    WHERE quiz_id = $1`, [quizId])
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

const addQuestion = function(quizId, questionPrompt) {
  return db
    .query(`INSERT INTO questions (quiz_id, question_prompt) VALUES ($1, $2) RETURNING *`, [quizId, questionPrompt])
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

module.exports = { getQuestionsByQuizId, addQuestion };
