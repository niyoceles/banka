import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
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
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.userName,
      bcrypt.hashSync(req.body.password),
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
        // const token = jwt.sign({
        //   email: req.body.email,
        //   isAdmin: req.body.isAdmin,
        // }, process.env.SECRET_KEY, { expiresIn: 86400 /* expires in 24 hours */ });

        res.status(201).json({
          status: 201,
          data: newUser.rows[0],
          // token,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async signin(req, res) {
    // get sign data from the request body
    try {
      const { rows } = await db.query('SELECT * FROM users WHERE email=$1', [req.body.email]);

      if (rows.length > 0) {
        for (let i = 0; i < rows.length; i += 1) {
          if (bcrypt.compareSync(req.body.password, rows[i].password)) {
            const isAdmin = !!rows[i].isAdmin; //rows[i].isAdmin ? true : false
            const token = jwt.sign({
              email: rows[i].email,
              type: rows[i].type,
              isAdmin,
            }, process.env.SECRET_KEY, {
                expiresIn: 86400, // expires in 24 hours
              });
            return res.status(200).json({
              status: 200,
              data: {
                id: rows[i].id,
                firstName: rows[i].firstName,
                lastName: rows[i].lastName,
                email: rows[i].email,
                phone: rows[i].phone,
                userName: rows[i].userName,
                isAdmin: rows[i].isAdmin,
              },
              token,
            });
          }
        }
      }

      return res.status(400).json({
        status: 400,
        error: 'Sorry, your username or password is incorrect',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
export default UsersController;
