import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import Logger from '../../infrastructure/log/logger';

export default class HealthCheckController {
  public getStatusAPI = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    Logger.debug('healthCheckController - getStatusAPI - healthCheckService');
    return response.status(HttpStatusCode.Ok).json({ healthy: true });
  };
}
