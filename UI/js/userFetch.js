function setSession() {
  if (!localStorage.getItem('isloggedIn')) {
    alert('Please Sign in');
    window.location = './index.html'; return window.location;
  }
}
setSession();

document.querySelector('#signOut').addEventListener('click', UserSignOut);
function UserSignOut(e) {
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
  }
  if (localStorage.getItem('isloggedIn')) {
    localStorage.removeItem('isloggedIn');
  }
  window.location.replace('../index.html');
}

document.getElementById('createBankAccountForm').addEventListener('submit', accountCreate);

function accountCreate(e) {
  e.preventDefault();

  const type = document.getElementById('account-type').value;
  const phone = document.getElementById('phonenumber').value;
  const email = document.getElementById('email').value;
  const balance = document.getElementById('opening-balance').value;

  // const urlAccount = 'http://localhost:4000/api/v1/account';
  const urlAccount = 'https://banka-apps.herokuapp.com/api/v1/account';
  const createAcErrorType = document.querySelector('#create-ac-error-type');
  const createAcErrorEmail = document.querySelector('#create-ac-error-email');
  const createAcErrorPhone = document.querySelector('#create-ac-error-phone');
  const createAcErrorBalance = document.querySelector('#create-ac-error-amount');
  const connectionErrorAccount = document.querySelector('#error-connection-ac');
  const successfulCreateAc = document.querySelector('#success-account');
  const token = localStorage.getItem('token');

  fetch(urlAccount, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'access-token': token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      type,
      phone,
      email,
      balance,
    }),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        successfulCreateAc.innerHTML = `Account Successfull Created!  A/C:${response.data.accountNumber}`;
        setTimeout(() => {
          window.location = './myaccounts.html'; return window.location;
        }, 3000);
      }
      if (response.status === 400) {
        if (response.error[0].field === 'type') {
          createAcErrorType.innerHTML = `${response.error[0].message}`;
          return createAcErrorType;
        }
        if (response.error[0].field === 'phone') {
          createAcErrorPhone.innerHTML = `${response.error[0].message}`;
          return createAcErrorPhone;
        }
        if (response.error[0].field === 'email') {
          createAcErrorEmail.innerHTML = `${response.error[0].message}`;
          return createAcErrorEmail;
        }
        if (response.error[0].field === 'balance') {
          createAcErrorBalance.innerHTML = `${response.error[0].message}`;
          return createAcErrorBalance;
        }
      }
    })
    .catch((err) => {
      connectionErrorAccount.innerHTML = 'Error of Connection, Please check your internet connection and try again';
    });
}
