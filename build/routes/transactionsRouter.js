"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _transactionController = _interopRequireDefault(require("../controllers/transactionController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get('/transactions/:accountNumber', _transactionController.default.getSingleTransaction);
router.post('/transactions/:accountNumber/credit', _transactionController.default.creditAccount);
router.post('/transactions/:accountNumber/debit', _transactionController.default.debitAccount);
var _default = router;
exports.default = _default;