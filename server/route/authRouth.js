import express from 'express';
import { registerController } from '../controller/authController.js';
import { loginController } from '../controller/authController.js';
import { updateProfileController } from '../controller/authController.js'

const router = express.Router();

router.post('/signup',registerController);
router.post('/login',loginController);
router.post('/update',updateProfileController);




export default router; // Export the router for use in `app.js`