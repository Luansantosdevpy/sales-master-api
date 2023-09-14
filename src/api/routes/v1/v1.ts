import { Router } from 'express';
import healthcheck from './healthcheck';
import auth from './auth';
import client from './client';
import category from './category';
import product from './product';

export default async (): Promise<Router> => {
  const router = Router();

  router.use('/v1', router);
  router.use('/health-check', await healthcheck());
  router.use('/user', await auth());
  router.use('/client', await client());
  router.use('/category', await category());
  router.use('/product', await product());

  return router;
};
