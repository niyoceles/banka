document.getElementById('transactionIdAccountForm').addEventListener('submit', checkTransactionId);
document.getElementById('debitAccountForm').addEventListener('submit', createDebitAccount);
document.getElementById('creditAccountForm').addEventListener('submit', createCreditAccount);

function checkTransactionId(e) {
  e.preventDefault();

  const transactionId = document.getElementById('transaction-id').value;

  // const urlTransactionId = `http://localhost:4000/api/v1/transactions/${transactionId}`;
  const urlTransactionId = `https://banka-apps.herokuapp.com/api/v1/transactions/${transactionId}`;

  const token = localStorage.getItem('token');

  fetch(urlTransactionId, {
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
        let htmlTableData = '';
        htmlTableData = `
        <table id="table">
      <tr>
        <th>Tranct. Id</th>
        <th>Account Number</th>
        <th>Date</th>
        <th>Credit/Debit</th>
        <th>Amount</th>
        <th>Old Balance</th>
        <th>New Balance</th>
        <th>Reason</th>
      </tr>
      <tr>`;
        htmlTableData += `
        <td>${response.data.id}</td>
        <td>${response.data.accountNumber}</td>
        <td>${new Date(response.data.createdOn).getDate()}/${new Date(response.data.createdOn).getMonth() + 1}/${new Date(response.data.createdOn).getFullYear()}
        ${new Date(response.data.createdOn).getHours()}:${new Date(response.data.createdOn).getMinutes()}</td>
        <td>${response.data.type}</td>
        <td>${response.data.amount}</td>
        <td>${response.data.oldBalance}</td>
        <td>${response.data.newBalance}</td>
        <td>${response.data.reason}</td>
        </tr>
        `;

        document.getElementById('transaction').innerHTML = htmlTableData;
      }
      if (response.status === 404) {
        document.getElementById('transaction').innerHTML = `<h3 style="color: brown">${response.error} </h3>`;
      }
      if (response.status === 401) {
        document.getElementById('transaction').innerHTML = `<h3 style="color: brown">${response.message} </h3>`;
      }
    })
    .catch((err) => {
      document.getElementById('transaction').innerHTML = '<h3 style="color: brown">Error of Connection, Please check your internet connection and try again </h3>';
    });
}

// User Debit account
function createDebitAccount(e) {
  e.preventDefault();
  const accountNumber = document.getElementById('account-no-db').value;
  const amount = document.getElementById('account-amount-db').value;
  const reason = document.getElementById('debit-reason').value;

  const urlDebit = `https://banka-apps.herokuapp.com/api/v1/transactions/${accountNumber}/debit`;
  // const urlDebit = `http://localhost:4000/api/v1/transactions/${accountNumber}/debit`;

  const accountNoError = document.querySelector('#account-no-error-db');
  const amountError = document.querySelector('#amount-error-db');
  const reasonError = document.querySelector('#reason-error-db');
  const successDebited = document.querySelector('#success-debit');
  const connectionErrorDb = document.querySelector('#connection-error-debit');
  const token = localStorage.getItem('token');

  fetch(urlDebit, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'access-token': token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ amount, reason }),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        successDebited.innerHTML = `<h3>Successful Debited ${response.data.accountNumber} ${response.data.amount}! </h3>`;
        setTimeout(() => {
          window.location = './cashier.html';
        }, 1500);
      }
      if (response.status === 400) {
        if (response.error[0].field === 'amount') {
          amountError.innerHTML = `${response.error[0].message}`;
        } if (response.error[0].field === 'reason') {
          reasonError.innerHTML = `${response.error[0].message}`;
        }
      }
      if (response.status === 404) {
        accountNoError.innerHTML = `${response.error}`;
      }
    })
    .catch((err) => {
      connectionErrorDb.innerHTML = 'Error of Connection, Please check your internet connection and try again';
    });
}

function createCreditAccount(e) {
  e.preventDefault();
  const accountNumber = document.getElementById('account-no-cr').value;
  const amount = document.getElementById('account-amount-cr').value;
  const reason = document.getElementById('credit-reason').value;

  const urlCredit = `https://banka-apps.herokuapp.com/api/v1/transactions/${accountNumber}/credit`;
  // const urlCredit = `http://localhost:4000/api/v1/transactions/${accountNumber}/credit`;

  const accountNoErrorCr = document.querySelector('#account-no-error-cr');
  const amountErrorCr = document.querySelector('#amount-error-cr');
  const reasonErrorCr = document.querySelector('#reason-error-cr');
  const successCredited = document.querySelector('#success-credit');
  const connectionErrorCr = document.querySelector('#connection-error-credit');
  const token = localStorage.getItem('token');

  fetch(urlCredit, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'access-token': token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ amount, reason }),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        successCredited.innerHTML = `<h3>Successful Credited ${response.data.accountNumber} ${response.data.amount}! </h3>`;
        setTimeout(() => {
          window.location = './cashier.html';
        }, 1500);
      }
      if (response.status === 400) {
        if (response.error[0].field === 'amount') {
          amountErrorCr.innerHTML = `${response.error[0].message}`;
        } if (response.error[0].field === 'reason') {
          reasonErrorCr.innerHTML = `${response.error[0].message}`;
        }
      }
      if (response.status === 404) {
        accountNoErrorCr.innerHTML = `${response.error}`;
      }
    })
    .catch((err) => {
      connectionErrorCr.innerHTML = 'Error of Connection, Please check your internet connection and try again';
    });
}
