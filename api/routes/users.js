import { Router } from 'express';
import User from '../controllers/User';

const router = Router();

router.get('/users', User.getUsers);
router.post('/signup', User.signup);
router.post('/signin', User.signin);

export default router;
