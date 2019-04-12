import { Router } from 'express';
import Transaction from '../controllers/transactionController';

const router = Router();

router.get('/transactions/:accountNumber', Transaction.getSingleTransaction);
router.post('/transactions/:accountNumber/credit', Transaction.creditAccount);

export default router;
