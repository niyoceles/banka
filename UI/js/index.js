document.getElementById('signUpForm').addEventListener('submit', userSignup);


const { token } = localStorage;

function userSignup(e) {
  e.preventDefault();

  // const urlSignup = 'http://localhost:4000/api/v1/auth/signup';
  const urlSignup = 'https://banka-apps.herokuapp.com/api/v1/auth/signup';

  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phonenumber').value;
  const userName = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const location = document.getElementById('location').value;
  // Successful 
  const successfullSignup = document.querySelector('#success-signup');
  // errors
  const connectionError = document.querySelector('#connection-error');
  const firstNameError = document.querySelector('#firstname-error');
  const lastNameError = document.querySelector('#lastname-error');
  const phoneError = document.querySelector('#phone-error');
  const emailError = document.querySelector('#email-error');
  const passwordError = document.querySelector('#password-error');
  const userNameError = document.querySelector('#username-error');
  const locationError = document.querySelector('#location-error');
  const existAccountError = document.querySelector('#account-exist');

  fetch(urlSignup, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'access-token': token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      phone,
      email,
      userName,
      password,
      location,
    }),
  })
    .then(res => res.json())
    // .then((data) => console.log(data))
    .then((response) => {
      if (response.status === 201) {
        successfullSignup.innerHTML = `Welcome to Banka ${response.data.type} ${response.data.firstName}!`;
        setTimeout(() => {
          if (response.data.type === 'client') {
            window.location = './html/user-profile.html'; return window.location;
          }
        }, 3000);
        localStorage.setItem('token', response.token);
        localStorage.setItem('userDetails', JSON.stringify(response.data));
        localStorage.setItem('isLoggedIn', true);
      }
      if (response.status === 400) {
        if (response.error[0].field === 'firstName') {
          firstNameError.innerHTML = `${response.error[0].message}`;
          return firstNameError;
        } if (response.error[0].field === 'lastName') {
          lastNameError.innerHTML = `${response.error[0].message}`;
          return lastNameError;
        } if (response.error[0].field === 'email') {
          emailError.innerHTML = `${response.error[0].message}`;
          return emailError;
        } if (response.error[0].field === 'phone') {
          phoneError.innerHTML = `${response.error[0].message}`;
          return phoneError;
        } if (response.error[0].field === 'userName') {
          userNameError.innerHTML = `${response.error[0].message}`;
          return userNameError;
        } if (response.error[0].field === 'password') {
          passwordError.innerHTML = `${response.error[0].message}`;
          return passwordError;
        } if (response.error[0].field === 'location') {
          locationError.innerHTML = `${response.error[0].message}`;
          return locationError;
        }
      }
      if (response.status === 200) {
        existAccountError.innerHTML = `${response.error[0].message}`;
        return existAccountError;
      }
    })
    .catch((err) => {
      connectionError.innerHTML = 'Error of Connection, Please check your internet connection and try again';
    });
}
