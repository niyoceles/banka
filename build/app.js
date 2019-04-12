"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _usersRouter = _interopRequireDefault(require("./routes/usersRouter"));

var _accountsRouter = _interopRequireDefault(require("./routes/accountsRouter"));

var _transactionsRouter = _interopRequireDefault(require("./routes/transactionsRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Instantiate express
var app = (0, _express.default)(); // initialize url version

app.use(_express.default.json());
var baseUrl = '/api/v1'; // Configure app to user bodyParser

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _morgan.default)('dev'));
app.use("".concat(baseUrl, "/auth"), _usersRouter.default);
app.use("".concat(baseUrl), _accountsRouter.default);
app.use("".concat(baseUrl), _transactionsRouter.default); // ERRROR HANDLING

app.use(function (req, res, next) {
  var error = new Error('Not found');
  error.status = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
}); // Export our app for testing purposes

var _default = app;
exports.default = _default;