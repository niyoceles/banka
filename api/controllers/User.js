import users from '../models/user';

export default class User {
  static getUsers(req, res) {
    return res.status(200).json({
      users,
    });
  }

  static getUser(req, res) {
    const userData = req.body;

    users.forEach((item) => {
      if (item.email === userData.email && item.password === userData.password) {
        return res.status(200).json({
          users,
        });
      }
    });
    return userData;
  }

  static signup(req, res) {
    // data from the request body
    const userData = req.body;
    let error = '';

    users.forEach((val) => {
      if (val.email === userData.email) {
        error = 'user already exists';
      }
    });

    if (error) {
      return res.status(200).json({
        error,
      });
    }

    users.push(userData);
    return res.status(200).json({
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
