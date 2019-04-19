import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import AccountController from '../controllers/AccountController';

const baseUrl = '/api/v1';


let token = '';



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

    it('should display account created when user create an account', (done) => {
      chai.request(app)
        .post(`${baseUrl}/accounts`)
        .send({
          accountNumber: 1554972750994,
          firstName: 'Celestin',
          lastName: 'NIYONSABA',
          email: 'niyoceles3@gmail.com',
          type: 'Savings',
          openingBalance: '20000',
          openingDate: '2019/04/11',
        })
        .end((err, res) => {
          res.should.have.status(200);
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
          // token = res.body.token;
          done();
        });
    });
  });
});

describe('GET an Account ', () => {
  it('Should return a 200 when single account record successful', (done) => {
    let accountNumber = '1554972750166';
    chai.request(app)
      .get(`${baseUrl}/account/${accountNumber}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('GET AccountNumber not found ', () => {
  it('Should return a 404 ', (done) => {
    let accountNumber = '1554972756';
    chai.request(app)
      .get(`${baseUrl}/account/${accountNumber}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
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

    it('Should return a 200 when Account updated successful', (done) => {
      const accountNumber = '1554972750176';
      chai.request(app)
        .patch(`${baseUrl}/accounts/${accountNumber}`)
        .end((err, res) => {
          res.should.have.status(200);
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

    // it('Should return a 200 when account deleted status', (done) => {
    //   const accountNumber = '1554972750164';
    //   chai.request(app)
    //     .delete(`${baseUrl}/accounts/${accountNumber}`)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       done();
    //     });
    // });


    describe('DELETE / Delete account Successful', () => {
      const accountNumber = {
        accountNumber: '1554972750176',
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
// TEST CONSTROLLER
describe('Testing methods[function] for AccountsController', () => {
  it('should be a function', (done) => {
    AccountController.getSingleAccount.should.be.a('function');
    AccountController.createAccount.should.be.a('function');
    AccountController.updateAccount.should.be.a('function');
    done();
  });
});