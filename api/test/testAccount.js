import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const baseUrl = '/api/v1';

// const { expect } = chai;
// Configure chai
chai.use(chaiHttp);
chai.should();
// chai.expect();

describe('Create Account', () => {
  describe('POST /api/v1/accounts', () => {
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
    const badAccountData = {
      firstName: '',
      lastName: '',
      email: '',
      type: '',
      openingBalance: '',
    };
    it('Should return a 404 status', (done) => {
      chai.request(app)
        .post(`${baseUrl}/accounts`)
        .send(badAccountData)
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

describe('Account PATCH', () => {
  describe('PATCH / Account number not found ', () => {
    it('Should return a 401 status', (done) => {
      chai.request(app)
        .patch(`${baseUrl}/accounts/:accountNumber`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    describe('PATCH / Activate or deactivate with Invalid Data', () => {
      const badAccount = {
        accountNumber: '',
        status: '',
      };
      it('Should return a 404 status', (done) => {
        chai.request(app)
          .post(`${baseUrl}/accounts/:accountNumber`)
          .send(badAccount)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });
  });
});


describe('DELETE', () => {

  describe('DELETE / Account deleted with Invalid ', () => {
    const accountData = {
      accountNumber: '',
    };
    it('Should return a 401 status', (done) => {
      chai.request(app)
        .delete(`${baseUrl}/accounts/:accountNumber`)
        .send(accountData)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    describe('DELETE / Delete account Successful', () => {
      const accountNumber = {
        accountNumber: '1554972750164',
      };
      it('Should return a 200 status', (done) => {
        chai.request(app)
          .delete(`${baseUrl}/accounts/:accountNumber`)
          .send(accountNumber)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });
  });
});