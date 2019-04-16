import { Router } from 'express';
import User from '../controllers/UsersController';
import checkToken from '../middlewares/checkToken';

const router = Router();
router.get('/users/:id', checkToken, User.getSingleUser);
router.post('/signup', User.signup);
router.post('/signin', User.signin);

export default router;
