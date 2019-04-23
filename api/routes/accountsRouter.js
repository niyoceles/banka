import { Router } from 'express';
import Account from '../controllers/AccountController';
import checkToken from '../middlewares/checkToken';

const router = Router();
router.get('/accounts', checkToken, Account.getAllBankAccounts);
router.get('/accounts?status=Active', checkToken, Account.getAllActiveBankAccounts);
router.get('/accounts?status=Dormant', checkToken, Account.getAllDormantBankAccounts);
router.get('/user/:email/accounts', checkToken, Account.getAllAccountByUser);
router.post('/accounts', checkToken, Account.createAccount);
router.get('/accounts/:accountNumber', checkToken, Account.getAccountDetails);
router.patch('/accounts/:accountNumber', checkToken, Account.updateAccount);
router.delete('/accounts/:accountNumber', checkToken, Account.deleteAccount);

export default router;
