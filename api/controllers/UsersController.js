import users from '../models/users';

class UsersController {
  // Get all users
  static getAllusers(req, res) {
    return res.status(200).json({
      users,
      message: 'All the users',
    });
  }

  // Get a single Users
  static getSingleUser(req, res) {
    const findUsers = users.find(Users => Users.id === parseInt(req.params.id));
    if (findUsers) res.status(200).json({ Users: findUsers, message: 'A single Users record' });
    res.status(404).json({ message: 'Users Id is not found' });
  }

  static signup(req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.userName || !req.body.phone || !req.body.password) {
      res.status(404).json({ message: 'All ' });
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

  static signin(req, res) {
    // get sign data from the request body
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: 'fail',
        message: 'Email and password are required',
      });
    } else {
      const userData = req.body;
      users.forEach((val) => {
        if (val.email === userData.email && val.password === userData.password) {
          return res.status(200).json({
            message: ' YOU ARE SUCCESSFULL SIGIN!',
            users,
          });
        }
        res.status(404).json({
          status: 'fail',
          message: 'User not found, Incorrect email or password',
        });
      });
    }
  }
}
export default UsersController;
