import { Router } from 'express';
import Account from '../controllers/AccountController';
import checkToken from '../middlewares/checkToken';

import accountValid from '../validations/createAccountValid';
// import activeValid from '../validations/activeDeactiveValid';
import statusValid from '../validations/statusValid';

const validAcc = accountValid();
// const userSignin = userValidSignin();
const statusVal = statusValid()

const router = Router();
router.get('/accounts', checkToken, Account.getAllBankAccounts);
router.get('/v2/accounts', checkToken, Account.getAllActiveByStatus);
router.get('/user/:email/accounts', checkToken, Account.getAllAccountByUser);
router.post('/accounts', checkToken, validAcc, Account.createAccount);
router.get('/accounts/:accountNumber', checkToken, Account.getAccountDetails);
router.patch('/accounts/:accountNumber', checkToken, statusVal, Account.updateAccount);
router.delete('/accounts/:accountNumber', checkToken, Account.deleteAccount);

export default router;
