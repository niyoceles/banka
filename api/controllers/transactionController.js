import transactions from '../models/transactions';
import accounts from '../models/accounts';
// import accounts from '../models/users';

class TransactionsController {
  // Get a single Transactions
  static getSingleTransaction(req, res) {
    const findAccounts = accounts.find(Accounts => Accounts.accountNumber === parseInt(req.params.accountNumber, 10));
    if (findAccounts) res.status(200).json({ Accounts: findAccounts, message: 'A single Accounts record' });
    res.status(404).json({ message: 'Accounts Id is not found' });
  }

  static creditAccount(req, res) {
    const accountNumberCdt = parseInt(req.params.accountNumber, 10);
    let accountFound; let itemIndex;
    accounts.map((account, index) => {
      if (account.accountNumber === accountNumberCdt) { accountFound = account; itemIndex = index }
    });
    let balanceFound;
    transactions.map((accountb) => {
      if (accountb.accountBalance) { balanceFound = accountb }
    });

    if (!accountFound) res.status(404).json({ status: '404', message: 'account number not found' });
    if (!balanceFound) res.status(404).json({ status: '404', message: 'account number not found' });
    // generating  auto increment after credit account
    let accontBalance = (req.body.amount);
    const addingAmount = (accontBalance += accontBalance) / 2;
    const transaction = {
      transactionId: transactions.length + 1,
      accountNumber: accountFound.accountNumber,
      amount: req.body.amount,
      cashier: req.body.cashier,
      transactionType: req.body.transactionType,
      accountBalance: balanceFound.accountBalance + addingAmount,
    };

    transactions.push(transaction);
    res.status(200).json({ status: '200', transactions, message: 'account Credited successfully' });

    const updatedBalance = { accountNumber: accountFound.accountNumber, accountBalance: transaction.accountBalance, };
    accounts.splice(itemIndex, 1, updatedBalance);
    return res.status(200).json({ status: '200', message: 'account Updated successfully', updatedBalance });
  }

  static debitAccount(req, res) {
    const accountNumberDbt = parseInt(req.params.accountNumber, 10);
    let accountFound; let itemIndex;
    accounts.map((account, index) => {
      if (account.accountNumber === accountNumberDbt) { accountFound = account; itemIndex = index }
    });
    let balanceFound;
    transactions.map((accountb) => {
      if (accountb.accountBalance) { balanceFound = accountb }
    });

    if (!accountFound) res.status(404).json({ status: '404', message: 'account number not found' });
    if (!balanceFound) res.status(404).json({ status: '404', message: 'account number not found' });
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

    transactions.push(transaction);
    res.status(200).json({ status: '200', transactions, message: 'account debited successfully' });

    const updatedBalance = { accountNumber: accountFound.accountNumber, accountBalance: transaction.accountBalance, };
    accounts.splice(itemIndex, 1, updatedBalance);
    return res.status(200).json({ status: '200', message: 'account Updated successfully', updatedBalance });
  }
}
export default TransactionsController;
