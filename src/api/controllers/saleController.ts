import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import { validationResult } from 'express-validator';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../../application/exceptions/validationError';
import NotFoundError from '../../application/exceptions/notFoundError';
import SaleService from '../../application/services/saleService';
import Sale from '../../domain/models/Sales';
import ISale from '../../domain/interfaces/modelInterfaces/salesInterface';

@injectable()
export default class SaleController {
  constructor(
    @inject(SaleService)
    public readonly saleService: SaleService
  ) {}
  public findAll = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug('SaleController - findAll - call saleService.findall');

      const sales: ISale[] | null = await this.saleService.findAll();

      return response.status(HttpStatusCode.Ok).json({ data: sales });
    } catch (error) {
      Logger.error(`SaleController - findAll - error: ${error}`);
      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      Logger.debug('SaleController - create - validate payload');
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      Logger.debug('SaleController - create - call saleService.create');
      const sale = await this.saleService.create(req.body);

      return res.status(HttpStatusCode.Ok).json({ data: sale });
    } catch (error) {
      Logger.error(`SaleController - create - error: ${error}`);
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
      Logger.debug('SaleController - find - validate id');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('SaleController - find - call saleService.find');
      const sale = await this.saleService.findById(id);

      return response.status(HttpStatusCode.Ok).json({ data: sale });
    } catch (error) {
      Logger.error(`SaleController - find - error: ${error}`);

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

  public closeTable = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug('SaleController - closeTable - validate id');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
     }

      const { tableId } = request.params;

      Logger.debug('SaleController - closeTable - call saleService.closeTable');
      const sale = await this.saleService.closeTable(tableId);

      return response.status(HttpStatusCode.Ok).json({ data: sale });
    } catch (error) {
      Logger.error(`SaleController - find - error: ${error}`);

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

  public addItem = async (req: Request, res: Response): Promise<Response> => {
    try {
      Logger.debug('SaleController - create - call saleService.create');
      const saleTemp = await this.saleService.addItem(req.body);

      return res.status(HttpStatusCode.Ok).json({ data: saleTemp });
    } catch (error) {
      Logger.error(`SaleController - create - error: ${error}`);
      if (error instanceof ValidationError) {
        return res
          .status(HttpStatusCode.UnprocessableEntity)
          .json({ error: error.message });
      }

      if (error instanceof NotFoundError) {
        return res
          .status(HttpStatusCode.NotFound)
          .json({ error: error.message });
      }

      return res
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public getAccount = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug('SaleController - getAccount - validate id');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
     }

      const { tableId } = request.params;

      Logger.debug('SaleController - getAccount - call saleService.getAccount');
      const sale = await this.saleService.visualizeAccount(tableId);

      return response.status(HttpStatusCode.Ok).json({ data: sale });
    } catch (error) {
      Logger.error(`SaleController - getAccount - error: ${error}`);

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
      Logger.debug('SaleController - update - validate payload');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('SaleController - update - call saleService.update');
      await this.saleService.update(id, request.body);

      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      Logger.error(`SaleController - update - error: ${error}`);

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
      Logger.debug('SaleController - delete - validate id');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('SaleController - delete - call saleService.delete');
      await this.saleService.delete(id);

      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      Logger.error(`SaleController - delete - error: ${error}`);

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
