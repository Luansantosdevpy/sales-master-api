import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import { validationResult } from 'express-validator';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../../application/exceptions/validationError';
import ClientService from '../../application/services/clientService';
import Client from '../../domain/models/Client';
import NotFoundError from '../../application/exceptions/notFoundError';

@injectable()
export default class ClientController {
    constructor(
      @inject(ClientService)
      public readonly clientService: ClientService
    ) {}
    public findAll = async (
        request: Request,
        response: Response
      ): Promise<Response> => {
        try {
          Logger.debug('ClientController - findAll - call clientService.findall');
    
          const clients: Client[] | null = await this.clientService.findAll();
    
          return response.status(HttpStatusCode.Ok).json({ data: clients });
        } catch (error) {
          Logger.error(`ClientController - findAll - error: ${error}`);
          return response
            .status(HttpStatusCode.InternalServerError)
            .json({ error: 'Internal Server Error.' });
        }
    };

    public create = async(req: Request, res: Response): Promise<Response> => {
      try {
        Logger.debug('clientController - create - validate payload');
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res
            .status(HttpStatusCode.UnprocessableEntity)
            .send(errors.array());
        }
  
        Logger.debug('clientController - create - call clientService.create');
        const user = await this.clientService.create(req.body);
  
        return res.status(HttpStatusCode.Ok).json({ data: user });
      } catch (error) {
        Logger.error(`clientController - create - error: ${error}`);
        if (error instanceof ValidationError) {
          return res
            .status(HttpStatusCode.UnprocessableEntity)
            .json({ error: error.message });
        }
  
        return res
          .status(HttpStatusCode.InternalServerError)
          .json({ error: 'Internal Server Error.' });
      }
    };

    public findById = async (
        request: Request,
        response: Response
      ): Promise<Response> => {
        try {
          Logger.debug('ClientController - find - validate id');
          const errors = validationResult(request);
    
          if (!errors.isEmpty()) {
            return response
              .status(HttpStatusCode.UnprocessableEntity)
              .send(errors.array());
          }
    
          const { id } = request.params;
    
          Logger.debug('ClientController - find - call clientService.find');
          const client = await this.clientService.findById(id);
    
          return response.status(HttpStatusCode.Ok).json({ data: client });
        } catch (error) {
          Logger.error(`ClientController - find - error: ${error}`);
    
          if (error instanceof NotFoundError) {
            return response
              .status(HttpStatusCode.NotFound)
              .json({ error: error.message });
          }
    
          return response
            .status(HttpStatusCode.InternalServerError)
            .json({ error: 'Internal Server Error.' });
        }
    };

    public update = async (
        request: Request,
        response: Response
      ): Promise<Response> => {
        try {
          Logger.debug('ClientController - update - validate payload');
          const errors = validationResult(request);
    
          if (!errors.isEmpty()) {
            return response
              .status(HttpStatusCode.UnprocessableEntity)
              .send(errors.array());
          }
    
          const { id } = request.params;
    
          Logger.debug('ClientController - update - call clientService.update');
          await this.clientService.update(id, request.body);
    
          return response.status(HttpStatusCode.NoContent).send();
        } catch (error) {
          Logger.error(`ClientController - update - error: ${error}`);
    
          if (error instanceof NotFoundError) {
            return response
              .status(HttpStatusCode.NotFound)
              .json({ error: error.message });
          }
    
          if (error instanceof ValidationError) {
            return response
              .status(HttpStatusCode.UnprocessableEntity)
              .json({ error: error.message });
          }
    
          return response
            .status(HttpStatusCode.InternalServerError)
            .json({ error: 'Internal Server Error.' });
        }
    };

    public delete = async (
        request: Request,
        response: Response
      ): Promise<Response> => {
        try {
          Logger.debug('ClientController - delete - validate id');
          const errors = validationResult(request);
    
          if (!errors.isEmpty()) {
            return response
              .status(HttpStatusCode.UnprocessableEntity)
              .send(errors.array());
          }
    
          const { id } = request.params;
    
          Logger.debug('ClientController - delete - call clientService.delete');
          await this.clientService.delete(id);
    
          return response.status(HttpStatusCode.NoContent).send();
        } catch (error) {
          Logger.error(`ClientController - delete - error: ${error}`);
    
          if (error instanceof NotFoundError) {
            return response
              .status(HttpStatusCode.NotFound)
              .json({ error: error.message });
          }
    
          return response
            .status(HttpStatusCode.InternalServerError)
            .json({ error: 'Internal Server Error.' });
        }
      };
}
