$(document).ready(() => {
  $('#quizForm').submit((e) => {
    e.preventDefault();

      const getQuestionData = () => {
        const config ={
          method: "POST",
          URL: "/api/quizzes",
          success : (questions) => {
            const questionsObj = JSON.parse(questions);
            createQuestionBox(questionsObj);
          },
          error: (err) => {
            console.log("Err", err);
          }
        }   
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
      