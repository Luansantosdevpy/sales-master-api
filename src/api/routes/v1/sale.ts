import { Router } from 'express';
import { container } from 'tsyringe';
import * as validations from '../../../application/validations/saleControllerRequestValidations';
import SaleController from '../../controllers/saleController';

export default async (): Promise<Router> => {
  const router = Router();
  const saleController = container.resolve(SaleController);

  router.post(
    '/create',
    validations.createSaleRequestValidation,
    saleController.create
  );

  router.get('/', saleController.findAll);
  router.get(
    '/:id',
    validations.findSaleRequestValidations,
    saleController.findById
  );

  router.put(
    '/:id',
    validations.updateSaleRequestValidations,
    saleController.update
  );

  router.delete(
    '/:id',
    validations.deleteSaleRequestValidations,
    saleController.delete
  );

  return router;
};
