import express from 'express';
import User from '../controllers/User';

const router = express.Router();

router.get('/', User.getUsers);
router.post('/signup', User.signup);
router.post('/signin', User.signin);

export default router;
