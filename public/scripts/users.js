// Client facing scripts here

$(document).ready(() => {

  const userId = $("#user-id").data('userId');

  //create user info template
  const userInfo = function (user) {
    return `
        <h1>${user.username}</h1>
        <h1>${user.email}</h1>
      `;
  };

  const userInfoBox = $("#user-info-box");

  const getUserInfo = () => {
    console.log("reaching getUserInfo");
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

  getUserInfo();

});



// $(() => {
//   $('#fetch-users').on('click', () => {
//     $.ajax({
//       method: 'GET',
//       url: '/api/users'
//     })
//     .done((response) => {
//       const $usersList = $('#users');
//       $usersList.empty();

//       for(const user of response.users) {
//         $(`<li class="user">`).text(user.name).appendTo($usersList);
//       }
//     });
//   });
// });
