import db from '../models';

class TransactionsController {
  // Get a single Transactions
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
        checkTransaction.rows[0].createdOn = new Date(checkTransaction.rows[0].createdOn).toDateString();
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

  static async creditAccount(req, res) {
    if (!req.body.cashier) {
      res.status(400).json({
        status: '400', message: 'cashier field is required ',
      });
    } else if (!req.body.reason) {
      res.status(400).json({
        status: '400', message: 'reason field required ',
      });
    } else if (!req.body.amount) {
      res.status(400).json({
        status: '400', message: 'Amount field is required ',
      });
      return;
    }

    const transactionValue = [
      'Credit',
      req.params.accountNumber,
      req.body.cashier,
      req.body.amount,
      req.body.oldBalance,
      (req.body.oldBalance + req.body.amount),
      req.body.reason,
    ];

    const insertTransaction = `INSERT INTO
  transactions(type, "accountNumber", cashier, amount, "oldBalance", "newBalance", reason)
  VALUES($1, $2, $3, $4, $5, $6, $7)
  returning id, "accountNumber", "createdOn", type, cashier, amount, "oldBalance", "newBalance", reason`;

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

      const addTransaction = await db.query(insertTransaction, transactionValue);

      if (addTransaction.rows.length > 0) {
        addTransaction.rows[0].createdOn = new Date(addTransaction.rows[0].createdOn).toDateString();
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
    if (!req.body.cashier) {
      res.status(400).json({
        status: '400', message: 'cashier field is required ',
      });
    } else if (!req.body.reason) {
      res.status(400).json({
        status: '400', message: 'reason field required ',
      });
    } else if (!req.body.amount) {
      res.status(400).json({
        status: '400', message: 'Amount field is required ',
      });
      return;
    }

    const transactionValue = [
      'Debit',
      req.params.accountNumber,
      req.body.cashier,
      req.body.amount,
      req.body.oldBalance,
      (req.body.oldBalance - req.body.amount),
      req.body.reason,
    ];

    const insertTransaction = `INSERT INTO
  transactions(type, "accountNumber", cashier, amount, "oldBalance", "newBalance", reason)
  VALUES($1, $2, $3, $4, $5, $6, $7)
  returning id, "accountNumber", "createdOn", type, cashier, amount, "oldBalance", "newBalance", reason`;

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

      const addTransaction = await db.query(insertTransaction, transactionValue);

      if (addTransaction.rows.length > 0) {
        addTransaction.rows[0].createdOn = new Date(addTransaction.rows[0].createdOn).toDateString();
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
