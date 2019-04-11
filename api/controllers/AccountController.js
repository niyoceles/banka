import accounts from '../models/accounts';

class AccountsController {
  // Get a single Accounts
  // static getSingleAccount(req, res) {
  //   const findAccounts = accounts.find(Accounts => Accounts.accountNumber === parseInt(req.params.accountNumber));
  //   if (findAccounts) res.status(200).json({ Accounts: findAccounts, message: 'A single Accounts record' });
  //   res.status(404).json({ message: 'Account Id is not found' });
  // }

  static createAccount(req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.type) {
      res.status(404).json({ message: 'All fied are required ' });
      return;
    }

    accounts.forEach((val) => {
      const accountData = req.body;
      if (val.accountNumber === accountData.accountNumber) res.status(404).json({ message: ' Already this account is exist' });
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
      status: '200', accounts,
    });
  }
}
export default AccountsController;
