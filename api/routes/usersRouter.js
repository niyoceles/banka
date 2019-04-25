import { Router } from 'express';
import User from '../controllers/UsersController';
// import checkToken from '../middlewares/checkToken';
import userValidSignup from '../validations/userSignupValid';
import userValidSignin from '../validations/userSigninValid';

const userSignup = userValidSignup();
const userSignin = userValidSignin();

const router = Router();
router.get('/users/:id', User.getSingleUser);
router.post('/signup', userSignup, User.signup);
router.post('/signin', userSignin, User.signin);

export default router;
