import { Router } from 'express';
import User from '../controllers/UsersController';
import checkToken from '../middlewares/checkToken';
import userValidSignup from '../validations/userSignupValid';
// import userValidSignin from '../validations/userSigninValid';
import createUserValid from '../validations/createUserValid';

const createUser = createUserValid();
const userSignup = userValidSignup();
// const userSignin = userValidSignin();


const router = Router();
// router.get('/users/:id', User.getSingleUser);
router.get('/users', User.getAllUserAccounts);
router.post('/user', createUser, User.adminCreateUser);
router.post('/signup', userSignup, User.signup);
router.post('/signin', User.signin);

export default router;
