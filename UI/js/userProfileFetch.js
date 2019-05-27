function getProfile() {
  const userProfile = JSON.parse(localStorage.getItem('userDetails'));

  if (userProfile) {
    let htmlTableData = '';
    htmlTableData = `
    <table id="table">
    <tr>
      <th colspan="2">
        <h3>My Profile Account </h3>
      </th>
    </tr>
    <tr>
      <td>Username:</td>
      <td><b>${userProfile.userName}</b>
    </tr>
    </tr>
    <tr>
      <td>First name:</td>
      <td><b>${userProfile.firstName}</b></td>
    </tr>
    <tr>
      <td>Last Name:</td>
      <td><b>${userProfile.lastName}</b></td>
    </tr>
    <tr>
      <td>Email:</td>
      <td><b>${userProfile.email}</b></td>
    </tr>
    <tr>
      <td>Phone Numbe:</td>
      <td><b>${userProfile.phone}</b></td>
    </tr>
    <tr>
      <td>Type:</td>
      <td><b>${userProfile.type}</b></td>
    </tr>
  </table>
    `;
    document.getElementById('profile').innerHTML = htmlTableData;
  }
  if (!userProfile) {
    document.getElementById('profile').innerHTML = 'Error, You are Not signed in!';
  }
}
getProfile();
