import express from 'express';
import { signup, login } from './auth.controller.js'; // Assuming default export in auth.controller.js
import { checkCreateUserBody, checkSignInBody, emailValidation, passwordValidation, validateMobileNumber } from '../../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/auth/signup', checkCreateUserBody, emailValidation, passwordValidation, validateMobileNumber, signup);
router.post('/auth/login', checkSignInBody, emailValidation, passwordValidation, login);

export default router;
