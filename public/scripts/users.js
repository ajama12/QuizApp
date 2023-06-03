// Client facing scripts here

$(document).ready(() => {
  const userId = $("#user-id").data("userId");
  const userInfoBox = $(".user-info-box");
  const quizHistoryContainer = $(".quiz-history-container");
  const userContentBox = $("#user-info-box .user-info-content");

  //create user info template
  const userInfo = function (user) {
    return `
      <p>${user.username}</p>
      <p>${user.email}</p>
      `;
  };

  //ajax request to get user
  const getUserInfo = () => {
    const config = {
      method: "GET",
      url: `/user/getUserId/${userId}`,
      success: (user) => {
        console.log("Successfully retrieved user");
        console.log(user);
        const userObj = JSON.parse(user);
        userInfoBox.empty().append(userInfo(userObj));
        // Append user info to 'user-info-content'
        userContentBox.empty().append(userInfo(userObj));
      },
      error: (err) => {
        console.log("Err", err);
      },
    };
    $.ajax(config);
  };

  //create history template
  const createHistoryInfo = function(history) {
    return `
      <p> Quiz: ${history.quiz_name} </p>
      <p> Percentage: ${history.recent_score}%</p>
      `;
  };

  //create separate history lines
  const createHistoryBox = (history) => {
    quizHistoryContainer.empty();
    history.forEach((historyInfo) => {
      // append history info to 'quiz-history-container'
      quizHistoryContainer.append(createHistoryInfo(historyInfo));
    });
  };

  //ajax request to get history
  const fetchUserHistory = () => {
    const config = {
      method: "GET",
      url: `/user/getUserHistory/${userId}`,
      success: (history) => {
        const userHistory = JSON.parse(history);
        createHistoryBox(userHistory);
      },
      error: (err) => {
        console.log("Err", err);
      },
    };
    $.ajax(config);
  };

  const myQuizzesContainer = $("#my-quizzes-container");

  //add created quizzes to profile
  const createUserQuizBox = (quizzes) => {
    myQuizzesContainer.empty();
    quizzes.forEach((quiz) => {
      const button = `<button class="quiz-item" id="quiz-item" onclick="location.href='/quiz/${quiz.id}'">${quiz.quiz_name}</button>`;
      myQuizzesContainer.append(button);
    });
  };

  //ajax request to get quizzes
  const getUserQuizzes = () => {
    const config = {
      method: "GET",
      url: `/user/getUserQuizzes/${userId}`,
      success: (quizzes) => {
        console.log("Successfully retrieved user quizzes");
        console.log(quizzes);
        const userQuizzes = JSON.parse(quizzes);
        console.log(quizzes);
        createUserQuizBox(userQuizzes);
      },
      error: (err) => {
        console.log("Err", err);
      },
    };
    $.ajax(config);
  };

  getUserInfo();

  fetchUserHistory();

  getUserQuizzes();
});
