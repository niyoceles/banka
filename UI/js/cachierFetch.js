document.getElementById('transactionIdAccountForm').addEventListener('submit', checkTransactionId);

function checkTransactionId(e) {
  e.preventDefault();

  const transactionId = document.getElementById('transaction-id').value;

  // const urlTransactionId = `http://localhost:4000/api/v1/transactions/${transactionId}`;
  const urlTransactionId = `https://banka-apps.herokuapp.com/api/v1/transactions/${transactionId}`;

  const connectionErrorTransactionId = document.querySelector('#error-connection-transaction-id');
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
      connectionErrorTransactionId.innerHTML = 'Error of Connection, Please check your internet connection and try again';
    });
}
