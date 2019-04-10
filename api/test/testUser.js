import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const baseUrl = '/api/v1';
// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Users GET', () => {
  describe('GET / the Valid Data', () => {
    it('Should return a 200 status', (done) => {
      chai.request(app)
        .get(`${baseUrl}/auth/users`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('User id Not found should return status 200', (done) => {
      chai.request(app)
        .get(`${baseUrl}/auth/users/:id`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

describe('Sign Up', () => {
  describe('POST /api/v1/auth/signup', () => {
    // test 3
    it('should display \'Sorry, this account already exists\'', (done) => {
      chai.request(app)
        .post(`${baseUrl}/auth/signup`)
        .send({
          id: 1,
          firstName: 'Celestin',
          lastName: 'NIYONSABA',
          email: 'niyoceles3@gmail.com',
          phone: '+250783067644',
          userName: 'niyoceles',
          password: 'celes123',
          token: 'a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe',
        })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
}); // end of Sign-up

describe('Users POST', () => {
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

  describe('/POST signUp User with Valid Data', () => {
    const signUpData = {
      id: 1,
      firstName: 'Celestin',
      lastName: 'NIYONSABA',
      email: 'niyoceles3@gmail.com',
      phone: '+250783067644',
      userName: 'niyoceles',
      password: 'celes123',
    };
    it('User successful registered Should return a 200 status', (done) => {
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

describe('/POST signUp User with Invalid Data', () => {
  const signUpData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  it('Required data Should return a 404 status', (done) => {
    chai.request(app)
      .post(`${baseUrl}/auth/signup`)
      .send(signUpData)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it(' Sign up with incorrect data Should return 404 ', (done) => {
    chai.request(app)
      .post(`${baseUrl}/auth/signup`)
      .send(signUpData)
      .end((err, res) => {
        res.body.should.be.a('object');
        done();
      });
  });
});