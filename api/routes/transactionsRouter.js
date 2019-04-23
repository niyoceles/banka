import { Router } from 'express';
import Transaction from '../controllers/transactionController';
import checkToken from '../middlewares/checkToken';

const router = Router();

router.get('/transactions/:accountNumber', checkToken, Transaction.getSingleTransaction);
router.post('/transactions/:accountNumber/credit', checkToken, Transaction.creditAccount);
router.post('/transactions/:accountNumber/debit', Transaction.debitAccount);

export default router;
