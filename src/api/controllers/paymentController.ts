import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import { validationResult } from 'express-validator';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../../application/exceptions/validationError';
import NotFoundError from '../../application/exceptions/notFoundError';
import PaymentService from '../../application/services/paymentService';
import IPayment from '../../domain/interfaces/modelInterfaces/paymentInterface';

@injectable()
export default class PaymentController {
  constructor(
    @inject(PaymentService)
    public readonly paymentService: PaymentService
  ) {}

  public findAll = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug('PaymentController - findAll - call paymentService.findall');

      const payments: IPayment[] | null = await this.paymentService.findAll();

      return response.status(HttpStatusCode.Ok).json({ data: payments });
    } catch (error) {
      Logger.error(`PaymentController - findAll - error: ${error}`);
      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public findAllByPaymentDate = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      Logger.debug(
        'PaymentController - findAllByPaymentDate - call paymentService.findAllByPaymentDate'
      );
      const paymentDate  = req.params.paymentDate;
     
      if (!paymentDate) {
        return res.status(400).send('Date is required.');
      }
      
      const payments: IPayment[] | null =
      await this.paymentService.findAllByPaymentDate(paymentDate);
      

      if (!payments) {
        return res
          .status(HttpStatusCode.NotFound)
          .json({ error: 'No payments found for the provided payment date.' });
      }
      return res.status(HttpStatusCode.Ok).json({ data: payments });
    } catch (error) {
      Logger.error(
        `PaymentController - findAllByPaymentDate - error: ${error}`
      );
      if (error instanceof ValidationError) {
        return res
          .status(HttpStatusCode.UnprocessableEntity)
          .json({ error: error.message });
      }
      Logger.error(
        `PaymentController - findAllByPaymentDate - error: ${error}`
      );
      return res
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public findAllByPaymentofType = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      Logger.debug(
        'PaymentController - findAllByPaymentOfType - call paymentService.findAllByPaymentOfType'
      );
      const { type } = req.params;

      const payments: IPayment[] | null =
        await this.paymentService.findAllByPaymentOftype(type);

      if (!payments) {
        return res
          .status(HttpStatusCode.NotFound)
          .json({ error: 'No payments found for the provided payment date.' });
      }
      return res.status(HttpStatusCode.Ok).json({ data: payments });
    } catch (error) {
      Logger.error(
        `PaymentController - findAllByPaymentDate - error: ${error}`
      );
      if (error instanceof ValidationError) {
        return res
          .status(HttpStatusCode.UnprocessableEntity)
          .json({ error: error.message });
      }
      Logger.error(
        `PaymentController - findAllByPaymentDate - error: ${error}`
      );
      return res
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      Logger.debug('PaymentController - create - validate payload');
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      Logger.debug('PaymentController - create - call paymentService.create');
      const payment = await this.paymentService.create(req.body);

      return res.status(HttpStatusCode.Ok).json({ data: payment });
    } catch (error) {
      Logger.error(`PaymentController - create - error: ${error}`);
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
      Logger.debug('PaymentController - find - validate id');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('PaymentController - find - call paymentService.find');
      const payment = await this.paymentService.findById(id);

      return response.status(HttpStatusCode.Ok).json({ data: payment });
    } catch (error) {
      Logger.error(`PaymentController - find - error: ${error}`);

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
      Logger.debug('PaymentController - update - validate payload');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }
      const { reasonOfCancel } = request.body;
      const { id } = request.params;

      Logger.debug('PaymentController - update - call paymentService.update');
      await this.paymentService.update(id, reasonOfCancel);
      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      Logger.error(`PaymentController - update - error: ${error}`);

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
}
