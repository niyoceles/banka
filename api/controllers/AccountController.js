import db from '../models';

class AccountsController {
  static checkStaffOnly(req, res) {
    // if (req.decodedToken.type === 'client') {
    //   return res.status(401).json({
    //     status: 401,
    //     message: 'Not allowed to access this feature, staff Only',
    //   });
    // }
  }

  static checkUserOnly(req, res) {
    // if (req.decodedToken.type === 'staff') {
    //   return res.status(401).json({
    //     status: 401,
    //     message: 'Not allowed to access this feature, client Only',
    //   });
    // }
  }

  static checkAdminOnly(req, res) {
    if (req.decodedToken.type === 'client' || req.decodedToken.isAdmin === false) {
      return res.status(401).json({
        status: 401,
        message: 'Not allowed to access this feature, for Admin only',
      });
    }
  }

  // GET All Bank Accounts
  static async getAllBankAccounts(req, res) {
    AccountsController.checkStaffOnly(req, res);
    try {
      let checkAllBankAccounts = '';
      checkAllBankAccounts = await db.query('SELECT * FROM accounts, users where users.id=owner');
      if (checkAllBankAccounts.rows.length > 0) {
        checkAllBankAccounts.rows[0].createdOn = new Date(checkAllBankAccounts.rows[0].createdOn).toDateString();
        for (let i = 0; i < checkAllBankAccounts.rows.length; i += 1) {
          delete checkAllBankAccounts.rows[i].password;
          delete checkAllBankAccounts.rows[i].isAdmin;
        }
        // res.json(checkAllBankAccounts.rows);
        res.status(200).json({
          status: 200,
          data: checkAllBankAccounts.rows,
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

  static async getAllActiveByStatus(req, res) {
    AccountsController.checkStaffOnly(req, res);
    try {
      let checkStatusAccount = '';
      if (req.query.status === 'active' || req.query.status === 'dormant') {
        checkStatusAccount = await db.query('SELECT * FROM accounts, users WHERE users.id=owner AND status=$1',
          [req.query.status]);
      } else {
        res.status(404).json({
          status: 404,
          data: checkStatusAccount.rows,
          message: 'Your Query is written wrong',
        });
      }

      if (checkStatusAccount.rows.length >= 0) {
        checkStatusAccount.rows[0].createdOn = new Date(checkStatusAccount.rows[0].createdOn).toDateString();
        for (let i = 0; i < checkStatusAccount.rows.length; i += 1) {
          delete checkStatusAccount.rows[i].password;
          delete checkStatusAccount.rows[i].isAdmin;
        }
        res.status(200).json({
          status: 200,
          data: checkStatusAccount.rows,
          message: 'Get all BankAccounts successful!',
        });
      } else {
        res.status(404).json({
          status: 404,
          error: 'There is no Any Active Account registered',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // GET list of all account owned by user email
  static async getAllAccountByUser(req, res) {
    AccountsController.checkStaffOnly(req, res);
    try {
      let checkAllAccounts = '';
      if (req.params.email) {
        checkAllAccounts = await db.query('SELECT * FROM accounts WHERE email=$1',
          [req.params.email]);
      }

      if (checkAllAccounts.rows.length > 0) {
        checkAllAccounts.rows[0]
          .createdOn = new Date(checkAllAccounts.rows[0]
            .createdOn).toDateString();
        res.status(200).json({
          status: 200,
          data: checkAllAccounts.rows,
          message: 'User Get all Accounts successful!',
        });
      } else {
        res.status(404).json({
          status: 404,
          error: 'Email is Not found',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // GET specific account Details
  static async getAccountDetails(req, res) {
    try {
      let checkAccountDetails = '';
      if (req.params.accountNumber) {
        checkAccountDetails = await db.query('SELECT * FROM users, accounts WHERE users.id=owner AND "accountNumber"=$1',
          [req.params.accountNumber]);
      }

      if (checkAccountDetails.rows.length > 0) {
        // checkAccountDetails.rows[0].createdOn = new Date(checkAccountDetails.rows[0].createdOn).toDateString();
        delete checkAccountDetails.rows[0].password;
        res.status(200).json({
          status: 200,
          data: checkAccountDetails.rows[0],
          message: 'Account Details successful!',
        });
      } else {
        res.status(404).json({
          status: 404,
          error: 'Account Number Not found',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async createAccount(req, res) {
    AccountsController.checkUserOnly(req, res);
    const accountValue = [
      Date.now(),
      req.decodedToken.userId,
      req.body.type,
      'dormant',
      req.body.phone,
      req.body.email,
      req.body.balance,
    ];

    const inserData = `INSERT INTO
    accounts("accountNumber", owner, type, status, phone, email, balance)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    returning id, "accountNumber", "owner", type, phone, email, balance, "createdOn"`;

    try {
      let checkAccount = '';
      if (req.body.email) {
        checkAccount = await db.query('SELECT * FROM accounts WHERE "accountNumber"=$1 OR email=$2 AND type=$3',
          [req.body.accountNumber, req.body.email, req.body.type]);
      }

      if (checkAccount.rows > 1) {
        res.status(200).json({
          status: 200,
          error: 'Sorry, this account already exists',
        });
      }

      const newAccount = await db.query(inserData, accountValue);

      if (newAccount.rows.length > 0) {
        newAccount.rows[0].createdOn = new Date(newAccount.rows[0].createdOn).toDateString();
        res.status(201).json({
          status: 201,
          data: newAccount.rows[0],
          // token,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async updateAccount(req, res) {
    AccountsController.checkStaffOnly(req, res);

    const accountStatusValue = [
      req.body.status,
    ];

    const updateData = `UPDATE accounts SET "status"=$1 WHERE "accountNumber"=${req.params.accountNumber}
    RETURNING id, "accountNumber", "owner", type, phone, status, email, balance, "createdOn"`;

    try {
      let checkAccount = '';
      if (req.params.accountNumber) {
        checkAccount = await db.query('SELECT * FROM accounts WHERE "accountNumber"=$1', [req.params.accountNumber]);
      }

      if (checkAccount.rows < 1) {
        res.status(404).json({
          status: 404,
          error: 'Sorry, Not Found this Account',
        });
      }

      const updateAccount = await db.query(updateData, accountStatusValue);

      if (updateAccount.rows.length > 0) {
        updateAccount.rows[0].createdOn = new Date(updateAccount.rows[0].createdOn).toDateString();
        res.status(201).json({
          status: 201,
          data: updateAccount.rows[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteAccount(req, res) {
    AccountsController.checkAdminOnly(req, res);
    const updateData = `DELETE FROM accounts WHERE "accountNumber"=${req.params.accountNumber}
    RETURNING *`;

    try {
      let checkAccount = '';
      if (req.params.accountNumber) {
        checkAccount = await db.query('SELECT * FROM accounts WHERE "accountNumber"=$1', [req.params.accountNumber]);
      }

      if (checkAccount.rows < 1) {
        res.status(404).json({
          status: 404,
          error: 'Sorry, this Account is not found',
        });
      }

      const deletingAccount = await db.query(updateData);

      if (deletingAccount.rows.length > 0) {
        res.status(201).json({
          status: 201,
          message: 'Account has been Deleted',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export default AccountsController;
