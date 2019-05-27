// Active Account
class AccountByStatus {
  static successResults(response) {
    if (response.status === 200) {
      let accountsByStatus = '';
      accountsByStatus = `
  <table id="table">
    <tr>
      <th>ID</th>
      <th>Account Number</th>
      <th>Status</th>
      <th>Names</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Username</th>
      <th>Location</th>
      <th>Type of user</th>
      <th>Create On</th>
    </tr>
    <tr>`;
      response.data.forEach((activeAccount) => {
        accountsByStatus += `
      <td>${activeAccount.id}</td>
      <td>${activeAccount.accountNumber}</td>
      <td>${activeAccount.status}</td> 
      <td>${activeAccount.firstName} ${activeAccount.lastName}</td>
      <td>${activeAccount.email}</td>  
      <td>${activeAccount.phone}</td> 
      <td>${activeAccount.userName}</td> 
      <td>${activeAccount.location}</td> 
      <td>${activeAccount.type}</td> 
      <td>${new Date(activeAccount.createdDate).getDate()}/${new Date(activeAccount.createdDate).getMonth() + 1}/${new Date(activeAccount.createdDate).getFullYear()}
  ${new Date(activeAccount.createdDate).getHours()}:${new Date(activeAccount.createdDate).getMinutes()}</td>
    </tr>
    `;
      });
      document.getElementById('accountsByStatus').innerHTML = accountsByStatus;
    }
  }

  static errorResults(response) {
    if (response.status === 404) {
      document.getElementById('accountsByStatus').innerHTML = 'No Account found';
    }
    if (response.status === 401) {
      document.getElementById('accountsByStatus').innerHTML = `<h3 style="color: brown">${response.message} </h3>`;
    }
  }

  static activatedAccount() {
    document.getElementById('activeAccount').addEventListener('click', () => {
      const token = localStorage.getItem('token');
      const urlActiveAccount = 'https://banka-apps.herokuapp.com/api/v1/v2/accounts?status=active';
      // const urlActiveAccount = 'http://localhost:4000/api/v1/v2/accounts?status=active';
      fetch(urlActiveAccount, {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'access-token': token,
          'Content-type': 'application/json',
        },
      })
        .then(res => res.json())
        .then((response) => {
          AccountByStatus.successResults(response);
          AccountByStatus.errorResults(response);
        })
        .catch((err) => {
          document.getElementById('accountsByStatus').innerHTML = '<h3 style="color: brown"> Error of Connection, Please check your internet connection and try again </h3>';
        });
    });
  }

  // Dormant Account
  static dormantAccount() {
    document.getElementById('dormantAccount').addEventListener('click', () => {
      const token = localStorage.getItem('token');
      const urlDormantAccount = 'https://banka-apps.herokuapp.com/api/v1/v2/accounts?status=dormant';
      // const urlDormantAccount = 'http://localhost:4000/api/v1/v2/accounts?status=dormant';
      fetch(urlDormantAccount, {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'access-token': token,
          'Content-type': 'application/json',
        },
      })
        .then(res => res.json())
        .then((response) => {
          AccountByStatus.successResults(response);
          AccountByStatus.errorResults(response);
        })
        .catch((err) => {
          document.getElementById('accountsByStatus').innerHTML = '<h3 style="color: brown"> Error of Connection, Please check your internet connection and try again </h3>';
        });
    });
  }
}
AccountByStatus.activatedAccount();
AccountByStatus.dormantAccount();
