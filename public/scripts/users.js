// Client facing scripts here

$(document).ready(() => {

  const userId = $("#user-id").data('userId');

  //create user info template
  const userInfo = function(user) {
    return `
        <h1>${user.username}</h1>
        <h1>${user.email}</h1>
      `;
  };

  const userInfoBox = $("#user-info-box");

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
      },
      error: (err) => {
        console.log("Err", err);
      }
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

  const quizHistoryContainer = $("#quiz-history-container");

  //create sepereate history lines
  const createHistoryBox = (history) => {
    quizHistoryContainer.empty();
    history.forEach((score) => {
      quizHistoryContainer.append(createHistoryInfo(score));
    });
  };

  //ajax request to get history
  const fetchUserHistory = () => {
    const config = {
      method: "GET",
      url: `/user/getUserHistory/${userId}`,
      success: (history) => {
        console.log("Successfully retrieved user history");
        console.log(history);
        const userHistory = JSON.parse(history);
        createHistoryBox(userHistory);
      },
      error: (err) => {
        console.log("Err", err);
      }
    };
    $.ajax(config);

  };

  getUserInfo();

  fetchUserHistory();

});

