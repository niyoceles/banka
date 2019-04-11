import { Router } from 'express';
import Account from '../controllers/AccountController';

const router = Router();

router.post('/accounts', Account.createAccount);
router.get('/account/:accountNumber', Account.getSingleAccount);
router.patch('/accounts/:accountNumber', Account.updateAccount);
router.delete('/accounts/:accountNumber', Account.deleteAccount);

export default router;
