import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const baseUrl = '/api/v1';

// const { expect } = chai;
// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Create Account', () => {
  describe('POST /api/v1/accounts', () => {
    it('should display Account created Successful', (done) => {
      chai.request(app)
        .post(`${baseUrl}/accounts`)
        .send({
          accountNumber: 1555780168843,
          owner: 1,
          type: 'current',
          phone: '0783067644',
          email: 'niyoceles3@gmail.com',
          balance: '20000',
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

    it('should display \'Sorry, this account already exists\'', (done) => {
      chai.request(app)
        .post(`${baseUrl}/accounts`)
        .send({
          accountNumber: 1555780168843,
          owner: 1,
          type: 'savings',
          phone: '0783067644',
          email: 'niyoceles3@gmail.com',
          balance: '20000',
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
});

describe('Account Account POST', () => {
  describe('POST / Create account with Invalid Data', () => {
    const badAccountData = {
      owner: '',
      type: '',
      phone: '',
      email: '',
      balance: '',
    };
    it('Should return a 400 status', (done) => {
      chai.request(app)
        .post(`${baseUrl}/accounts`)
        .send(badAccountData)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});

// describe('GET an Account ', () => {
//   it('Should return a 200 when single account record successful', (done) => {
//     const accountNumber = '1555780168843';
//     chai.request(app)
//       .get(`${baseUrl}/account/${accountNumber}`)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
// });

describe('GET AccountNumber not found ', () => {
  it('Should return a 404 ', (done) => {
    const accountNumber = '1554972756';
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
    it('Should return a 400 status', (done) => {
      chai.request(app)
        .patch(`${baseUrl}/accounts/:11111`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('Account number not found', (done) => {
      const accountNumber = '1554972750176';
      chai.request(app)
        .patch(`${baseUrl}/accounts/${accountNumber}`)
        .end((err, res) => {
          res.should.have.status(400);
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
    it('Should return a 404 status', (done) => {
      chai.request(app)
        .delete(`${baseUrl}/accounts/:accountNumber`)
        .send(accountData)
        .end((err, res) => {
          res.should.have.status(404);
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
            res.should.have.status(404);
            done();
          });
      });
    });
  });
});
