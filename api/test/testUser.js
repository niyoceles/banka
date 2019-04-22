import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../models';
import app from '../app';

const baseUrl = '/api/v1';
// Configure chai
chai.use(chaiHttp);
chai.should();
const { expect } = chai;
let token = '';


describe('Sign-up', () => {
  // users table
  before(async () => {
    try {
      await db.query('TRUNCATE users CASCADE; ALTER SEQUENCE id RESTART WITH 1;');
    } catch (error) {
      console.log(error);
    }
  });

  describe('Sign Up', () => {
    describe('POST /api/v1/auth/signup', () => {
      it('should display \' Account Successful registered\'', (done) => {
        chai.request(app)
          .post(`${baseUrl}/auth/signup`)
          .send({
            firstName: 'Celestin',
            lastName: 'NIYONSABA',
            phone: '+250783067644',
            email: 'niyoceles3@gmail.com',
            userName: 'niyoceles',
            password: 'celes123',
            type: 'staff',
            isAdmin: true,
            location: 'Kigali',
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });

      it('should display \'Sorry, this account already exists\'', (done) => {
        chai.request(app)
          .post(`${baseUrl}/auth/signup`)
          .send({
            firstName: 'Celestin',
            lastName: 'NIYONSABA',
            phone: '+250783067644',
            email: 'niyoceles3@gmail.com',
            userName: 'niyoceles',
            password: 'celes123',
            type: 'staff',
            isAdmin: true,
            location: 'Kigali',
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });
  describe('/POST signUp User with Invalid Data', () => {
    const signUpData = {
      lastName: 'NIYONSABAxxxxxxxx',
      userName: 'niyocelesxxxxxxxx',
      phone: '2507830676442',
      email: 'niyoceles@gmail.com',
      password: 'celeeeee123',
      type: 'staff',
      isAdmin: false,
      location: 'Kigali',
    };
    it('User signup registered Should return a 400 status', (done) => {
      chai.request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(signUpData)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.should.have.status(400);
          done();
        });
    });
  });
});
describe('Users Signin POST', () => {
  describe('POST / Signin with Invalid Data', () => {
    const signInData = {
      email: '',
      password: '',
    };
    it('Should return a 400 status', (done) => {
      chai.request(app)
        .post(`${baseUrl}/auth/signin`)
        .send(signInData)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('POST / Signin with wrong Email or password', () => {
    const signInData = {
      email: 'niyocelesz@zzzzzzz',
      password: 'celes123',
    };
    it('Should return a 400 status', (done) => {
      chai.request(app)
        .post(`${baseUrl}/auth/signin`)
        .send(signInData)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('POST / Signin Successful Login', () => {
    const signInData = {
      email: 'niyoceles3@gmail.com',
      password: 'celes123',
    };
    it('Should return a 200 status', (done) => {
      chai.request(app)
        .post(`${baseUrl}/auth/signin`)
        .send(signInData)
        .end((err, res) => {
          res.should.have.status(200);
          token = res.body.token;
          done();
        });
    });
  });
});
