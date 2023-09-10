import { Router } from 'express';
import { container } from 'tsyringe';
import * as validations from '../../../application/validations/authControllerRequestValidations';
import AuthController from '../../controllers/authController';

export default async (): Promise<Router> => {
  const router = Router();
  const authController = container.resolve(AuthController);

  router.post('/register',validations.registerUserRequestValidation,
  authController.register);

  router.post('/login', validations.loginUserRequestValidation,
  authController.login);

  return router;
};
