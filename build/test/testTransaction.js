"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseUrl = '/api/v1'; // const { expect } = chai;
// Configure chai

_chai.default.use(_chaiHttp.default);

_chai.default.should(); // chai.expect();


describe('Credit a Bank Account with POST', function () {
  describe('POST / Account number not found ', function () {
    it('Should return a 404 status', function (done) {
      _chai.default.request(_app.default).post("".concat(baseUrl, "/transactions/:accountNumber/credit")).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
    describe('POST / Credit account without required data', function () {
      var badAccount = {
        accountNumber: ''
      };
      it('Should return a 404 status', function (done) {
        _chai.default.request(_app.default).post("".concat(baseUrl, "/transactions/:accountNumber/credit")).send(badAccount).end(function (err, res) {
          res.should.have.status(404);
          done();
        });
      });
    });
  });
});
describe('Debit a Bank Account with POST', function () {
  describe('POST / Account number not found ', function () {
    it('Should return a 404 status', function (done) {
      _chai.default.request(_app.default).post("".concat(baseUrl, "/transactions/:accountNumber/debit")).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
    describe('POST / Debit account without required data', function () {
      var badAccount = {
        accountNumber: ''
      };
      it('Should return a 404 status', function (done) {
        _chai.default.request(_app.default).post("".concat(baseUrl, "/transactions/:accountNumber/debit")).send(badAccount).end(function (err, res) {
          res.should.have.status(404);
          done();
        });
      });
    });
  });
});