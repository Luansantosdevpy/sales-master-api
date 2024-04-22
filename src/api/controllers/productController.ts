import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import { validationResult } from 'express-validator';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../../application/exceptions/validationError';
import NotFoundError from '../../application/exceptions/notFoundError';
import ProductService from '../../application/services/productService';
import Product from '../../domain/models/Product';
import IProduct from '../../domain/interfaces/modelInterfaces/productInterface';

@injectable()
export default class ProductController {
  static findAllByCategoryId: any;
  constructor(
    @inject(ProductService)
    public readonly productService: ProductService
  ) {}
  public findAll = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug('ProductController - findAll - call productService.findall');

      const products: IProduct[] | null = await this.productService.findAll();

      return response.status(HttpStatusCode.Ok).json({ data: products });
    } catch (error) {
      Logger.error(`ProductController - findAll - error: ${error}`);
      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public findAllByCategoryId = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      Logger.debug(
        'ProductController - findAllByCategoryId - call productService.findAllByCategoryId'
      );
      const { categoryId } = req.params;
      const products: IProduct[] | null =
        await this.productService.findAllByCategoryId(categoryId);

      if (!products) {
        return res
          .status(HttpStatusCode.NotFound)
          .json({ error: 'No products found for the provided category ID.' });
      }
      return res.status(HttpStatusCode.Ok).json({ data: products });
    } catch (error) {
      Logger.error(`ProductController - findAllByCategoryId - error: ${error}`);
      if (error instanceof ValidationError) {
        return res
          .status(HttpStatusCode.UnprocessableEntity)
          .json({ error: error.message });
      }
      Logger.error(`ProductController - findAllByCategoryId - error: ${error}`);
      return res
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      Logger.debug('ProductController - create - validate payload');
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      Logger.debug('ProductController - create - call productService.create');
      const product = await this.productService.create(req.body);

      return res.status(HttpStatusCode.Ok).json({ data: product });
    } catch (error) {
      Logger.error(`ProductController - create - error: ${error}`);
      if (error instanceof ValidationError) {
        return res
          .status(HttpStatusCode.UnprocessableEntity)
          .json({ error: error.message });
      }

      return res
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public findById = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug('ProductController - find - validate id');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('ProductController - find - call productService.find');
      const product = await this.productService.findById(id);

      return response.status(HttpStatusCode.Ok).json({ data: product });
    } catch (error) {
      Logger.error(`ProductController - find - error: ${error}`);

      if (error instanceof NotFoundError) {
        return response
          .status(HttpStatusCode.NotFound)
          .json({ error: error.message });
      }

      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public update = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug('ProductController - update - validate payload');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('ProductController - update - call productService.update');
      await this.productService.update(id, request.body);

      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      Logger.error(`ProductController - update - error: ${error}`);

      if (error instanceof NotFoundError) {
        return response
          .status(HttpStatusCode.NotFound)
          .json({ error: error.message });
      }

      if (error instanceof ValidationError) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .json({ error: error.message });
      }

      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };

  public delete = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      Logger.debug('ProductController - delete - validate id');
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response
          .status(HttpStatusCode.UnprocessableEntity)
          .send(errors.array());
      }

      const { id } = request.params;

      Logger.debug('ProductController - delete - call productService.delete');
      await this.productService.delete(id);

      return response.status(HttpStatusCode.NoContent).send();
    } catch (error) {
      Logger.error(`ProductController - delete - error: ${error}`);

      if (error instanceof NotFoundError) {
        return response
          .status(HttpStatusCode.NotFound)
          .json({ error: error.message });
      }

      return response
        .status(HttpStatusCode.InternalServerError)
        .json({ error: 'Internal Server Error.' });
    }
  };
}
