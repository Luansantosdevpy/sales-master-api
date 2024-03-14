import { Router } from 'express';
import { container } from 'tsyringe';
import TableController from '../../controllers/tableController';

export default async (): Promise<Router> => {
  const router = Router();
  const tableController = container.resolve(TableController);

  router.post(
    '/create',
    tableController.create
  );

  router.get('/', tableController.findAll);
  router.get(
    '/:id',
    tableController.findById
  );

  router.put(
    '/:id',
    tableController.update
  );

  router.delete(
    '/:id',
    tableController.delete
  );

  return router;
};
