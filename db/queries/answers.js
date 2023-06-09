const db = require('../connection');

const getAnswersByQuestionId = function(questionId) {
  return db
    .query(`SELECT *
    FROM answers
    WHERE question_id = $1`, [questionId])
    .then((result) => {
      console.log("questionId", questionId);
      if (result.rows.length > 0) {
        return result.rows;
      } else {
        return [];
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getCorrectAnswers = function(quizId, questionIds) {
  const answerOutput = questionIds.map((questionId) => {
    return db
      .query(`SELECT *
      FROM answers
      WHERE quiz_id = $1
      AND question_id = $2
      AND is_correct = true`, [quizId, questionId])
      .then((result) => {
        if (result.rows.length > 0) {
          // console.log("result.rows[0]", result.rows[0]);
          return result.rows[0];
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  });
  return Promise.all(answerOutput);
};

const addAnswer = function(quizId, questionId, answer, isCorrect) {
  return db
    .query(`INSERT INTO answers (quiz_id, question_id, answer, is_correct) VALUES ($1, $2, $3, $4) RETURNING *`, [quizId, questionId, answer, isCorrect])
    .then((result) => {
      // console.log("add answer", result.rows);
      // console.log("answer rows", result.rows[0]);
      return result.rows;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

module.exports = { getAnswersByQuestionId, getCorrectAnswers, addAnswer };
