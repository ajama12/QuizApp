const { getAllQuizzes } = require("../../db/queries/quiz");

$(document).ready(() => {

  //create quiz template
  const createQuiz = (quiz) => {
    console.log("Hi");
    return `
  <div class="quiz-row">
      <button class="quiz-item">${quiz.quiz_name}</button>
  </div>
  `;
  };

  const quizzesContainer = $("#quiz-container");

  //create box for each quiz
  const createQuizBox = (data) => {
    quizzesContainer.empty();
    data.forEach((quiz) => {
      quizzesContainer.append(createQuiz(quiz));
    });
  };

  //function to populate quiz boxes
  const getQuizData = () => {
    getAllQuizzes()
      .then(quizzes.map((quiz) => {
        return quiz.question_name;
      }))
      .then((quizName) => {
        return createQuizBox(quizName);
      })
      .catch((err) => {
        console.log("Populating quiz box failed", err);
      });
  };

  getQuizData();

});





























});
