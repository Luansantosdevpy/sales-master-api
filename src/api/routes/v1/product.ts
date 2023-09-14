import { Router } from 'express';
import { container } from 'tsyringe';
import * as validations from '../../../application/validations/productControllerRequestValidations';
import productController from '../../controllers/clientController';
import ProductController from '../../controllers/productController';

export default async (): Promise<Router> => {
  const router = Router();
  const clientController = container.resolve(ProductController);

  router.post(
    '/create',
    validations.createProductRequestValidation,
    clientController.create
  );

  router.get('/', clientController.findAll);
  router.get(
    '/:id',
    validations.findProductRequestValidations,
    clientController.findById
  );

  router.put(
    '/:id',
    validations.updateProductRequestValidations,
    clientController.update
  );

  router.delete(
    '/:id',
    validations.deleteProductRequestValidations,
    clientController.delete
  );

  return router;
};
