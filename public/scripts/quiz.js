$(document).ready(() => {
  //create quiz template
  const createQuiz = (quiz) => {
    return `
      <div class="question-1">
        <label for="quiz_description1">${quiz.question_prompt}</label><br>
        <input type="radio" name="question1" id="Q1Answer1">
        <label for="answer1">${quiz.answers}</label>
        <input type="radio" name="question1" id="Q1Answer2">
        <label for="answer2">${quiz.answers}</label>
      </div>
    `;
  };

  const quizzesContainer = $("#quiz-container");
  const createQuestionBox = (quizzesData) => {
    quizzesContainer.empty();
    console.log(quizzesData);
    quizzesData.forEach((quiz) => {
      quizzesContainer.append(createQuiz(quiz));
    });
  };

  const getQuestionData = () => {
    const config = {
      method: "GET",
      url: "/api/questions/1",
      success: (questions) => {
        console.log('questions', questions);
        
        // const questionsObj = JSON.parse(questions);
        createQuestionBox(questions);
      },
      error: (err) => {
        console.log("Err", err);
      },
    };
    $.ajax(config);
  };
  getQuestionData();
});

// let answers = {};
// $("input[type='radio']:checked").each(function() {
//   let questionId = $(this).attr("name");
//   let answer = $(this).attr("id");
//   answers[questionId] = answer;
// });

// $.ajax({
//   type: "POST",
//   url: "/quiz/api",
//   data: JSON.stringify(answers),
//   contentType: "application/json; charset=utf-8",
//   success: function (response) {
//     // On success, redirect to the results page
//     window.location.href = '/results';
//   },
//   error: function (err) {
//     console.log(err);
//   },
// });

// const getAnswersByQuestionId = () => {
//   const config = {
//     url: "/api/quiz",
//     method: "GET",
//     success: (getCorrectAnswers) => {
