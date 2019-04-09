// import express from 'express';
// import Homepage from '../controllers/index';

// const router = express.Router();

// /* GET home page. */
// router.get('/home', Homepage.getHome);

// export default router;

import { Router } from 'express';
import StudentController from '../controllers/controllers';

const routes = Router();
routes.get('/', StudentController.getAllStudents);
routes.get('/:id', StudentController.getSingleStudent);
export default routes;
