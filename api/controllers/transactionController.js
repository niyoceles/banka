import db from '../models';

class TransactionsController {
  // Get a single Transactions
  static async checkCashierOnly(req, res) {
    if (req.decodedToken.isAdmin === true || req.decodedToken.type === 'client') {
      res.status(401).json({
        status: 401,
        message: 'Not allowed to access this feature, cashier Only',
      });
    }
  }

  static async getSingleTransaction(req, res) {
    try {
      let checkTransaction = '';
      if (!req.params.accountNumber) {
        res.status(400).json({
          status: 400,
          message: 'Account number is required',
        });
      }
      if (req.params.accountNumber) {
        checkTransaction = await db.query('SELECT * FROM transactions WHERE "accountNumber"=$1',
          [req.params.accountNumber]);
      }

      if (checkTransaction.rows.length > 0) {
        // checkTransaction.rows[0].createdOn = new Date(checkTransaction.rows[0].createdOn).toDateString();
        res.status(200).json({
          status: 200,
          data: checkTransaction.rows,
          message: 'this is the Transaction of your Account',
        });
      } else {
        res.status(404).json({
          status: 404,
          error: 'Not found this Account',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // GET specific account transaction
  static async getSpecificTransaction(req, res) {
    TransactionsController.checkCashierOnly(req, res);
    try {
      let checkTransactionId = '';
      if (req.params.id) {
        checkTransactionId = await db.query('SELECT * FROM transactions WHERE id=$1',
          [req.params.id]);
      }

      if (checkTransactionId.rows.length > 0) {
        // checkTransactionId.rows[0].createdOn = new Date(checkTransactionId.rows[0].createdOn).toDateString();
        res.status(200).json({
          status: 200,
          data: checkTransactionId.rows[0],
          message: 'Transaction Get successful!',
        });
      } else {
        res.status(404).json({
          status: 404,
          error: 'Transaction Id Not found this Account',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async checkAccountExist(req, res) {
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
  }

  static async creditAccount(req, res) {
    TransactionsController.checkCashierOnly(req, res);
    let checkAccountCr = '';
    let checkTransactionCr = '';
    if (req.params.accountNumber) {
      checkAccountCr = await db.query('SELECT * FROM accounts WHERE "accountNumber"=$1',
        [req.params.accountNumber]);
      checkTransactionCr = await db.query('SELECT * FROM transactions WHERE "accountNumber"=$1',
        [req.params.accountNumber]);
    }

    if (checkAccountCr.rows.length <= 0) {
      res.status(404).json({
        status: 404,
        error: 'Sorry, Not Found this Account',
      });
    }

    let oldBalance = checkAccountCr.rows[0].balance;
    let newBalance = oldBalance + req.body.amount;

    if (checkTransactionCr.rows.length > 0) {
      oldBalance = checkTransactionCr.rows[checkTransactionCr.rows.length - 1].newBalance;
      newBalance = parseFloat(oldBalance, 10) + parseFloat(req.body.amount, 10);
    }

    const transactionValue = [
      'credit',
      req.params.accountNumber,
      req.decodedToken.userId,
      req.body.amount,
      oldBalance,
      newBalance,
      req.body.reason,
    ];

    const insertTransaction = `INSERT INTO
  transactions(type, "accountNumber", cashier, amount, "oldBalance", "newBalance", reason)
  VALUES($1, $2, $3, $4, $5, $6, $7)
  returning id, "accountNumber", "createdOn", type, cashier, amount, "oldBalance", "newBalance", reason`;

    try {
      TransactionsController.checkAccountExist(req, res);
      const addTransaction = await db.query(insertTransaction, transactionValue);
      if (addTransaction.rows.length >= 0) {
        // addTransaction.rows[0].createdOn = new Date(addTransaction.rows[0].createdOn).toDateString();
        addTransaction.rows[0].accountNumber = checkAccountCr.rows[0].accountNumber;
        res.status(201).json({
          status: 201,
          data: addTransaction.rows[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async debitAccount(req, res) {
    TransactionsController.checkCashierOnly(req, res);
    let checkAccountDb = '';
    let checkTransactionDb = '';
    if (req.params.accountNumber) {
      checkAccountDb = await db.query('SELECT * FROM accounts WHERE "accountNumber"=$1', [req.params.accountNumber]);
      checkTransactionDb = await db.query('SELECT * FROM transactions WHERE "accountNumber"=$1', [req.params.accountNumber]);
    }

    if (checkAccountDb.rows.length <= 0) {
      res.status(404).json({
        status: 404,
        error: 'Sorry, Not Found this Account',
      });
    }

    let oldBalance = checkAccountDb.rows[0].balance;
    let newBalance = oldBalance - req.body.amount;

    if (checkTransactionDb.rows.length > 0) {
      oldBalance = checkTransactionDb.rows[checkTransactionDb.rows.length - 1].newBalance;
      newBalance = parseFloat(oldBalance, 10) - parseFloat(req.body.amount, 10);
    }

    const transactionValue = [
      'debit',
      req.params.accountNumber,
      req.decodedToken.userId,
      req.body.amount,
      oldBalance,
      newBalance,
      req.body.reason,
    ];

    const insertTransaction = `INSERT INTO
  transactions(type, "accountNumber", cashier, amount, "oldBalance", "newBalance", reason)
  VALUES($1, $2, $3, $4, $5, $6, $7)
  returning id, "accountNumber", "createdOn", type, cashier, amount, "oldBalance", "newBalance", reason`;

    try {
      TransactionsController.checkAccountExist(req, res);
      const addTransaction = await db.query(insertTransaction, transactionValue);
      if (addTransaction.rows.length >= 0) {
        // addTransaction.rows[0].createdOn = new Date(addTransaction.rows[0].createdOn).toDateString();
        addTransaction.rows[0].accountNumber = checkAccountDb.rows[0].accountNumber;
        res.status(201).json({
          status: 201,
          data: addTransaction.rows[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export default TransactionsController;
