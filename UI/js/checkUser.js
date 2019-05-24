function setSession() {
  if (!localStorage.getItem('isloggedIn')) {
    alert('Please Sign in');
    window.location = '../index.html'; return window.location;
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