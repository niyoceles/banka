import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const baseUrl = '/api/v1';
// Configure chai
chai.use(chaiHttp);
chai.should();
describe('Create Account', () => {
  describe('POST /api/v1/accounts', () => {
    // test 3
    it('should display \'Sorry, this account already exists\'', (done) => {
      chai.request(app)
        .post(`${baseUrl}/accounts`)
        .send({
          accountNumber: 1554972750164,
          firstName: 'Celestin',
          lastName: 'NIYONSABA',
          email: 'niyoceles3@gmail.com',
          type: 'Savings',
          openingBalance: '20000',
          openingDate: '2019/04/11',
        })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

describe('Account Account POST', () => {
  describe('POST / Create account with Invalid Data', () => {
    const accountData = {
      firstName: '',
      lastName: '',
      email: '',
      type: '',
      openingBalance: '',
    };
    it('Should return a 404 status', (done) => {
      chai.request(app)
        .post(`${baseUrl}/accounts`)
        .send(accountData)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('POST / Create account with Valid Data', () => {
    const accountData = {
      firstName: 'Celestin',
      lastName: 'NIYONSABA',
      email: 'niyoceles3@gmail.com',
      type: 'Savings',
      openingBalance: '20000',
    };
    it('Should return a 200 status', (done) => {
      chai.request(app)
        .post(`${baseUrl}/accounts`)
        .send(accountData)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
