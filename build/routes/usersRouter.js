"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.post('/signup', _UsersController.default.signup);
router.post('/signin', _UsersController.default.signin);
var _default = router;
exports.default = _default;