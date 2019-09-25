import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// import users from '../models/users';
import db from '../models';

dotenv.config();

class UsersController {
  static checkUser(req, res) {
    if (req.decodedToken.type === 'client') {
      return res.status(401).json({
        message: 'Not allowed to access this feature, staff Only',
      });
    }
  }

  static async getAllUserAccounts(req, res) {
//     UsersController.checkUser(req, res); all other users to view users
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
      }
      res.status(404).json({
        status: 404,
        error: 'There is no Any Account registered',
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async signup(req, res) {
    const values = [
      req.body.firstName, req.body.lastName, req.body.userName, bcrypt.hashSync(req.body.password), req.body.phone, req.body.email, 'client', false, req.body.location];
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
    try {
      const { rows } = await db.query('SELECT * FROM users WHERE email=$1', [req.body.email]);
      if (rows.length > 0) {
        for (let i = 0; i < rows.length; i += 1) {
          if (bcrypt.compareSync(req.body.password, rows[i].password)) {
            const isAdmin = !!rows[i].isAdmin; // rows[i].isAdmin ? true : false
            const token = jwt.sign({
              userId: rows[i].id,
              email: rows[i].email,
              type: rows[i].type,
              isAdmin,
            }, process.env.SECRET_KEY, {
                expiresIn: 86400, // expires in 24 hours
              });
            res.status(200).json({
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
      res.status(400).json({
        status: 400,
        error: 'Sorry, your email or password is incorrect',
      });
    } catch (error) {
      console.log(error);
    }
  }

  static checkAdmin(req, res) {
    if (req.decodedToken.isAdmin === false || req.decodedToken.type === 'client') {
      res.status(401).json({
        message: 'Not allowed to access this feature, Admin Only',
      });
    }
  }

  static async adminCreateUser(req, res) {
    UsersController.checkAdmin(req, res);
    const values = [req.body.firstName, req.body.lastName, req.body.userName, bcrypt.hashSync(req.body.password),
    req.body.phone, req.body.email, 'staff', req.body.isAdmin, req.body.location];
    const inserData = `INSERT INTO users("firstName", "lastName", "userName", password, phone, email, type, "isAdmin", location) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning id, "firstName", "lastName", "userName", phone, email, type, "isAdmin", location, "createdDate"`;
    try {
      let checkUserStaff = '';
      if (req.body.email) {
        checkUserStaff = await db.query('SELECT * FROM users WHERE "userName"=$1 OR email=$2 AND phone=$3', [req.body.userName, req.body.email, req.body.phone]);
      }
      if (checkUserStaff.rows.length > 0) {
        res.status(200).json({
          status: 200,
          error: 'Sorry, this account already exists',
        });
      }
      const newUserStaff = await db.query(inserData, values);
      if (newUserStaff.rows.length > 0) {
        newUserStaff.rows[0].createdDate = new Date(newUserStaff.rows[0].createdDate).toDateString();
        res.status(201).json({
          status: 201,
          data: newUserStaff.rows[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export default UsersController;
