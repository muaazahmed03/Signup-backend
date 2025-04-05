import express from 'express'
import { signupController } from '../controller/signupController.js';
import { loginController } from '../controller/loginController.js';

const router = express.Router();

router.route('/api/signup').post(signupController)
router.route('/api/login').post(loginController)

export default router;