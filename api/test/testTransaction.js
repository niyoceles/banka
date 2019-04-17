import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const baseUrl = '/api/v1';

// const { expect } = chai;
// Configure chai
chai.use(chaiHttp);
chai.should();
// chai.expect();
describe('Credit a Bank Account with POST', () => {
  describe('POST / Account number not found ', () => {
    it('Should return a 404 status', (done) => {
      chai.request(app)
        .post(`${baseUrl}/transactions/:accountNumber/credit`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

describe('Debit a Bank Account with POST', () => {
  describe('POST / Account number not found ', () => {
    it('Should return a 404 status', (done) => {
      chai.request(app)
        .post(`${baseUrl}/transactions/:accountNumber/debit`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    describe('POST / Debit account without required data', () => {
      const badAccount = {
        accountNumber: '',
      };
      it('Should return a 404 status', (done) => {
        chai.request(app)
          .post(`${baseUrl}/transactions/:accountNumber/debit`)
          .send(badAccount)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });
  });
});
