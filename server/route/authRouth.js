import express from 'express';
import { registerController } from '../controller/authController.js';
import { loginController } from '../controller/authController.js';
import { updateProfileController } from '../controller/authController.js'
import authenticate from '../middleware/authenticate.js';
import { validateInput } from '../validators/userValidation.js';

const router = express.Router();

router.post('/signup' ,validateInput(['name', 'username', 'email', 'password']),registerController);
router.post('/login',validateInput(['username', 'password']),loginController);
router.post('/update',validateInput(['name', 'email']),authenticate,updateProfileController);




export default router; // Export the router for use in `app.js`