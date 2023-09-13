import { Router } from 'express';
import { container } from 'tsyringe';
import * as validations from '../../../application/validations/categoryControllerRequestValidations';
import CategoryController from '../../controllers/categoryController';

export default async (): Promise<Router> => {
  const router = Router();
  const categoryController = container.resolve(CategoryController);

  router.post('/create', validations.createCategoryRequestValidation,
  categoryController.create);

  router.get('/', categoryController.findAll);
  router.get(
    '/:id',
    validations.findCategoryRequestValidations,
    categoryController.findById
  );

  router.put(
    '/:id',
    validations.updateCategoryRequestValidations,
    categoryController.update
  );

  router.delete(
    '/:id',
    validations.deleteCategoryRequestValidations,
    categoryController.delete
  );

  return router;
};
