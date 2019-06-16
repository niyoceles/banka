const $ = document;
function getResponseUsers(response) {
  if (response.status === 200) {
    response.data.forEach((user) => {
      let row = '';
      Object.keys(user).forEach((key) => {
        row += key === 'createdDate' ? `<td>${new Date(user.createdDate).toDateString()} ${new Date(user.createdDate).getHours()}:${new Date(user.createdDate).getMinutes()}</td>` : `<td>${user[key]}</td>`;
      });
      $.querySelector('#userAccount #table').innerHTML += `<tr>${row}</tr>`;
    });
  } else {
    $.getElementById('userAccount').innerHTML = (response.status === 404 && 'No Account found') || (response.status === 401 && `<h3 style="color: brown">${response.message}</h3>`) || '';
  }
}

function getUsersAccount() {
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
      getResponseUsers(response);
    })
    .catch((err) => {
      console.log(err);
      $.getElementById('userAccount').innerHTML = '<h3 style="color: brown"> Error of Connection, Please check your internet connection and try again </h3>';
    });
}
getUsersAccount();

// check user by email
$.getElementById('accountFormModal').addEventListener('submit', checkUserAccount);

function getResponseUser(response) {
  if (response.status === 200) {
    let htmlTableData = '';
    htmlTableData = `
    <table id="table">
  <tr>
    <th>ID</th>
    <th>Account Number</th>
    <th>Opening Balance</th>
    <th>email</th>
    <th>Owner</th>
    <th>Type</th>
    <th>Status</th>
    <th>Date Created</th>
  </tr>
  <tr>`;
    response.data.forEach((account) => {
      htmlTableData += `
  <td>${account.id}</td>
  <td>${account.accountNumber}</td>
  <td>${account.balance}</td>
  <td>${account.email}</td>
  <td>${account.owner}</td>
  <td>${account.type}</td>
  <td>${account.status}</td>
  <td>${new Date(account.createdOn).getDate()}/${new Date(account.createdOn).getMonth() + 1}/${new Date(account.createdOn).getFullYear()}
  ${new Date(account.createdOn).getHours()}:${new Date(account.createdOn).getMinutes()}</td>
  </tr>
  `;
    });
    $.getElementById('account').innerHTML = htmlTableData;
  }
  if (response.status === 404) {
    $.getElementById('account').innerHTML = `<h3 style="color: brown">${response.error} </h3>`;
  }
  if (response.status === 401) {
    $.getElementById('account').innerHTML = `<h3 style="color: brown">${response.message} </h3>`;
  }
}

function checkUserAccount(e) {
  e.preventDefault();
  const userEmail = $.getElementById('user-email').value;
  // const urlCheckUser = `http://localhost:4000/api/v1/user/${userEmail}/accounts`;
  const urlCheckUser = `https://banka-apps.herokuapp.com/api/v1/user/${userEmail}/accounts`;
  const token = localStorage.getItem('token');

  fetch(urlCheckUser, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'access-token': token,
      'Content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((response) => {
      getResponseUser(response);
    })
    .catch((err) => {
      $.getElementById('account').innerHTML = '<h3 style="color: brown">Error of Connection, Please check your internet connection and try again </h3>';
    });
}

$.getElementById('createAccountForm').addEventListener('submit', createStaffUser);

function getResponse(response) {
  if (response.status === 201) {
    $.querySelector('#success-staff').innerHTML = `Account Successful Created ${response.data.firstName} ${response.data.email}!`;
    setTimeout(() => {
      window.location = './admin.html';
    }, 1500);
  }
  if (response.status === 400) {
    $.querySelector(`#${response.error[0].field}-error`).innerHTML = response.error[0].message;
  }
  if (response.status === 200) {
    $.getElementById('exist-error').innerHTML = `<h3 style="color: brown">${response.error[0].message} </h3>`;
  }
  if (response.status === 401) {
    $.getElementById('authorization-error').innerHTML = `<h3 style="color: brown">${response.message} </h3>`;
  }
}

function createStaffUser(e) {
  e.preventDefault();
  let data = { };
  Object.keys(e.target).forEach((key) => {
    if ($.querySelector(`#${e.target[key].getAttribute('id')}-error`)) {
      $.querySelector(`#${e.target[key].getAttribute('id')}-error`).innerHTML = '';
    }
    data = { ...data, [e.target[key].getAttribute('id')]: e.target[key].value };
  });
  // const urlCreateStaff = 'http://localhost:4000/api/v1/auth/user';
  const urlCreateStaff = 'https://banka-apps.herokuapp.com/api/v1/auth/user';
  // errors
  Object.keys(e.target).forEach((key, value) => {
    data = { ...data, [e.target[key].getAttribute('id')]: e.target[key].value };
  });

  const token = localStorage.getItem('token');

  fetch(urlCreateStaff, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'access-token': token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then((response) => {
      getResponse(response);
    })
    .catch((err) => {
      $.getElementById('connection-error').innerHTML = '<h3 style="color: brown">Error of Connection, Please check your internet connection and try again </h3>';
    });
}
