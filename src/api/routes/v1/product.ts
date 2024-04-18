import { Router } from 'express';
import { container } from 'tsyringe';
import * as validations from '../../../application/validations/productControllerRequestValidations';
import ProductController from '../../controllers/productController';

export default async (): Promise<Router> => {
  const router = Router();
  const productController = container.resolve(ProductController);

  router.post(
    '/create',
    validations.createProductRequestValidation,
    productController.create
  );

  router.get('/', productController.findAll);
  router.get(
    '/:id',
    validations.findProductRequestValidations,
    productController.findById
  );

  router.get(
    '/category/:categoryId',
    validations.findProductRequestValidations,
    productController.findAllByCategoryId
  );

  router.put(
    '/:id',
    validations.updateProductRequestValidations,
    productController.update
  );

  router.delete(
    '/:id',
    validations.deleteProductRequestValidations,
    productController.delete
  );

  return router;
};
