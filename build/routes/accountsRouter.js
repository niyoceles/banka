"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _AccountController = _interopRequireDefault(require("../controllers/AccountController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.post('/accounts', _AccountController.default.createAccount);
router.get('/account/:accountNumber', _AccountController.default.getSingleAccount);
router.patch('/accounts/:accountNumber', _AccountController.default.updateAccount);
router.delete('/accounts/:accountNumber', _AccountController.default.deleteAccount);
var _default = router;
exports.default = _default;