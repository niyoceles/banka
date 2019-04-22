import transactions from '../models/transactions';
import accounts from '../models/accounts';
import db from '../models';
// import accounts from '../models/users';

class TransactionsController {
  // Get a single Transactions
  static getSingleTransaction(req, res) {
    const accNo = parseInt(req.params.accountNumber, 10);
    const findTransactions = transactions.find(Transactions => Transactions.accountNumber === accNo);
    if (!findTransactions) {
      res.status(404).json({
        message: 'Transactions Id is not found',
      });
    }
    res.status(200).json({
      Transactions: findTransactions,
      message: 'A single Transactions record',
    });
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

    let checkAccount = '';
    let checkTransaction = '';
    if (req.params.accountNumber) {
      checkAccount = await db.query('SELECT * FROM accounts WHERE "accountNumber"=$1', [req.params.accountNumber]);
      checkTransaction = await db.query('SELECT * FROM transactions WHERE "accountNumber"=$1', [req.params.accountNumber]);
    }

    if (checkAccount.rows.length <= 0) {
      res.status(404).json({
        status: 404,
        error: 'Sorry, Not Found this Account',
      });
    }

    let oldBalance = checkAccount.rows[0].balance;
    let newBalance = oldBalance + req.body.amount;

    if (checkTransaction.rows.length > 0) {
      oldBalance = checkTransaction.rows[checkTransaction.rows.length - 1].newBalance;
      newBalance = parseFloat(oldBalance, 10) + parseFloat(req.body.amount, 10);
    }

    const transactionValue = [
      'Credit',
      req.params.accountNumber,
      req.body.cashier,
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

      if (addTransaction.rows.length >= 0) {
        addTransaction.rows[0].createdOn = new Date(addTransaction.rows[0].createdOn).toDateString();
        addTransaction.rows[0].accountNumber = checkAccount.rows[0].accountNumber;
        res.status(201).json({
          status: 201,
          data: addTransaction.rows[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static debitAccount(req, res) {
    const accountNumberDbt = parseInt(req.params.accountNumber, 10);
    let accountFound; let itemIndex;
    accounts.map((account, index) => {
      if (account.accountNumber === accountNumberDbt) {
        accountFound = account; itemIndex = index;
      }
    });
    let balanceFound;
    transactions.map((accountb) => {
      if (accountb.accountBalance) {
        balanceFound = accountb;
      }
    });

    if (!accountFound) {
      res.status(404).json({
        status: '404',
        message: 'account number not found',
      });
    }
    // setting how debit will reduce the balance account
    let accontBalance = (req.body.amount);
    const addingAmount = (accontBalance += accontBalance) / 2;
    const transaction = {
      transactionId: transactions.length + 1,
      accountNumber: accountFound.accountNumber,
      amount: req.body.amount,
      cashier: req.body.cashier,
      transactionType: req.body.transactionType,
      accountBalance: balanceFound.accountBalance - addingAmount,
    };

    if (!req.body.amount) {
      res.status(400).json({
        status: '400',
        message: 'amount field is required',
      });
    }

    transactions.push(transaction);
    res.status(200).json({
      status: '200',
      transaction,
      message: 'account debited successfully',
    });

    const updatedBalance = {
      accountNumber: accountFound.accountNumber,
      accountBalance: transaction.accountBalance,
    };
    accounts.splice(itemIndex, 1, updatedBalance);
    return res.status(200).json({
      status: '200',
      message: 'account Updated successfully',
      updatedBalance,
    });
  }
}
export default TransactionsController;
