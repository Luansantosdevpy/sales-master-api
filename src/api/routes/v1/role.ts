import { Router } from 'express';
import { container } from 'tsyringe';
import RoleController from '../../controllers/roleController';

export default async (): Promise<Router> => {
  const router = Router();
  const roleController = container.resolve(RoleController);

  router.post(
    '/create',
    roleController.create
  );

  router.get('/', roleController.findAll);
  router.get(
    '/:id',
    roleController.findById
  );

  router.put(
    '/:id',
    roleController.update
  );

  router.delete(
    '/:id',
    roleController.delete
  );

  return router;
};
