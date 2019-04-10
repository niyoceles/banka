import users from '../models/users';

class UsersController {
  static signup(req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.userName || !req.body.phone || !req.body.password) {
      res.status(404).json({ message: 'All required field' });
      return;
    }

    users.forEach((val) => {
      const userData = req.body;
      if (val.email === userData.email) res.status(404).json({ message: ' Already have an account!' });
    });
    // new user Object with generating id auto increment
    const user = {
      id: users.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      userName: req.body.userName,
      password: req.body.password,
    };
    users.push(user);
    res.status(200).json({
      users,
    });
  }
}
export default UsersController;
