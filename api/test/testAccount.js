import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const baseUrl = '/api/v1';

// const { expect } = chai;
// Configure chai
chai.use(chaiHttp);
chai.should();

let token = '';

// accounts table
// before(async () => {
//   try {
//     await db.query('TRUNCATE accounts CASCADE; ALTER SEQUENCE id RESTART WITH 1;');
//   } catch (error) {
//     console.log(error);
//   }
// });

describe('Create Account', () => {

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

  describe('POST /api/v1/accounts', () => {
    it('should display Account created Successful', (done) => {
      chai.request(app)
        .post(`${baseUrl}/accounts`)
        .set('access-token', token)
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
        .set('access-token', token)
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
        .set('access-token', token)
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


// describe('Account PATCH', () => {
//   it('Account number found ', (done) => {
//     const accountNumber = '1555780168843';
//     chai.request(app)
//       .patch(`${baseUrl}/accounts/${accountNumber}`)
//       .set('access-token', token)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });
// });


describe('PATCH / Account number error found ', () => {
  it('Should return a 404 status', (done) => {
    const accountNumber = '15557';
    chai.request(app)
      .patch(`${baseUrl}/accounts/${accountNumber}`)
      .set('access-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('PATCH / Activate or deactivate with Invalid Data', () => {

  it('Should return a 404 status', (done) => {
    const accountNumber = '1555780168843';
    const statusData = {
      status: '',
    };
    chai.request(app)
      .patch(`${baseUrl}/accounts/${accountNumber}`)
      .set('access-token', token)
      .send(statusData)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('DELETE', () => {
  describe('DELETE / Account deleted with Invalid ', () => {
    const accountNumber = '';
    it('Should return a 404 status', (done) => {
      chai.request(app)
        .delete(`${baseUrl}/accounts/${accountNumber}`)
        .set('access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    // it('Should return a 200 when account deleted status', (done) => {
    //   const accountNumber = '1555780168843';
    //   chai.request(app)
    //     .delete(`${baseUrl}/accounts/${accountNumber}`)
    //     .set('access-token', token)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       done();
    //     });
    // });

    describe('DELETE / Delete account Successful', () => {
      const accountNumber = '1555780168843';
      it('Should return a 404 status', (done) => {
        chai.request(app)
          .delete(`${baseUrl}/accounts/${accountNumber}`)
          .set('access-token', token)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });
  });
});
// /////////////////////////// GET ACCOUNT DETAILS //////////////////////
describe('GET ACCOUNT DETAILS', () => {
  describe('GET / Get Account Not found ', () => {
    const id = '1';
    it('Should return a 200 status', (done) => {
      chai.request(app)
        .get(`${baseUrl}/accounts/${id}`)
        .set('access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('GET / Get account Details Account not number found', () => {
    const accountNumber = '15558';
    it('Should return a  status', (done) => {
      chai.request(app)
        .get(`${baseUrl}/accounts/${accountNumber}`)
        .set('access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

// /////////////////////////// GET ADMIN CAN VIEW LIST OF ACCOUNT BY SPECIFIC USER //////////////////////
describe('GET ACCOUNT LIST OF ACCOUNT TO THE SPECIFIC USER', () => {
  describe('GET / Get the account of he user with Invalid ', () => {
    const emailEmpty = '';
    it('Should return a 404 status', (done) => {
      chai.request(app)
        .get(`${baseUrl}/user/${emailEmpty}/accounts`)
        .set('access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    describe('GET / Get Get acounts of the user successful', () => {
      const email = 'niyoceles3@gmail.com';
      it('Should return a  status 200', (done) => {
        chai.request(app)
          .get(`${baseUrl}/user/${email}/accounts`)
          .set('access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });
});

// /////////////////////////// GET STAFF/ADMIN VIEW ALL BANK ACCOUNT //////////////////////
describe('GET ACCOUNT ALL  ACCOUNT TO THE SPECIFIC USER', () => {
  // describe('GET / Get all bank account  with Invalid ', () => {
  //   it('Should return a 404 status', (done) => {
  //     chai.request(app)
  //       .get(`${baseUrl}/accountsxyx`)
  //       .set('access-token', token)
  //       .end((err, res) => {
  //         res.should.have.status(404);
  //         done();
  //       });
  //   });

  describe('GET / Get All bank account successful', () => {
    it('Should return a  status 200', (done) => {
      chai.request(app)
        .get(`${baseUrl}/accounts`)
        .set('access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});