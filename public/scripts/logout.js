$(document).ready(() => {

  const logButton = $("#logButton");

  const updateUserButton = function(user) {
    if (user !== null && user !== "") {
      logButton.empty().html("Log Out");
    } else {
      logButton.empty().html("Log In");
    }
  };

  //ajax request to figure out if we are logged in
  const checkLoggedInStatus = () => {
    const config = {
      method: "GET",
      url: "/login/userActive",
      success: (user) => {
        // console.log("Successfully retrieved user", user);
        updateUserButton(user);
      },
      error: (err) => {
        console.log("Err", err);
      }
    };

    $.ajax(config);

  };

  checkLoggedInStatus();

  //when button is clicked
  logButton.click((event) => {
    event.preventDefault();
    //user is logged in
    if (logButton.html() === "Log Out") {
      $.ajax({
        url: '/logout',
        method: 'POST',
        success: () => {
          logButton.empty().html('Log In');
          location.href = '/';
        },
      });
    } else {
      //user is logged out
      location.href = '/login';
    }
  });
});


