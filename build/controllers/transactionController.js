"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _transactions = _interopRequireDefault(require("../models/transactions"));

var _accounts = _interopRequireDefault(require("../models/accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import accounts from '../models/users';
var TransactionsController =
/*#__PURE__*/
function () {
  function TransactionsController() {
    _classCallCheck(this, TransactionsController);
  }

  _createClass(TransactionsController, null, [{
    key: "getSingleTransaction",
    // Get a single Transactions
    value: function getSingleTransaction(req, res) {
      var findAccounts = _accounts.default.find(function (Accounts) {
        return Accounts.accountNumber === parseInt(req.params.accountNumber, 10);
      });

      if (findAccounts) res.status(200).json({
        Accounts: findAccounts,
        message: 'A single Accounts record'
      });
      res.status(404).json({
        message: 'Accounts Id is not found'
      });
    }
  }, {
    key: "creditAccount",
    value: function creditAccount(req, res) {
      var accountNumberCdt = parseInt(req.params.accountNumber, 10);
      var accountFound;
      var itemIndex;

      _accounts.default.map(function (account, index) {
        if (account.accountNumber === accountNumberCdt) {
          accountFound = account;
          itemIndex = index;
        }
      });

      var balanceFound;

      _transactions.default.map(function (accountb) {
        if (accountb.accountBalance) {
          balanceFound = accountb;
        }
      });

      if (!accountFound) res.status(404).json({
        status: '404',
        message: 'account number not found'
      });
      if (!balanceFound) res.status(404).json({
        status: '404',
        message: 'account number not found'
      }); // generating  auto increment after credit account

      var accontBalance = req.body.amount;
      var addingAmount = (accontBalance += accontBalance) / 2;
      var transaction = {
        transactionId: _transactions.default.length + 1,
        accountNumber: accountFound.accountNumber,
        amount: req.body.amount,
        cashier: req.body.cashier,
        transactionType: req.body.transactionType,
        accountBalance: balanceFound.accountBalance + addingAmount
      };

      _transactions.default.push(transaction);

      res.status(200).json({
        status: '200',
        transactions: _transactions.default,
        message: 'account Credited successfully'
      });
      var updatedBalance = {
        accountNumber: accountFound.accountNumber,
        accountBalance: transaction.accountBalance
      };

      _accounts.default.splice(itemIndex, 1, updatedBalance);

      return res.status(200).json({
        status: '200',
        message: 'account Updated successfully',
        updatedBalance: updatedBalance
      });
    }
  }, {
    key: "debitAccount",
    value: function debitAccount(req, res) {
      var accountNumberDbt = parseInt(req.params.accountNumber, 10);
      var accountFound;
      var itemIndex;

      _accounts.default.map(function (account, index) {
        if (account.accountNumber === accountNumberDbt) {
          accountFound = account;
          itemIndex = index;
        }
      });

      var balanceFound;

      _transactions.default.map(function (accountb) {
        if (accountb.accountBalance) {
          balanceFound = accountb;
        }
      });

      if (!accountFound) res.status(404).json({
        status: '404',
        message: 'account number not found'
      });
      if (!balanceFound) res.status(404).json({
        status: '404',
        message: 'account number not found'
      }); // setting how debit will reduce the balance account

      var accontBalance = req.body.amount;
      var addingAmount = (accontBalance += accontBalance) / 2;
      var transaction = {
        transactionId: _transactions.default.length + 1,
        accountNumber: accountFound.accountNumber,
        amount: req.body.amount,
        cashier: req.body.cashier,
        transactionType: req.body.transactionType,
        accountBalance: balanceFound.accountBalance - addingAmount
      };

      _transactions.default.push(transaction);

      res.status(200).json({
        status: '200',
        transactions: _transactions.default,
        message: 'account debited successfully'
      });
      var updatedBalance = {
        accountNumber: accountFound.accountNumber,
        accountBalance: transaction.accountBalance
      };

      _accounts.default.splice(itemIndex, 1, updatedBalance);

      return res.status(200).json({
        status: '200',
        message: 'account Updated successfully',
        updatedBalance: updatedBalance
      });
    }
  }]);

  return TransactionsController;
}();

var _default = TransactionsController;
exports.default = _default;