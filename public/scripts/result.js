$(document).ready(() => {

  $("#urlLink").click(function(){
    var dummy = document.createElement('input'),
    text = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    alert('URL Copied!');
  });


  $('#submit').click(() => {
    const quizId = window.location.pathname.split('/').pop();
    const answers = [];

  //   // Get selected answers for each question
  //   $('.quiz-questions .question').each((index, question) => {
  //     const questionId = $(question).data('question-id');
  //     const selectedAnswer = $(question).find('input[type=radio]:checked').val();

      answers.push({
        question_id: questionId,
        answer: selectedAnswer,
      });
    });
    // Send answers to the server for result calculation
    $.ajax({
      url: `/result/${quizId}`,
      method: 'POST',
      data: { answers },
      success: (response) => {
        // Redirect to the result page
        window.location.href = `/result/${quizId}`;
      },
      error: (error) => {
        console.log(error);
      },
    });
});

