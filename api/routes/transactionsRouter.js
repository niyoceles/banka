import { Router } from 'express';
import Transaction from '../controllers/transactionController';
import checkToken from '../middlewares/checkToken';

const router = Router();

router.get('/transactions/:accountNumber/transactions', checkToken, Transaction.getSingleTransaction);
router.post('/transactions/:accountNumber/credit', checkToken, Transaction.creditAccount);
router.post('/transactions/:accountNumber/debit', checkToken, Transaction.debitAccount);

export default router;
