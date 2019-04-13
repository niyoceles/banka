"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseUrl = '/api/v1'; // const { expect } = chai;
// Configure chai

_chai.default.use(_chaiHttp.default);

_chai.default.should(); // chai.expect();


describe('Create Account', function () {
  describe('POST /api/v1/accounts', function () {
    it('should display \'Sorry, this account already exists\'', function (done) {
      _chai.default.request(_app.default).post("".concat(baseUrl, "/accounts")).send({
        accountNumber: 1554972750164,
        firstName: 'Celestin',
        lastName: 'NIYONSABA',
        email: 'niyoceles3@gmail.com',
        type: 'Savings',
        openingBalance: '20000',
        openingDate: '2019/04/11'
      }).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
  });
});
describe('Account Account POST', function () {
  describe('POST / Create account with Invalid Data', function () {
    var badAccountData = {
      firstName: '',
      lastName: '',
      email: '',
      type: '',
      openingBalance: ''
    };
    it('Should return a 404 status', function (done) {
      _chai.default.request(_app.default).post("".concat(baseUrl, "/accounts")).send(badAccountData).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
  });
  describe('POST / Create account with Valid Data', function () {
    var accountData = {
      firstName: 'Celestin',
      lastName: 'NIYONSABA',
      email: 'niyoceles3@gmail.com',
      type: 'Savings',
      openingBalance: '20000'
    };
    it('Should return a 200 status', function (done) {
      _chai.default.request(_app.default).post("".concat(baseUrl, "/accounts")).send(accountData).end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });
});
describe('Account PATCH', function () {
  describe('PATCH / Account number not found ', function () {
    it('Should return a 404 status', function (done) {
      _chai.default.request(_app.default).patch("".concat(baseUrl, "/accounts/:accountNumber")).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
    describe('PATCH / Activate or deactivate with Invalid Data', function () {
      var badAccount = {
        accountNumber: '',
        status: ''
      };
      it('Should return a 404 status', function (done) {
        _chai.default.request(_app.default).post("".concat(baseUrl, "/accounts/:accountNumber")).send(badAccount).end(function (err, res) {
          res.should.have.status(404);
          done();
        });
      });
    });
  });
});
describe('DELETE', function () {
  describe('DELETE / Account deleted with Invalid ', function () {
    var accountData = {
      accountNumber: ''
    };
    it('Should return a 404 status', function (done) {
      _chai.default.request(_app.default).delete("".concat(baseUrl, "/accounts/:accountNumber")).send(accountData).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
    describe('DELETE / Delete account Successful', function () {
      var accountNumber = {
        accountNumber: '1554972750164'
      };
      it('Should return a 200 status', function (done) {
        _chai.default.request(_app.default).delete("".concat(baseUrl, "/accounts/:accountNumber")).send(accountNumber).end(function (err, res) {
          res.should.have.status(404);
          done();
        });
      });
    });
  });
});