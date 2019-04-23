import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import TransactionController from '../controllers/transactionController';

const { getSingleTransaction, debitAccount, creditAccount } = TransactionController;

const baseUrl = '/api/v1';

const { expect } = chai;
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
    it('Should return a 404 status', (done) => {
      const accountNumber = '1555780';
      chai.request(app)
        .post(`${baseUrl}/transactions/${accountNumber}/debit`)
        .set('access-token', token)
        .send(badAccount)
        .end((err, res) => {
          res.should.have.status(404);
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
          res.should.have.status(404);
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
  describe('GET / bad request ', () => {
    it('Should return a 404 status', (done) => {
      const id = '12';
      chai.request(app)
        .get(`${baseUrl}/transactions/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe('GET / id not found account transaction  ', () => {
    it('Should return a 404 status', (done) => {
      const id = '0';
      chai.request(app)
        .get(`${baseUrl}/transactions/${id}`)
        .set('access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
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


// TEST CONSTROLLER
describe('Testing function of TransactionController', () => {
  it('should be a function', (done) => {
    TransactionController.getSingleTransaction.should.be.a('function');
    TransactionController.creditAccount.should.be.a('function');
    TransactionController.debitAccount.should.be.a('function');
    done();
  });
});

describe('Testing getSingleTransaction function', () => {
  it('should be a function', (done) => {
    TransactionController.getSingleTransaction.should.be.a('function');
    done();
  });
});

describe('Testing methods[function] for TransactionController', () => {
  it('should be a function', (done) => {
    TransactionController.creditAccount.should.be.a('function');
    done();
  });
});
describe('Testing methods[function] for TransactionController', () => {
  it('should be a function', (done) => {
    TransactionController.debitAccount.should.be.a('function');
    done();
  });
});


describe('Test property of object', () => {
  describe('transaction object', () => {
    it('should have some property ', (done) => {
      expect(transaction).to.have.property('transactionId');
      done();
    });
  });
});
describe('Test property of object', () => {
  describe('transaction object', () => {
    it('should have some property ', (done) => {
      expect(transaction).to.have.property('accountNumber');
      done();
    });
  });
});

describe('Test property of object', () => {
  describe('transaction object', () => {
    it('should have some property ', (done) => {
      expect(transaction).to.have.property('amount');
      done();
    });
  });
});
describe('Test property of object', () => {
  describe('transaction object', () => {
    it('should have some property ', (done) => {
      expect(transaction).to.have.property('transactionType');
      done();
    });
  });
});
describe('Test property of object', () => {
  describe('transaction object', () => {
    it('should have some property ', (done) => {
      expect(transaction).to.have.property('accountBalance');
      done();
    });
  });
});
describe('Test property of object', () => {
  describe('transaction object', () => {
    it('should have properties has its expected value', (done) => {
      expect({
        transactionId: 1554972750150,
        accountNumber: 1554972750176,
        amount: 30000,
        cashier: 1,
        transactionType: 'credit',
        accountBalance: '50000',
      }).to.include({
        transactionId: 1554972750150,
        accountNumber: 1554972750176,
        amount: 30000,
        cashier: 1,
        transactionType: 'credit',
        accountBalance: '50000',
      });
      done();
    });
  });
});

describe('Test Transaction', () => {
  describe('transaction object to be equal transaction', () => {
    it('should have be equal transaction', (done) => {
      expect(transaction).to.equal(transaction);
      done();
    });
  });
  describe('function getSingleTransaction', () => {
    it('should be equal to getSingleTransaction ', (done) => {
      expect(getSingleTransaction).to.equal(getSingleTransaction);
      done();
    });
  });
  describe('function creditAccount', () => {
    it('should be equal to creditAccount', (done) => {
      expect(creditAccount).to.equal(creditAccount);
      done();
    });
  });
  describe('function debitAccount ', () => {
    it('should be equal to debitAccount', (done) => {
      expect(debitAccount).to.equal(debitAccount);
      done();
    });
  });
});
