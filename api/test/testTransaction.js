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

const transaction = {
  transactionId: 1554972750150,
  accountNumber: 1554972750176,
  amount: 30000,
  cashier: 1,
  transactionType: 'credit',
  accountBalance: '50000',
};
describe('Credit a Bank Account with POST', () => {
  describe('POST / Account number not found ', () => {
    it('Should return a 401 status', (done) => {
      chai.request(app)
        .post(`${baseUrl}/transactions/:accountNumber/credit`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    describe('POST / Credit account without required data', () => {
      const badAccount = {
        accountNumber: '',
      };
      it('Should return a 401 status', (done) => {
        chai.request(app)
          .post(`${baseUrl}/transactions/:accountNumber/credit`)
          .send(badAccount)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
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
          res.should.have.status(401);
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
            res.should.have.status(401);
            done();
          });
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
