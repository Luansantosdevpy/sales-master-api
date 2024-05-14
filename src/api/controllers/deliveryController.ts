import { inject, injectable } from 'tsyringe';
import DeliveryService from '../../application/services/deliveryService';
import Logger from '../../infrastructure/log/logger';
import IDelivery from '../../domain/interfaces/modelInterfaces/deliveryInterface';
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import ValidationError from '../../application/exceptions/validationError';
import NotFoundError from '../../application/exceptions/notFoundError';
injectable();
export default class deliveryController {
  constructor(
    @inject(DeliveryService)
    public readonly deliveryService: DeliveryService
  ) {}

  public findAll = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug(
        'DeliveryController - findAll - call deliveryService.findall'
      );

      const deliveries: IDelivery[] | null =
        await this.deliveryService.findAll();

      return response.status(HttpStatusCode.Ok).json({ data: deliveries });
    } catch (error) {
      Logger.error(`DeliveryController - findAll - error: ${error}`);
      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      Logger.debug('DeliveryController - create - validate payload');
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      Logger.debug('DeliveryController - create - call deliveryService.create');
      const stock = await this.deliveryService.create(req.body);

      return res.status(HttpStatusCode.Ok).json({ data: stock });
    } catch (error) {
      Logger.error(`DeliveryController - create - error: ${error}`);
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
      Logger.debug('DeliveryController - find - validate id');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('DeliveryController - find - call DeliveryService.find');
      const stock = await this.deliveryService.findById(id);

      return response.status(HttpStatusCode.Ok).json({ data: stock });
    } catch (error) {
      Logger.error(`DeliveryController - find - error: ${error}`);

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

  public delete = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug('DeliveryController - delete - validate id');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;
      const { reasonOfDelete } = request.body;

      Logger.debug('DeliveryController - delete - call deliveryService.delete');
      await this.deliveryService.delete(id, reasonOfDelete);

      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      Logger.error(`DeliveryController - delete - error: ${error}`);

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
