import { Router } from 'express';
import { container } from 'tsyringe';
import * as validations from '../../../application/validations/providerControllerRequestValidations';
import ProviderController from '../../controllers/providerController';

export default async (): Promise<Router> => {
  const router = Router();
  const providerController = container.resolve(ProviderController);

  router.post(
    '/create',
    validations.createProviderRequestValidation,
    providerController.create
  );

  router.get('/', providerController.findAll);
  router.get(
    '/:id',
    validations.findProviderRequestValidations,
    providerController.findById
  );

  router.put(
    '/:id',
    validations.updateProviderRequestValidations,
    providerController.update
  );

  router.delete(
    '/:id',
    validations.deleteProviderRequestValidations,
    providerController.delete
  );

  return router;
};
