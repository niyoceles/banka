import express from 'express';
import Homepage from '../controllers/index';

const router = express.Router();

/* GET home page. */
router.get('/home', Homepage.getHome);

export default router;
