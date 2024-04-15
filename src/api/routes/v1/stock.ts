import { Router } from 'express';
import { container } from 'tsyringe';
import * as validations from '../../../application/validations/stockControllerRequestValidations';
import StockController from '../../controllers/stockController';

export default async (): Promise<Router> => {
  const router = Router();
  const stockController = container.resolve(StockController);

  router.post(
    '/create',
    validations.createStockRequestValidation,
    stockController.create
  );

  router.get('/', stockController.findAll);

  router.get(
    '/:id',
    validations.findStockRequestValidations,
    stockController.findById
  );

  router.put(
    '/:id',
    validations.updateStockRequestValidations,
    stockController.update
  );

  router.put(
    '/update-by-sale/:id',
    validations.updateStockRequestValidations,
    stockController.updateQuantityBySale
  );

  router.put(
    '/update-by-input/:id',
    validations.updateStockRequestValidations,
    stockController.updateQuantityByInput
  );

  router.delete(
    '/:id',
    validations.deleteStockRequestValidations,
    stockController.delete
  );

  return router;
};
