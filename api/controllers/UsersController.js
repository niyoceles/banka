import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// import users from '../models/users';
import db from '../models';

dotenv.config();

class UsersController {

  static async getAllUserAccounts(req, res) {
    if (req.decodedToken.type === 'client') {
      return res.status(401).json({
        message: 'Not allowed to access this feature, staff Only',
      });
    }
    try {
      let checkUserAccounts = '';
      checkUserAccounts = await db.query('SELECT * FROM users');
      if (checkUserAccounts.rows.length > 0) {
        checkUserAccounts.rows[0].createdDate = new Date(checkUserAccounts.rows[0].createdDate).toDateString();
        for (let i = 0; i < checkUserAccounts.rows.length; i += 1) {
          delete checkUserAccounts.rows[i].password;
          delete checkUserAccounts.rows[i].isAdmin;
        }
        // res.json(checkUserAccounts.rows);
        res.status(200).json({
          status: 200,
          data: checkUserAccounts.rows,
          message: 'Get all BankAccounts successful!',
        });
      } else {
        res.status(404).json({
          status: 404,
          error: 'There is no Any Account registered',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async signup(req, res) {
    const values = [
      req.body.firstName, req.body.lastName, req.body.userName,
      bcrypt.hashSync(req.body.password), req.body.phone,
      req.body.email, 'client', false, req.body.location,
    ];

    const inserData = `INSERT INTO
            users("firstName", "lastName", "userName", password, phone, email, type, "isAdmin", location)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            returning id, "firstName", "lastName", "userName", phone, email, type, "isAdmin", location, "createdDate"`;
    try {
      let checkUser = '';

      if (req.body.email) {
        checkUser = await db.query('SELECT * FROM users WHERE "userName"=$1 OR email=$2',
          [req.body.userName, req.body.email]);
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
          userId: newUser.rows[0].id,
          email: newUser.rows[0].email,
          type: newUser.rows[0].type,
          isAdmin: newUser.rows[0].isAdmin,
        }, process.env.SECRET_KEY, {
            expiresIn: 86400, // expires in 24 hours
          });
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
    try {
      const { rows } = await db.query('SELECT * FROM users WHERE email=$1',
        [req.body.email]);

      if (rows.length > 0) {
        for (let i = 0; i < rows.length; i += 1) {
          if (bcrypt.compareSync(req.body.password, rows[i].password)) {
            const isAdmin = !!rows[i].isAdmin; //rows[i].isAdmin ? true : false
            const token = jwt.sign({
              userId: rows[i].id,
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
                type: rows[i].type,
                isAdmin: rows[i].isAdmin,
              },
              token,
            });
          }
        }
      }

      return res.status(400).json({
        status: 400,
        error: 'Sorry, your email or password is incorrect',
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async adminCreateUser(req, res) {
    if (req.decodedToken.isAdmin === false || req.decodedToken.type === 'client') {
      return res.status(401).json({
        message: 'Not allowed to access this feature, Admin Only',
      });
    }
    const values = [
      req.body.firstName, req.body.lastName,
      req.body.userName, bcrypt.hashSync(req.body.password),
      req.body.phone, req.body.email,
      'staff', req.body.isAdmin, req.body.location,
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
}
export default UsersController;
