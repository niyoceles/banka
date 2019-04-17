import { Router } from 'express';
import Account from '../controllers/AccountController';
import checkToken from '../middlewares/checkToken';

const router = Router();

router.post('/accounts', checkToken, Account.createAccount);
router.get('/account/:accountNumber', checkToken, Account.getSingleAccount);
router.patch('/accounts/:accountNumber', checkToken, Account.updateAccount);
router.delete('/accounts/:accountNumber', checkToken, Account.deleteAccount);

export default router;
