import { Router } from 'express';
import { container } from 'tsyringe';
import * as validations from '../../../application/validations/clientControllerRequestValidations';
import ClientController from '../../controllers/clientController';

export default async (): Promise<Router> => {
  const router = Router();
  const clientController = container.resolve(ClientController);

  router.post('/create', validations.createClienteRequestValidation,
  clientController.create);

  router.get('/', clientController.findAll);
  router.get(
    '/:id',
    validations.findClientRequestValidations,
    clientController.findById
  );

  router.put(
    '/:id',
    validations.updateClientRequestValidations,
    clientController.update
  );

  router.delete(
    '/:id',
    validations.deleteClientRequestValidations,
    clientController.delete
  );

  return router;
};
