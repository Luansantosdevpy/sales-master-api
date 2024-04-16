import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import { validationResult } from 'express-validator';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../../application/exceptions/validationError';
import NotFoundError from '../../application/exceptions/notFoundError';
import StockService from '../../application/services/stockService';
import IStock from '../../domain/interfaces/modelInterfaces/stockInterface';

@injectable()
export default class StockController {
  constructor(
    @inject(StockService)
    public readonly stockService: StockService
  ) {}
  public findAll = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug('StockController - findAll - call stockService.findall');

      const stocks: IStock[] | null = await this.stockService.findAll();

      return response.status(HttpStatusCode.Ok).json({ data: stocks });
    } catch (error) {
      Logger.error(`StockController - findAll - error: ${error}`);
      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      Logger.debug('StockController - create - validate payload');
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      Logger.debug('StockController - create - call stockService.create');
      const stock = await this.stockService.create(req.body);

      return res.status(HttpStatusCode.Ok).json({ data: stock });
    } catch (error) {
      Logger.error(`StockController - create - error: ${error}`);
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
      Logger.debug('StockController - find - validate id');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('StockController - find - call productService.find');
      const stock = await this.stockService.findById(id);

      return response.status(HttpStatusCode.Ok).json({ data: stock });
    } catch (error) {
      Logger.error(`StockController - find - error: ${error}`);

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
      Logger.debug('StockController - update - validate payload');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('StockController - update - call stockService.update');
      await this.stockService.update(id, request.body);

      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      Logger.error(`StockController - update - error: ${error}`);

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

  public updateQuantityBySale = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug(
        'StockController - updateQuantityBySale - call stockService.updateQuantityBySale'
      );

      const { id } = request.params;
      const { qtd } = request.body;

      await this.stockService.updateQuantityBySale(id, qtd);

      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      Logger.error(`StockController - updateQuantityBySale - error: ${error}`);

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

  public updateQuantityByInput = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug(
        'StockController - updateQuantityByInput - call stockService.updateQuantityByInput'
      );
     
      const { id } = request.params;
      const { qtd } = request.body;

      await this.stockService.updateQuantityByInput(id, qtd);

      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      Logger.error(`StockController - updateQuantityByInput - error: ${error}`);

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
      Logger.debug('StockController - delete - validate id');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('StockController - delete - call stockService.delete');
      await this.stockService.delete(id);

      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      Logger.error(`StockController - delete - error: ${error}`);

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
