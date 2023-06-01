$(document).ready(() => {

  const quizButtonContainer = $("#quiz-button-container");

  //creates the button depending if logged in or not
  const updateCreateQuizButton = function (user) {
    console.log("reached updateCreateQuizButton");
    console.log(user);
    console.log(user.id);
    if (user !== null && user !== "") {
      console.log("hitting if statement");
      return `
      <form>
      <button onclick="location.href='/createQuiz/${user.id}" id="create-Quiz-Button" class="header-buttons">Create Quiz</button>
      </form>
      `;
    } else {
      return " ";

    }
  };

  //appends create quiz button into html container
  const createQuizButtonBox = function(user) {
    console.log("reached createQuizButtonBox");
    quizButtonContainer.empty();
    quizButtonContainer.append(updateCreateQuizButton(user));

  };

  //ajax request to figure out if we are logged in
  const checkLoggedInStatus = () => {
    const config = {
      method: "GET",
      url: "/login/userActive",
      success: (user) => {
        console.log("Successfully retrieved user", user);
        // const userObj = JSON.parse(user);
        console.log(user);
        createQuizButtonBox(user);
      },
      error: (err) => {
        console.log("Not logged in", err);
      },
    };

    $.ajax(config);
  };

  checkLoggedInStatus();

const quizButtonContainer = $("#quiz-button-container");

  //creates the button depending if logged in or not
  const updateCreateQuizButton = function (user) {
    console.log("reached updateCreateQuizButton");
    console.log(user);
    console.log(user.id);
    if (user !== null && user !== "") {
      console.log("hitting if statement");
      return `
      <form>
      <button onclick="location.href='/createQuiz/${user.id}" id="create-Quiz-Button" class="header-buttons">Create Quiz</button>
      </form>
      `;
    } else {
      return " ";

    }
  };

  //appends button into html container
  const createQuizButtonBox = function(user) {
    console.log("reached createQuizButtonBox");
    quizButtonContainer.empty();
    quizButtonContainer.append(updateCreateQuizButton(user));

  };

  //ajax request to figure out if we are logged in
  const checkLoggedInStatus = () => {
    const config = {
      method: "GET",
      url: "/login/userActive",
      success: (user) => {
        console.log("Successfully retrieved user", user);
        // const userObj = JSON.parse(user);
        console.log(user);
        createQuizButtonBox(user);
      },
      error: (err) => {
        console.log("Not logged in", err);
      },
    };

    $.ajax(config);
  };

  checkLoggedInStatus();


});
