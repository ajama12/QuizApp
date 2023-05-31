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
    console.log(quizzesData);
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
        // console.log("Successfully retrieved quizzes");
        // console.log("ajax quizzes", quizzes);
        const quizzesObj = JSON.parse(quizzes);
        // console.log("ajax parsed", quizzesObj);
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
