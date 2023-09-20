import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import { validationResult } from 'express-validator';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../../application/exceptions/validationError';
import NotFoundError from '../../application/exceptions/notFoundError';
import ProviderService from '../../application/services/providerService';
import Provider from '../../domain/models/Provider';

@injectable()
export default class ProviderController {
  constructor(
    @inject(ProviderService)
    public readonly providerService: ProviderService
  ) {}
  public findAll = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug('ProviderController - findAll - call productService.findall');

      const providers: Provider[] | null = await this.providerService.findAll();

      return response.status(HttpStatusCode.Ok).json({ data: providers });
    } catch (error) {
      Logger.error(`ProviderController - findAll - error: ${error}`);
      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      Logger.debug('ProviderController - create - validate payload');
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      Logger.debug('ProviderController - create - call providerService.create');
      const provider = await this.providerService.create(req.body);

      return res.status(HttpStatusCode.Ok).json({ data: provider });
    } catch (error) {
      Logger.error(`ProviderController - create - error: ${error}`);
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
      Logger.debug('ProviderController - find - validate id');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('ProviderController - find - call providerService.find');
      const provider = await this.providerService.findById(id);

      return response.status(HttpStatusCode.Ok).json({ data: provider });
    } catch (error) {
      Logger.error(`ProviderController - find - error: ${error}`);

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
      Logger.debug('ProviderController - update - validate payload');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('ProviderController - update - call providerService.update');
      await this.providerService.update(id, request.body);

      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      Logger.error(`ProviderController - update - error: ${error}`);

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
      Logger.debug('ProviderController - delete - validate id');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('ProviderController - delete - call providerService.delete');
      await this.providerService.delete(id);

      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      Logger.error(`ProviderController - delete - error: ${error}`);

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
