$(document).ready(() => {
  const userId = $("#user-id").attr("data-user-id");

  //when we submit the form
  $("#quiz-submission-form").submit((event) => {
    event.preventDefault();
    //ajax request save to database and redirect to new quiz

    const postNewQuiz = () => {
      console.log("postNewQuiz reached");
      const quizData = {
        quizName: $("#quiz_title").val().trim(),
        quizDesc: $("#quiz_description").val().trim(),
        isPrivate: $("#private").is(":checked"),
        questions: [
          {
            questionPrompt: $("#question_1").val().trim(),
            answers: [
              {answer: $("#answer1_1").val().trim(), isCorrect: true},
              {answer: $("#answer1_2").val().trim(), isCorrect: false},
            ],
          },
          {
            questionPrompt: $("#question_2").val().trim(),
            answers: [
              {answer: $("#answer2_1").val().trim(), isCorrect: true },
              {answer: $("#answer2_2").val().trim(), isCorrect: false },
            ],
          },
          {
            questionPrompt: $("#question_3").val().trim(),
            answers: [
              {answer: $("#answer3_1").val().trim(), isCorrect: true },
              {answer: $("#answer3_2").val().trim(), isCorrect: false },
            ],
          },
          {
            questionPrompt: $("#question_4").val().trim(),
            answers: [
              {answer: $("#answer4_1").val().trim(), isCorrect: true },
              {answer: $("#answer4_2").val().trim(), isCorrect: false },
            ],
          },
          {
            questionPrompt: $("#question_5").val().trim(),
            answers: [
              {answer: $("#answer5_1").val().trim(), isCorrect: true },
              {answer: $("#answer5_2").val().trim(), isCorrect: false },
            ],
          },
        ],
      };
      console.log("quizData:", quizData);
      const config = {
        method: "POST",
        url: "/createQuiz/" + userId,
        data: quizData,
        success: (quizId) => {
          console.log("Successfully created quiz!");
          const quizIdObj = JSON.parse(quizId);
          location.href = '/quiz/' + quizIdObj;
        },
        error: (err) => {
          console.log("Err", err);
        },
      };

      $.ajax(config);
    };

    postNewQuiz();
  });


});
