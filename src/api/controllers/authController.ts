import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import { validationResult } from 'express-validator';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../../application/exceptions/validationError';
import UserService from '../../application/services/userService';

@injectable()
export default class AuthController {
    constructor(
      @inject(UserService)
      public readonly userService: UserService
    ) {}
    public register = async(req: Request, res: Response): Promise<Response> => {
      try {
        Logger.debug('authController - register - validate payload');
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res
            .status(HttpStatusCode.UnprocessableEntity)
            .send(errors.array());
        }
  
        Logger.debug('authController - register - call authService.register');
        const user = await this.userService.register(req.body);
  
        return res.status(HttpStatusCode.Ok).json({ data: user });
      } catch (error) {
        Logger.error(`authController - register - error: ${error}`);
        if (error instanceof ValidationError) {
          return res
            .status(HttpStatusCode.UnprocessableEntity)
            .json({ error: error.message });
        }
  
        return res
          .status(HttpStatusCode.InternalServerError)
          .json({ error: 'Internal Server Error.' });
      }
    }

    public login = async(req: Request, res: Response): Promise<Response> => {
      try {
        Logger.debug('authController - register - validate payload');
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res
            .status(HttpStatusCode.UnprocessableEntity)
            .send(errors.array());
        }
  
        Logger.debug('authController - register - call authService.register');
        const user = await this.userService.login(req.body);
  
        return res.status(HttpStatusCode.Ok).json({ data: user });
      } catch (error) {
        Logger.error(`authController - register - error: ${error}`);
        if (error instanceof ValidationError) {
          return res
            .status(HttpStatusCode.UnprocessableEntity)
            .json({ error: error.message });
        }
  
        return res
          .status(HttpStatusCode.InternalServerError)
          .json({ error: 'Internal Server Error.' });
      }
    }
}
