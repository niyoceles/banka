import { Router } from 'express';
import Transaction from '../controllers/transactionController';
import checkToken from '../middlewares/checkToken';
import transactionValid from '../validations/createTransactionvalid';

const router = Router();
const validTransact = transactionValid();

router.get('/transactions/:accountNumber/transactions', checkToken, Transaction.getSingleTransaction);
router.get('/transactions/:id', checkToken, Transaction.getSpecificTransaction);
router.post('/transactions/:accountNumber/credit', checkToken, validTransact, Transaction.creditAccount);
router.post('/transactions/:accountNumber/debit', checkToken, validTransact, Transaction.debitAccount);

export default router;
