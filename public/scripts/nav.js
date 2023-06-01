$(document).ready(() => {

  const quizButtonContainer = $("#quiz-button-container");

  //creates the button depending if logged in or not
  const updateCreateQuizButton = function (user) {
    if (user !== null && user !== "") {
      return `
      <button onclick="location.href='/createQuiz/${user.id}'" id="create-Quiz-Button" class="header-buttons">Create Quiz</button>
      `;
    } else {
      return " ";

    }
  };

  //appends button into html container
  const createQuizButtonBox = function(user) {
    quizButtonContainer.empty();
    quizButtonContainer.append(updateCreateQuizButton(user));

  };

  //ajax request to figure out if we are logged in
  const checkLoggedInStatus = () => {
    const config = {
      method: "GET",
      url: "/login/userActive",
      success: (user) => {
        createQuizButtonBox(user);
        createUserProfileButtonBox(user);
      },
      error: (err) => {
        console.log("Not logged in", err);
      },
    };

    $.ajax(config);
  };

  const profilePictureButton = $("#profile-picture-button");

  //creates the user profile button depending if logged in or not
  const updateUserProfileButton = function(user) {
    if (user !== null && user !== "") {
      return `
        <button class="logo" onclick="location.href='/user/${user.id}'">
          <img id="man-profile-pic" src="https://freesvg.org/img/winkboy.png">
        </button>
      `;
    } else {
      return "";

    }
  };

  //appends button into html container
  const createUserProfileButtonBox = function(user) {
    profilePictureButton.empty();
    profilePictureButton.append(updateUserProfileButton(user));

  };

  checkLoggedInStatus();

});
