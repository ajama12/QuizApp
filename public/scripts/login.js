$(document).ready(() => {

//when we submit the form
  $("#loginForm").submit(() => {

    //ajax request to get users from database
    const getUser = () => {
      const userData = {
        email: $("#email").val().trim(),
        password: $("#password").val().trim()
      };
      const config = {
        method: "POST",
        url: "/login",
        data: userData,
        success: (user) => {
          console.log("Successfully retrieved user", user);
        },
        error: (err) => {
          console.log("Err", err);
        }
      };

      $.ajax(config);

    };

    getUser();

  });

});
