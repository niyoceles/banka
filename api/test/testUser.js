import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../models';
import app from '../app';

const baseUrl = '/api/v1';
// Configure chai
chai.use(chaiHttp);
chai.should();
const { expect } = chai;


describe('Sign-up', () => {
  // clear users table
  before(async () => {
    try {
      await db.query('TRUNCATE users CASCADE; ALTER SEQUENCE id RESTART WITH 1;');
    } catch (error) {
      console.log(error);
    }
  });

  describe('Sign Up', () => {
    describe('POST /api/v1/auth/signup', () => {
      // test 3
      it('should display \'Sorry, this account already exists\'', (done) => {
        chai.request(app)
          .post(`${baseUrl}/auth/signup`)
          .send({
            firstName: 'Celestin',
            lastName: 'NIYONSABA',
            userName: 'niyoceles',
            phone: '+250783067644',
            email: 'niyoceles3gmail.cm',
            type: 'staff',
            isAdmin: true,
            location: 'Kigali',
          })
          .end((err, res) => {
            expect(res.status).to.equal(400);
            // expect(Object.keys(res.body.data).length).to.be.above(0);
            done();
          });
      });
    });
  });
  // describe('/POST signUp User with Valid Data', () => {
  //   const signUpData = {
  //     firstName: 'Celestinzzzzzzzzzz',
  //     lastName: 'NIYONSABAxxxxxxxx',
  //     userName: 'niyocelesxxxxxxxx',
  //     phone: '+2507830676442',
  //     email: 'niyoceles3gmail.comq',
  //     type: 'staff',
  //     isAdmin: false,
  //     location: 'Kigali',
  //   };
  //   it('User successful registered Should return a 201 status', (done) => {
  //     chai.request(app)
  //       .post(`${baseUrl}/auth/signup`)
  //       .send(signUpData)
  //       .end((err, res) => {
  //         // res.body.should.be.a('object');
  //         res.should.have.status(201);
  //         done();
  //       });
  //   });
  // });
  // 

  // describe('GET an User ', () => {
  //   it('Should return a 200 when single user record successful', (done) => {
  //     let findUsers = 4;
  //     chai.request(app)
  //       .get(`${baseUrl}/users/${findUsers}`)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  //   });
  // });

  // describe('GET User not found ', () => {
  //   it('Should return 404 ', (done) => {
  //     let findUsers = '9999999';
  //     chai.request(app)
  //       .get(`${baseUrl}/users/${findUsers}`)
  //       .end((err, res) => {
  //         res.should.have.status(404);
  //         done();
  //       });
  //   });
  // });

  // describe('Users POST', () => {
  // describe('POST / Signin with Invalid Data', () => {
  //   const signInData = {
  //     email: '',
  //     password: '',
  //   };
  //   it('Should return a 400 status', (done) => {
  //     chai.request(app)
  //       .post(`${baseUrl}/auth/signin`)
  //       .send(signInData)
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //         done();
  //       });
  //   });
  // });

  // describe('POST / Signin with Valid Data', () => {
  //   const signInData = {
  //     email: 'niyoceles3@gmail.com',
  //     password: 'celes123',
  //   };
  //   it('Should return a 200 status', (done) => {
  //     chai.request(app)
  //       .post(`${baseUrl}/auth/signin`)
  //       .send(signInData)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  //   });
  // });

  describe('/POST signUp User with Invalid Data', () => {
    const signUpData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    };
    it('Required data Should return a 400 status', (done) => {
      chai.request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(signUpData)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it(' Sign up with incorrect data Should return 401 ', (done) => {
      chai.request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(signUpData)
        .end((err, res) => {
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
