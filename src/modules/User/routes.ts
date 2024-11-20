import { Router } from 'express';
import userController from './controllers.js';
import validateRequest  from '../../middleware/validateRequest.js';
import userValidationSchema from './validation.js';

const router = Router();

router.post('/register', validateRequest(userValidationSchema.register), userController.registerUser);
router.post('/login', validateRequest(userValidationSchema.login), userController.loginUser);
router.get('/profile', userController.profileUser)

export default router;
