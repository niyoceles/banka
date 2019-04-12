"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UsersController =
/*#__PURE__*/
function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, null, [{
    key: "getSingleUser",
    // Get a single Users
    value: function getSingleUser(req, res) {
      var findUsers = _users.default.find(function (Users) {
        return Users.id === parseInt(req.params.id);
      });

      if (findUsers) res.status(200).json({
        Users: findUsers,
        message: 'A single Users record'
      });
      res.status(404).json({
        message: 'Users Id is not found'
      });
    }
  }, {
    key: "signup",
    value: function signup(req, res) {
      if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.userName || !req.body.phone || !req.body.password) {
        res.status(404).json({
          message: 'All fied are required '
        });
        return;
      }

      _users.default.forEach(function (val) {
        var userData = req.body;
        if (val.email === userData.email) res.status(404).json({
          message: ' Already have an account!'
        });
      }); // new user Object with generating id auto increment


      var user = {
        id: _users.default.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        userName: req.body.userName,
        password: req.body.password
      };

      _users.default.push(user);

      res.status(200).json({
        status: '200',
        users: _users.default
      });
    }
  }, {
    key: "signin",
    value: function signin(req, res) {
      // get sign data from the request body
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;

      if (!email || !password) {
        res.status(400).json({
          status: 'fail',
          message: 'Email and password are required'
        });
      } else {
        var findUsers = _users.default.find(function (Users) {
          return Users.email === req.body.email && Users.password === req.body.password;
        });

        if (findUsers) res.status(200).json({
          status: '200',
          data: findUsers,
          message: 'Welcome you are successful login'
        });
        res.status(404).json({
          message: 'Sorry you are not registered! or your email and password are not match'
        });
      }
    }
  }]);

  return UsersController;
}();

var _default = UsersController;
exports.default = _default;