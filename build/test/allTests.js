"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _testUser = _interopRequireDefault(require("./testUser"));

var _testAccount = _interopRequireDefault(require("./testAccount"));

var _testTransaction = _interopRequireDefault(require("./testTransaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  userTest: _testUser.default,
  accountTest: _testAccount.default,
  transactionTest: _testTransaction.default
};
exports.default = _default;