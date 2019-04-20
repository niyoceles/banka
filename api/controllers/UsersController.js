import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import users from '../models/users';
import db from '../models';

dotenv.config();

class UsersController {
  // Get a single Users
  static getSingleUser(req, res) {
    const findUsers = users.find(User => User.id === parseInt(req.params.id, 10));
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
    if (!req.body.firstName) {
      res.status(400).json({
        status: '400',
        message: 'First name field is required ',
      });
    } else if (!req.body.lastName) {
      res.status(400).json({
        status: '400',
        message: 'Last name is required ',
      });
    } else if (!req.body.email) {
      res.status(400).json({
        status: '400',
        message: 'Email is required ',
      });
    } else if (!req.body.userName) {
      res.status(400).json({
        status: '400',
        message: 'Username is required ',
      });
    } else if (!req.body.phone) {
      res.status(400).json({
        status: '400',
        message: 'Phone is required ',
      });
    } else if (!req.body.password) {
      res.status(400).json({
        status: '400',
        message: 'Password are required ',
      });
    } else if (!req.body.isAdmin) {
      res.status(400).json({
        status: '404',
        message: 'Type of user is required ',
      });
    } else if (!req.body.location) {
      res.status(400).json({
        status: '400',
        message: 'Location is required ',
      });
      return;
    }

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

    const inserData = `INSERT INTO
            users("firstName", "lastName", "userName", password, phone, email, type, "isAdmin", location)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            returning id, "firstName", "lastName", "userName", phone, email, type, "isAdmin", location, "createdDate"`;

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

      const newUser = await db.query(inserData, values);

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

  static async signin(req, res) {
    // get sign data from the request body
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: '400',
        message: 'Email and password are required',
      });
    } else {

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
            error: 'Welcome Successful login',
          });
        }

        // const newUser = await db.query(inserData, values);

        if (checkUser.rows.length > 0) {
          checkUser.rows[0].createdDate = new Date(checkUser.rows[0].createdDate).toDateString();
          const token = jwt.sign({
            email: req.body.email,
            isAdmin: req.body.isAdmin,
          }, process.env.SECRET_KEY, { expiresIn: 86400 /* expires in 24 hours */ });

          res.status(201).json({
            status: 201,
            data: checkUser.rows[0],
            token,
          });
        }
      } catch (error) {
        console.log(error);
      }

    }
  }
}
export default UsersController;
