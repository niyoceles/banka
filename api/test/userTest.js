import { expect, chai } from 'chai';
import users from '../models/user';
import app from '../app';
const baseUrl = '/api/v1';

/* Sign-up */
describe('Sign Up', () => {
  describe('POST /api/v1/auth/signup', () => {
    // test 1
    it('should return the user information if the registration has succeeded', (done) => {
      chai.request(app)
        .post(`${baseUrl}/auth/signup`)
        .send({
          id: '001',
          firstName: 'Celestin',
          lastName: 'NIYONSABA',
          email: 'niyoceles3@gmail.com',
          phone: '+250783067644',
          userName: 'niyoceles',
          password: 'celes123',
          token: 'a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(Object.keys(JSON.parse(res.text).users).length).to.be.above(0);
          done();
        });
    });

    // test 2
    it('should display \'Please, enter the required information to sign-up!\'', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          id: '001',
          firstName: 'Celestin',
          lastName: 'NIYONSABA',
          email: 'niyoceles3@gmail.com',
          phone: '+250783067644',
          userName: 'niyoceles',
          password: 'celes123',
          token: 'a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(JSON.parse(res.text).error).to.equal('Please, enter the required information to sign-up!');
          done();
        });
    });

    // test 3
    it('should display \'Sorry, this account already exists\'', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          id: '001',
          firstName: 'Celestin',
          lastName: 'NIYONSABA',
          email: 'niyoceles3@gmail.com',
          phone: '+250783067644',
          userName: 'niyoceles',
          password: 'celes123',
          token: 'a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(JSON.parse(res.text).error).to.equal('Sorry, this account already exists');
          done();
        });
    });
  });
}); // end of Sign-up

/* Sign-in */
describe('Sign-in', () => {
  describe('POST /api/v1/auth/login', () => {
    // test 1
    it('should return the user information if the account exists', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          userName: 'niyoceles',
          password: 'celes123',
        })
        .end((err, res) => {
          expect(res.status).to.equal(202);
          expect(Object.keys(JSON.parse(res.text).users).length).to.be.above(0);
          done();
        });
    });

    // test 2
    it('should display \'Sorry, your username or password is incorrect\'', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          userName: 'celes123',
          password: 'celes12',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(JSON.parse(res.text).error).to.equal('Sorry, your username or password is incorrect');
          done();
        });
    });

    // test 3
    it('should display \'Please, enter your username and your password!\'', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          userName: '',
          password: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(JSON.parse(res.text).error).to.equal('Please, enter your username and your password!');
          done();
        });
    });
  });
}); // end of Sign-in
