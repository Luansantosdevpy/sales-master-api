import { Router } from 'express';
import { container } from 'tsyringe';
import PermissionController from '../../controllers/permissionController';

export default async (): Promise<Router> => {
  const router = Router();
  const permissionController = container.resolve(PermissionController);

  router.post(
    '/create',
    permissionController.create
  );

  router.get('/', permissionController.findAll);
  router.get(
    '/:id',
    permissionController.findById
  );

  router.put(
    '/:id',
    permissionController.update
  );

  router.delete(
    '/:id',
    permissionController.delete
  );

  return router;
};
