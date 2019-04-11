import { Router } from 'express';
import Account from '../controllers/AccountController';

const router = Router();

router.post('/accounts', Account.createAccount);

export default router;