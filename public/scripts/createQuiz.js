$(document).ready(() => {

  //when we submit the form
  $("#quiz-submission-form").submit((event) => {
    event.preventDefault();
    //ajax request save to database and redirect to new quiz
    const postNewQuiz = () => {
      console.log("postNewQuiz reached");
      const quizData = {
        userId: $("#user-id").data("user-id"),
        quizName: $("#quiz_title").val().trim(),
        quizDesc: $("#quiz_description").val().trim(),
        isPrivate: $("#private").is(":checked"),
        questions: [
          {
            questionText: $("#question_1").val().trim(),
            answers: [
              $("#answer1_1").val().trim(),
              $("#answer1_2").val().trim(),
            ],
          },
          {
            questionText: $("#question_2").val().trim(),
            answers: [
              $("#answer2_1").val().trim(),
              $("#answer2_2").val().trim(),
            ],
          },
          {
            questionText: $("#question_3").val().trim(),
            answers: [
              $("#answer3_1").val().trim(),
              $("#answer3_2").val().trim(),
            ],
          },
          {
            questionText: $("#question_4").val().trim(),
            answers: [
              $("#answer4_1").val().trim(),
              $("#answer4_2").val().trim(),
            ],
          },
          {
            questionText: $("#question_5").val().trim(),
            answers: [
              $("#answer5_1").val().trim(),
              $("#answer5_2").val().trim(),
            ],
          },
        ],
      };
      console.log("quizData:", quizData);
      const config = {
        method: "POST",
        url: "/createQuiz",
        data: JSON.stringify(quizData),
        contentType: "application/json",
        dataaType: "json",
        success: () => {
          console.log("Successfully created quiz!");
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
