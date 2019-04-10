import { Router } from 'express';
import User from '../controllers/UsersController';

const router = Router();

router.get('/users', User.getAllusers);
router.get('/users/:id', User.getSingleUser);
router.post('/signup', User.signup);
router.post('/signin', User.signin);

export default router;
