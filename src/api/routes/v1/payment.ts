import { Router } from 'express';
import { container } from 'tsyringe';
import * as validations from '../../../application/validations/paymentControllerRequestValidations';
import PaymentController from '../../controllers/paymentController';

export default async (): Promise<Router> => {
  const router = Router();
  const paymentController = container.resolve(PaymentController);

  router.post(
    '/create',
    validations.createPaymentRequestValidation,
    paymentController.create
  );

  router.get('/', paymentController.findAll);
  router.get(
    '/:id',
    validations.findPaymentRequestValidations,
    paymentController.findById
  );

  router.get(
    '/paymentOfType/:type',
    paymentController.findAllByPaymentofType
  );

  router.get('/paymentDate/:paymentDate', paymentController.findAllByPaymentDate);

  router.put(
    '/:id',
    validations.updatePaymentRequestValidations,
    paymentController.update
  );

  return router;
};
