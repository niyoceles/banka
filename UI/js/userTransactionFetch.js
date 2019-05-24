
// USER VIEW ACCOUNT TRANSACTION
document.getElementById('transactionAccountForm').addEventListener('submit', accountTransaction);

function accountTransaction(e) {
  e.preventDefault();

  const accountNumber = document.getElementById('account-number').value;

  // const urlTransaction = `http://localhost:4000/api/v1/transactions/${accountNumber}/transactions`;
  const urlTransaction = `https://banka-apps.herokuapp.com/api/v1/transactions/${accountNumber}/transactions`;

  const connectionErrorTransaction = document.querySelector('#error-connection-transaction');
  const token = localStorage.getItem('token');

  fetch(urlTransaction, {
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
        <th colspan="7">
          <h3>My Account Transaction Record History</h3>
        </th>
      </tr>
      <tr>
        <th>ID</th>
        <th>Date</th>
        <th>Credit/Debit</th>
        <th>Amount</th>
        <th>Old Balance</th>
        <th>New Balance</th>
        <th>Reason</th>
      </tr>
      <tr>`;
        response.data.forEach((transaction) => {
          htmlTableData += `
        <td>${transaction.id}</td>
        <td>${new Date(transaction.createdOn).getDate()}/${new Date(transaction.createdOn).getMonth() + 1}/${new Date(transaction.createdOn).getFullYear()}
        ${new Date(transaction.createdOn).getHours()}:${new Date(transaction.createdOn).getMinutes()}</td>
        <td>${transaction.type}</td>
        <td>${transaction.amount}</td>
        <td>${transaction.oldBalance}</td>
        <td>${transaction.newBalance}</td>
        <td>${transaction.reason}</td>
        </tr>
        `;
        });
        document.getElementById('transactions').innerHTML = htmlTableData;
      }
      if (response.status === 404) {
        document.getElementById('transactions').innerHTML = `<h3 style="color: brown">${response.error} </h3>`;
      }
      if (response.status === 401) {
        document.getElementById('transactions').innerHTML = `<h3 style="color: brown">${response.message} </h3>`;
      }
    })
    .catch((err) => {
      connectionErrorTransaction.innerHTML = 'Error of Connection, Please check your internet connection and try again';
    });
}
