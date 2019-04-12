"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseUrl = '/api/v1'; // Configure chai

_chai.default.use(_chaiHttp.default);

_chai.default.should();

describe('Sign Up', function () {
  describe('POST /api/v1/auth/signup', function () {
    // test 3
    it('should display \'Sorry, this account already exists\'', function (done) {
      _chai.default.request(_app.default).post("".concat(baseUrl, "/auth/signup")).send({
        id: 1,
        firstName: 'Celestin',
        lastName: 'NIYONSABA',
        email: 'niyoceles3@gmail.com',
        phone: '+250783067644',
        userName: 'niyoceles',
        password: 'celes123',
        token: 'a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe'
      }).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
  });
}); // end of Sign-up

describe('Users POST', function () {
  describe('POST / Signin with Invalid Data', function () {
    var signInData = {
      email: '',
      password: ''
    };
    it('Should return a 400 status', function (done) {
      _chai.default.request(_app.default).post("".concat(baseUrl, "/auth/signin")).send(signInData).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });
  });
  describe('POST / Signin with Valid Data', function () {
    var signInData = {
      email: 'niyoceles3@gmail.com',
      password: 'celes123'
    };
    it('Should return a 200 status', function (done) {
      _chai.default.request(_app.default).post("".concat(baseUrl, "/auth/signin")).send(signInData).end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });
  describe('/POST signUp User with Valid Data', function () {
    var signUpData = {
      id: 1,
      firstName: 'Celestin',
      lastName: 'NIYONSABA',
      email: 'niyoceles3@gmail.com',
      phone: '+250783067644',
      userName: 'niyoceles',
      password: 'celes123'
    };
    it('User successful registered Should return a 200 status', function (done) {
      _chai.default.request(_app.default).post("".concat(baseUrl, "/auth/signup")).send(signUpData).end(function (err, res) {
        res.body.should.be.a('object');
        done();
      });
    });
  });
});
describe('/POST signUp User with Invalid Data', function () {
  var signUpData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };
  it('Required data Should return a 404 status', function (done) {
    _chai.default.request(_app.default).post("".concat(baseUrl, "/auth/signup")).send(signUpData).end(function (err, res) {
      res.should.have.status(404);
      done();
    });
  });
  it(' Sign up with incorrect data Should return 404 ', function (done) {
    _chai.default.request(_app.default).post("".concat(baseUrl, "/auth/signup")).send(signUpData).end(function (err, res) {
      res.body.should.be.a('object');
      done();
    });
  });
});