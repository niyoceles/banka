import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import users from '../models/users';
import db from '../models';

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

  static async signup(req, res) {
    if (!req.body.firstName || !req.body.lastName
      || !req.body.email || !req.body.userName || !req.body.phone || !req.body.password) {
      res.status(404).json({
        status: '404',
        message: 'All field are required ',
      });
      return;
    }

    const text = `INSERT INTO
            users("firstName", "lastName", "userName", password, phone, email, type, "isAdmin", location)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            returning id, "firstName", "lastName", "userName", phone, email, type, "isAdmin", location, "createdDate"`;

    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.userName,
      req.body.password,
      req.body.phone,
      req.body.email,
      req.body.type,
      req.body.isAdmin,
      req.body.location,
    ];

    try {
      let checkUser = '';

      if (req.body.email) {
        checkUser = await db.query('SELECT * FROM users WHERE "userName"=$1 OR email=$2 AND password=$3', [req.body.userName, req.body.email, req.body.password]);
      } else {
        checkUser = await db.query('SELECT * FROM users WHERE "userName"=$1 AND password=$2', [req.body.userName, req.body.password]);
      }

      if (checkUser.rows.length > 0) {
        res.status(200).json({
          status: 200,
          error: 'Sorry, this account already exists',
        });
      }

      const newUser = await db.query(text, values);

      if (newUser.rows.length > 0) {
        newUser.rows[0].createdDate = new Date(newUser.rows[0].createdDate).toDateString();
        const token = jwt.sign({
          email: req.body.email,
          isAdmin: req.body.isAdmin,
        }, process.env.SECRET_KEY, { expiresIn: 86400 /* expires in 24 hours */ });

        res.status(201).json({
          status: 201,
          data: newUser.rows[0],
          token,
        });
      }
    } catch (error) {
      console.log(error);
    }
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
        message: 'Sorry you are not createdDate! or your email and password are not match',
      });
    }
  }
}
export default UsersController;
