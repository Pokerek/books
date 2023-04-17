import { Router } from 'express';
import AuthenticationController from '../controllers/authenticationController';
import validationMiddleware from '../middlewares/validation.middleware';
import { registerSchema, loginSchema } from '../validations/auth';

const router = Router();
const authenticationController = new AuthenticationController();

router.post(
  '/register',
  validationMiddleware(registerSchema),
  authenticationController.register
);

router.post(
  '/login',
  validationMiddleware(loginSchema),
  authenticationController.login
);

export default { path: '/auth', router };
