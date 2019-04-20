import accounts from '../models/accounts';
import db from '../models';

class AccountsController {
  // // Get a single Accounts
  // static getSingleAccount(req, res) {
  //   // if (req.decodedToken.isAdmin === true) {
  //   //   return res.status(401).json({
  //   //     message: 'Sorry you are not allowed to access this route',
  //   //   });
  //   // }
  //   const findAccounts = accounts.find(Accounts => Accounts.accountNumber === parseInt(req.params.accountNumber, 10));
  //   if (!findAccounts) {
  //     res.status(404).json({
  //       status: '404',
  //       message: 'Account Id is not found',
  //     });
  //   }

  //   return res.status(200).json({
  //     status: '200',
  //     Accounts: findAccounts,
  //     message: 'A single Accounts record',
  //   });
  // }

  static async createAccount(req, res) {
    if (!req.body.owner) {
      res.status(400).json({
        status: '400', message: 'Owner id field is required ',
      });
    } else if (!req.body.type) {
      res.status(400).json({
        status: '400', message: 'Type field is required ',
      });
    } else if (!req.body.phone) {
      res.status(400).json({
        status: '400', message: 'Phone field is required ',
      });
    } else if (!req.body.email) {
      res.status(400).json({
        status: '400', message: 'Email field required ',
      });
    } else if (!req.body.balance) {
      res.status(400).json({
        status: '400', message: 'Balance field required ',
      });
      return;
    }

    // const date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    const accountValue = [
      Date.now(),
      req.body.owner,
      req.body.type,
      'Dormant',
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
        checkAccount = await db.query('SELECT * FROM accounts WHERE "accountNumber"=$1 OR email=$2 AND type=$3', [req.body.accountNumber, req.body.email, req.body.type]);
      }

      if (checkAccount.rows.length > 0) {
        res.status(200).json({
          status: 200,
          error: 'Sorry, this account already exists',
        });
      }

      const newAccount = await db.query(inserData, accountValue);

      if (newAccount.rows.length > 0) {
        newAccount.rows[0].createdOn = new Date(newAccount.rows[0].createdOn).toDateString();
        // const token = jwt.sign({
        //   email: req.body.email,
        // }, process.env.SECRET_KEY, { expiresIn: 86400 /* expires in 24 hours */ });

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

  static updateAccount(req, res) {
    const accountNumber = parseInt(req.params.accountNumber, 10);
    let accountFound; let itemIndex;
    accounts.map((account, index) => {
      if (account.accountNumber === accountNumber) {
        accountFound = account; itemIndex = index;
      }
    });

    if (!accountFound) {
      res.status(404).json({
        status: '404',
        message: 'account number not found',
      });
    }
    if (!req.body.status) {
      res.status(400).json({
        status: '400',
        message: 'status is required',
      });
    }
    const updatedAccount = { accountNumber: accountFound.accountNumber, status: req.body.status };
    accounts.splice(itemIndex, 1, updatedAccount);
    return res.status(200).json({
      status: '200',
      message: 'account Updated successfully',
      updatedAccount,
    });
  }

  static deleteAccount(req, res) {
    const findAccounts = accounts.find((Accounts) => {
      return Accounts.accountNumber === parseInt(req.params.accountNumber, 10)
    });

    if (!findAccounts) {
      res.status(404).json({
        status: '404',
        message: 'Account number is not found',
      });
    }

    const index = accounts.indexOf(findAccounts);
    accounts.splice(index, 1);
    res.status(200).json({
      status: '200',
      message: 'Account successfully deleted',
    });
  }
}
export default AccountsController;
