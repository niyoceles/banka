function getUserAccount() {
  const token = localStorage.getItem('token');

  const urlUser = 'https://banka-apps.herokuapp.com/api/v1/auth/users';
  // const urlUser = 'http://localhost:4000/api/v1/auth/users';
  fetch(urlUser, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'access-token': token,
      'Content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 200) {
        let userAccount = '';
        userAccount = `
        <table id="table">
          <tr>
            <th>ID</th>
            <th>Names</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Username</th>
            <th>Location</th>
            <th>Type of user</th>
            <th>Create On</th>
          </tr>
          <tr>`;
        response.data.forEach((user) => {
          userAccount += `
            <td>${user.id}</td>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>  
            <td>${user.phone}</td> 
            <td>${user.userName}</td> 
            <td>${user.location}</td> 
            <td>${user.type}</td> 
            <td>${new Date(user.createdDate).getDate()}/${new Date(user.createdDate).getMonth() + 1}/${new Date(user.createdDate).getFullYear()}
        ${new Date(user.createdDate).getHours()}:${new Date(user.createdDate).getMinutes()}</td>
          </tr>
          `;
        });
        document.getElementById('userAccount').innerHTML = userAccount;
      }
      if (response.status === 404) {
        document.getElementById('userAccount').innerHTML = 'No Account found';
      }
      if (response.status === 401) {
        document.getElementById('userAccount').innerHTML = `<h3 style="color: brown">${response.message} </h3>`;
      }
    })
    .catch((err) => {
      document.getElementById('userAccount').innerHTML = '<h3 style="color: brown"> Error of Connection, Please check your internet connection and try again </h3>';
    });
}
getUserAccount();
