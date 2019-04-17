import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import users from '../models/users';

dotenv.config();

class UsersController {
  // Get a single Users
  static getSingleUser(req, res) {
    const findUsers = users.find(Users => Users.id === parseInt(req.params.id, 10));
    if (findUsers) {
      res.status(200).json({
        status: '200',
        Users: findUsers,
        message: 'A single Users record',
      });
    }
    res.status(404).json({
      status: '404',
      message: 'Users Id is not found',
    });
  }

  static signup(req, res) {
    if (!req.body.firstName) {
      res.status(400).json({
        status: '400',
        message: 'first name are required ',
      });
    } else if (!req.body.lastName) {
      res.status(400).json({
        status: '400',
        message: 'last name are required ',
      });
    } else if (!req.body.email) {
      res.status(400).json({
        status: '400',
        message: 'Email name are required ',
      });
    } else if (!req.body.userName) {
      res.status(400).json({
        status: '400',
        message: 'username name are required ',
      });
    } else if (!req.body.phone) {
      res.status(400).json({
        status: '400',
        message: 'phone name are required ',
      });
    } else if (!req.body.password) {
      res.status(400).json({
        status: '400',
        message: 'password name are required ',
      });
      return;
    }

    users.forEach((val) => {
      const userData = req.body;
      if (val.email === userData.email) {
        res.status(404).json({
          status: '404',
          message: ' Already have an account!',
        });
      }
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
      isAdmin: false,
    };
    users.push(user);
    const token = jwt.sign({ email: user.email, isAdmin: user.isAdmin }, process.env.SECRET_KEY, {
      expiresIn: 86400, // expires in 24 hours
    });
    res.status(200).json({
      status: '200',
      message: 'You are successfull registerd',
      data: user,
      token,
    });
  };

  static signin(req, res) {
    // get sign data from the request body
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({
        status: '400',
        message: 'Email field is required',
      });
    } else if (!password) {
      res.status(400).json({
        status: '400',
        message: 'password is required',
      });
    } else {
      const findUsers = users.find(Users => Users.email === req.body.email
        && Users.password === req.body.password);
      if (findUsers) {
        const token = jwt.sign({ email, isAdmin: findUsers.isAdmin }, process.env.SECRET_KEY, {
          expiresIn: 86400, // expires in 24 hours
        });
        res.status(200).json({
          status: '200',
          data: findUsers,
          token,
          message: 'Welcome you are successful login',
        });
      }
      res.status(404).json({
        status: '404',
        message: 'Sorry you are not registered! or your email and password are not match',
      });
    }
  }
}
export default UsersController;
