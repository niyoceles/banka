function getBankAccount() {
  const token = localStorage.getItem('token');

  const urlBank = 'https://banka-apps.herokuapp.com/api/v1/accounts';
  // const urlBank = 'http://localhost:4000/api/v1/accounts';
  fetch(urlBank, {
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
        let bankAccount = '';
        bankAccount = `
        <table id="table">
          <tr>
            <th>User ID</th>
            <th>A/C No</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Opening Balance</th>
            <th>Location</th>
            <th>Create On</th>
          </tr>
          <tr>`;
        response.data.forEach((bank) => {
          bankAccount += `
            <td>${bank.id}</td>
            <td>${bank.accountNumber}</td> 
            <td>${bank.status}</td>
            <td>${bank.firstName} ${bank.lastName}</td>
            <td>${bank.email}</td>  
            <td>${bank.phone}</td> 
            <td>${bank.balance}</td> 
            <td>${bank.location}</td> 
            <td>${new Date(bank.createdDate).getDate()}/${new Date(bank.createdDate).getMonth() + 1}/${new Date(bank.createdDate).getFullYear()}
        ${new Date(bank.createdDate).getHours()}:${new Date(bank.createdDate).getMinutes()}</td>
          </tr>
          `;
        });
        document.getElementById('bankAccount').innerHTML = bankAccount;
      }
      if (response.status === 404) {
        document.getElementById('bankAccount').innerHTML = 'No Account found';
      }
      if (response.status === 401) {
        document.getElementById('bankAccount').innerHTML = `<h3 style="color: brown">${response.message} </h3>`;
      }
    })
    .catch((err) => {
      document.getElementById('bankAccount').innerHTML = '<h3 style="color: brown"> Error of Connection, Please check your internet connection and try again </h3>';
    });
}
getBankAccount();


// ACTIVATE OR DEACTIVATE ACCOUNT
document.getElementById('bankAccountForm').addEventListener('submit', activateDeactivate);

function activateDeactivate(e) {
  e.preventDefault();

  const accountNo = document.getElementById('account-no').value;
  const status = document.getElementById('status').value;

  // const urlActiveDeactive = `http://localhost:4000/api/v1/accounts/${accountNo}`;
  const urlActiveDeactive = `https://banka-apps.herokuapp.com/api/v1/accounts/${accountNo}`;

  const token = localStorage.getItem('token');

  fetch(urlActiveDeactive, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'access-token': token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      status,
    }),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        let dataInData = '';
        dataInData = `
        <table id="table">
        <tr>
        <th colspan="5">
          <h3>Account Successful ${response.data.status} </h3>
        </th>
      </tr>
      <tr>
        <th>Account Number</th>
        <th>Date</th>
        <th>Status</th>
        <th>Email Email</th>
        <th>Phone</th>
      </tr>
      <tr>`;
        dataInData += `
        <td>${response.data.id}</td>
        <td>${response.data.accountNumber}</td>
        <td>${response.data.status}</td>
        <td>${response.data.email}</td>
        <td>${response.data.phone}</td>
        </tr>
        `;
        document.getElementById('account').innerHTML = dataInData;
      }
      if (response.status === 404) {
        document.getElementById('account').innerHTML = `<h3 style="color: brown">${response.error} </h3>`;
      }
      if (response.status === 401) {
        document.getElementById('account').innerHTML = `<h3 style="color: brown">${response.message} </h3>`;
      }
    })
    .catch((err) => {
      document.getElementById('account').innerHTML = '<h3 style="color: brown">Error of Connection, Please check your internet connection and try again </h3>';
    });
}

// ADMIN DELETE USER ACCOUNT ACCOUNT
document.getElementById('deleteBankAccountForm').addEventListener('submit', deleteBankAccount);

function deleteBankAccount(e) {
  e.preventDefault();

  const accountNumber = document.getElementById('account-number').value;

  // const urlDeleteAccount = `http://localhost:4000/api/v1/account/${accountNumber}`;
  const urlDeleteAccount = `https://banka-apps.herokuapp.com/api/v1/account/${accountNumber}`;

  const token = localStorage.getItem('token');

  fetch(urlDeleteAccount, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'access-token': token,
      'Content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        document.getElementById('account').innerHTML = `<h3 style="color: brown">${response.message} </h3>`;;
      }
      if (response.status === 404) {
        document.getElementById('account').innerHTML = `<h3 style="color: brown">${response.error} </h3>`;
      }
      if (response.status === 401) {
        document.getElementById('account').innerHTML = `<h3 style="color: brown">${response.message} </h3>`;
      }
    })
    .catch((err) => {
      document.getElementById('account').innerHTML = '<h3 style="color: brown">Error of Connection, Please check your internet connection and try again </h3>';
    });
}