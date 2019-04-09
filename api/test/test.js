// Import the dependencies for testing
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
        .get(`${baseUrl}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('Should get all Users', (done) => {
      chai.request(app)
        .get(`${baseUrl}`)
        .end((err, res) => {
          res.body.should.be.a('object');
          done();
        });
    });
  });
});

describe('Users POST', () => {
  describe('POST / Signup with Invalid Data', () => {
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
      firstName: 'Celestin',
      lastName: 'NIYONSABA',
      email: 'niyoceles3@gmail.com',
      phone: '+250783067644',
    };
    it('Should return a 200 status', (done) => {
      chai.request(app)
        .post(`${baseUrl}/auth/signup`)
        .send(signUpData)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('Should return the Data', (done) => {
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
