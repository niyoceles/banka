"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var transactions = [{
  transactionId: 1554972750150,
  accountNumber: 1554972750176,
  amount: 30000,
  cashier: 1,
  // cashier that consumated the transaction
  transactionType: 'credit',
  accountBalance: '50000'
}, {
  transactionId: 1554972750160,
  accountNumber: 1554972750176,
  amount: 30000,
  cashier: 1,
  // cashier that consumated the transaction
  transactionType: 'debit',
  accountBalance: 50000
}];
var _default = transactions;
exports.default = _default;