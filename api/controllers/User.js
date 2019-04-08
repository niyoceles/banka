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
      return userData;
    });
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
}
