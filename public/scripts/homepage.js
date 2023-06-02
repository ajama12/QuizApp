$(document).ready(() => {

  //create quiz template
  const createQuiz = (quiz) => {
    return `
      <div class="quiz-row">
          <button class="quiz-item" id="quiz-item" onclick="location.href='/quiz/${quiz.id}'">${quiz.quiz_name}</button>
      </div>
  `;
  };

  const quizzesContainer = $("#quiz-container");

  //create box for each quiz
  const createQuizBox = (quizzesData) => {
    quizzesContainer.empty();
    quizzesData.forEach((quiz) => {
      quizzesContainer.append(createQuiz(quiz));
    });
  };

  //ajax request to grab info from backend and populate boxes
  const getQuizData = () => {
    const config = {
      method: "GET",
      url: "/api/quizzes",
      success: (quizzes) => {
        const quizzesObj = JSON.parse(quizzes);
        createQuizBox(quizzesObj);
      },
      error: (err) => {
        console.log("Err", err);
      }
    };
    $.ajax(config);
  };

  getQuizData();

});
