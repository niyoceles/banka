import accounts from '../models/accounts';

class AccountsController {
  // Get a single Accounts
  static getSingleAccount(req, res) {
    if (req.decodedToken.isAdmin === false) {
      return res.status(401).json({
        message: 'Sorry you are not allowed to access this route',
      });
    }
    const findAccounts = accounts.find((Accounts) => {
      return Accounts.accountNumber === parseInt(req.params.accountNumber, 10);
    });
    if (!findAccounts) {
      res.status(404).json({
        status: '404',
        message: 'Account Id is not found',
      });
    }

    return res.status(200).json({
      status: '200',
      Accounts: findAccounts,
      message: 'A single Accounts record',
    });
  }

  static createAccount(req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.type) {
      res.status(404).json({
        status: '404', message: 'All fied are required ',
      });
      return;
    }
    accounts.forEach((val) => {
      const accountData = req.body;
      if (val.accountNumber === accountData.accountNumber && val.accountNumber === accountData.accountNumber) {
        res.status(404).json({
          status: '404',
          message: ' Already this account is exist',
        });
      }
    });
    const date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    const account = {
      // generating bank account by using date function
      accountNumber: Date.now(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      type: req.body.type,
      status: 'Deactivate',
      openingBalance: req.body.openingBalance,
      openingDate: date.toString(),
    };
    accounts.push(account);
    res.status(200).json({
      status: '200',
      accounts,
    });
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
      return Accounts.accountNumber === parseInt(req.params.accountNumber, 10);
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
