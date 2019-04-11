import { Router } from 'express';
import User from '../controllers/UsersController';

const router = Router();

router.post('/signup', User.signup);
router.post('/signin', User.signin);

export default router;
