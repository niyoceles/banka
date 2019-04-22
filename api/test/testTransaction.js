import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const baseUrl = '/api/v1';

// const { expect } = chai;
// Configure chai
chai.use(chaiHttp);
chai.should();
// chai.expect();
let token = '';
describe('Credit a Bank Account with POST', () => {
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

  describe('POST / Account number not found ', () => {
    it('Should return a 404 status', (done) => {
      const accountNumber = '1555780';
      const badData = {
        cashier: '',
        amount: '',
        reason: '',
        oldBalance: '',
      };

      chai.request(app)
        .post(`${baseUrl}/transactions/${accountNumber}/credit`)
        .set('access-token', token)
        .send(badData)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('POST / Account number not found ', () => {
    it('Should return a 400 status', (done) => {
      const accountNumber = '1555835300494';
      const creditData = {
        amount: 2000,
        reason: 'Monthly charges',
        oldBalance: '2000',
      };

      chai.request(app)
        .post(`${baseUrl}/transactions/${accountNumber}/credit`)
        .set('access-token', token)
        .send(creditData)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    describe('POST / Account bad request', () => {
      it('Should return a status', (done) => {
        const accountNumber = '1555835300494';

        chai.request(app)
          .post(`${baseUrl}/transactions/${accountNumber}/credit`)
          .set('access-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });
    describe('POST / Account number not found ', () => {
      it('Should return a 404 status', (done) => {
        const accountNumber = '1555780';
        chai.request(app)
          .post(`${baseUrl}/transactions/${accountNumber}/credit`)
          .set('access-token', token)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });
  });
});

// ////////////////////////DEBIT///////////////////////////////
describe('Debit a Bank Account with POST', () => {
  describe('POST / without Authorized ', () => {
    it('Should return a 401 status', (done) => {
      const accountNumber = '1555780';
      chai.request(app)
        .post(`${baseUrl}/transactions/${accountNumber}/debit`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('POST / Debit account without required data', () => {
    const badAccount = {
      accountNumber: '',
    };
    it('Should return a 400 status', (done) => {
      const accountNumber = '1555780';
      chai.request(app)
        .post(`${baseUrl}/transactions/${accountNumber}/debit`)
        .set('access-token', token)
        .send(badAccount)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('POST / Debit account without required data', () => {
    it('Should return a 404 status', (done) => {
      const accountNumber = '1555780';
      chai.request(app)
        .post(`${baseUrl}/transactions/${accountNumber}/debit`)
        .set('access-token', token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('POST / Account number not found ', () => {
    it('Should return a 404 status', (done) => {
      const accountNumber = '1555835300494';
      const creditData = {
        cashier: 1,
        amount: 2000,
        reason: 'Monthly charges',
        oldBalance: '2000',
      };

      chai.request(app)
        .post(`${baseUrl}/transactions/${accountNumber}/debit`)
        .set('access-token', token)
        .send(creditData)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  // describe('POST / Account number found ', () => {
  //   it('Should return a 404 status', (done) => {
  //     const accountNumber = '1555835300494';

  //     chai.request(app)
  //       .post(`${baseUrl}/transactions/${accountNumber}/dedit`)
  //       .set('access-token', token)
  //       .end((err, res) => {
  //         res.should.have.status(201);
  //         done();
  //       });
  //   });
  // });
});

//////////////////GET SPECIFIC TRANSACTION //////////

describe('GET SPECIFIC ACCOUNT TRANSACTION', () => {
  describe('GET / without Authorized ', () => {
    it('Should return a 401 status', (done) => {
      const id = '12';
      chai.request(app)
        .get(`${baseUrl}/transactions/${id}`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
  describe('GET / Valid input specific account transaction  ', () => {
    it('Should return a 401 status', (done) => {
      const id = '1';
      chai.request(app)
        .get(`${baseUrl}/transactions/${id}`)
        .set('access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('GET / SPECIFIC ACCOUNT TRANSACTION', () => {
    it('without id Should return a 404 status', (done) => {
      const id = '';
      chai.request(app)
        .get(`${baseUrl}/transactions/${id}`)
        .set('access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
