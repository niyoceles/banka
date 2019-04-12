"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _accounts = _interopRequireDefault(require("../models/accounts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccountsController =
/*#__PURE__*/
function () {
  function AccountsController() {
    _classCallCheck(this, AccountsController);
  }

  _createClass(AccountsController, null, [{
    key: "getSingleAccount",
    // Get a single Accounts
    value: function getSingleAccount(req, res) {
      var findAccounts = _accounts.default.find(function (Accounts) {
        return Accounts.accountNumber === parseInt(req.params.accountNumber);
      });

      if (!findAccounts) res.status(404).json({
        status: '404',
        message: 'Account Id is not found'
      });
      res.status(200).json({
        status: '200',
        Accounts: findAccounts,
        message: 'A single Accounts record'
      });
    }
  }, {
    key: "createAccount",
    value: function createAccount(req, res) {
      if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.type) {
        res.status(404).json({
          status: '404',
          message: 'All fied are required '
        });
        return;
      }

      _accounts.default.forEach(function (val) {
        var accountData = req.body;
        if (val.accountNumber === accountData.accountNumber) res.status(404).json({
          status: '404',
          message: ' Already this account is exist'
        });
      });

      var date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
      var account = {
        // generating bank account by using date function
        accountNumber: Date.now(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        type: req.body.type,
        status: 'Deactivate',
        openingBalance: req.body.openingBalance,
        openingDate: date.toString()
      };

      _accounts.default.push(account);

      res.status(200).json({
        status: '200',
        accounts: _accounts.default
      });
    }
  }, {
    key: "updateAccount",
    value: function updateAccount(req, res) {
      var accountNumber = parseInt(req.params.accountNumber, 10);
      var accountFound;
      var itemIndex;

      _accounts.default.map(function (account, index) {
        if (account.accountNumber === accountNumber) {
          accountFound = account;
          itemIndex = index;
        }
      });

      if (!accountFound) res.status(404).json({
        status: '404',
        message: 'account number not found'
      });
      if (!req.body.status) res.status(400).json({
        status: '400',
        message: 'status is required'
      });
      var updatedAccount = {
        accountNumber: accountFound.accountNumber,
        status: req.body.status
      };

      _accounts.default.splice(itemIndex, 1, updatedAccount);

      return res.status(200).json({
        status: '200',
        message: 'account Updated successfully',
        updatedAccount: updatedAccount
      });
    }
  }, {
    key: "deleteAccount",
    value: function deleteAccount(req, res) {
      var findAccounts = _accounts.default.find(function (Accounts) {
        return Accounts.accountNumber === parseInt(req.params.accountNumber);
      });

      if (!findAccounts) res.status(404).json({
        status: '404',
        message: 'Account number is not found'
      });

      var index = _accounts.default.indexOf(findAccounts);

      _accounts.default.splice(index, 1);

      res.status(200).json({
        status: '200',
        message: 'Account successfully deleted'
      });
    }
  }]);

  return AccountsController;
}();

var _default = AccountsController;
exports.default = _default;