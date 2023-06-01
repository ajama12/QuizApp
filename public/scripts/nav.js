$(document).ready(() => {

  const quizButtonContainer = $("#quiz-button-container");

  //creates the button depending if logged in or not
  const updateCreateQuizButton = function (user) {
    // console.log("reached updateCreateQuizButton");
    // console.log(user);
    // console.log(user.id);
    if (user !== null && user !== "") {
      // console.log("hitting if statement");
      return `
      <button onclick="location.href='/createQuiz/${user.id}'" id="create-Quiz-Button" class="header-buttons">Create Quiz</button>
      `;
    } else {
      return " ";

    }
  };

  //appends button into html container
  const createQuizButtonBox = function(user) {
    // console.log("reached createQuizButtonBox");
    quizButtonContainer.empty();
    quizButtonContainer.append(updateCreateQuizButton(user));

  };

  //ajax request to figure out if we are logged in
  const checkLoggedInStatus = () => {
    const config = {
      method: "GET",
      url: "/login/userActive",
      success: (user) => {
        // console.log("Successfully retrieved user", user);
        // console.log(user);
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
    // console.log("reached updateUserProfileButton");
    // console.log(user);
    // console.log(user.id);
    if (user !== null && user !== "") {
      // console.log("hitting if statement");
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
    // console.log("reached userProfileButtonBox");
    profilePictureButton.empty();
    profilePictureButton.append(updateUserProfileButton(user));

  };

  checkLoggedInStatus();

});
