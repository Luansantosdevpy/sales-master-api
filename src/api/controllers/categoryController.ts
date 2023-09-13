import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { HttpStatusCode } from 'axios';
import { validationResult } from 'express-validator';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../../application/exceptions/validationError';
import NotFoundError from '../../application/exceptions/notFoundError';
import CategoryService from '../../application/services/categoryService';
import Category from '../../domain/models/Category';

@injectable()
export default class CategoryController {
    constructor(
      @inject(CategoryService)
      public readonly categoryService: CategoryService
    ) {}
    public findAll = async (
        request: Request,
        response: Response
      ): Promise<Response> => {
        try {
          Logger.debug('CategoryController - findAll - call categoryService.findall');
    
          const categories: Category[] | null = await this.categoryService.findAll();
    
          return response.status(HttpStatusCode.Ok).json({ data: categories });
        } catch (error) {
          Logger.error(`CategoryController - findAll - error: ${error}`);
          return response
            .status(HttpStatusCode.InternalServerError)
            .json({ error: 'Internal Server Error.' });
        }
    };

    public create = async(req: Request, res: Response): Promise<Response> => {
      try {
        Logger.debug('CategoryController - create - validate payload');
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res
            .status(HttpStatusCode.UnprocessableEntity)
            .send(errors.array());
        }
  
        Logger.debug('CategoryController - create - call categoryService.create');
        const user = await this.categoryService.create(req.body);
  
        return res.status(HttpStatusCode.Ok).json({ data: user });
      } catch (error) {
        Logger.error(`CategoryController - create - error: ${error}`);
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
          Logger.debug('CategoryController - find - validate id');
          const errors = validationResult(request);
    
          if (!errors.isEmpty()) {
            return response
              .status(HttpStatusCode.UnprocessableEntity)
              .send(errors.array());
          }
    
          const { id } = request.params;
    
          Logger.debug('CategoryController - find - call categoryService.find');
          const category = await this.categoryService.findById(id);
    
          return response.status(HttpStatusCode.Ok).json({ data: category });
        } catch (error) {
          Logger.error(`CategoryController - find - error: ${error}`);
    
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
          Logger.debug('CategoryController - update - validate payload');
          const errors = validationResult(request);
    
          if (!errors.isEmpty()) {
            return response
              .status(HttpStatusCode.UnprocessableEntity)
              .send(errors.array());
          }
    
          const { id } = request.params;
    
          Logger.debug('CategoryController - update - call categoryService.update');
          await this.categoryService.update(id, request.body);
    
          return response.status(HttpStatusCode.NoContent).send();
        } catch (error) {
          Logger.error(`CategoryController - update - error: ${error}`);
    
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
          Logger.debug('CategoryController - delete - validate id');
          const errors = validationResult(request);
    
          if (!errors.isEmpty()) {
            return response
              .status(HttpStatusCode.UnprocessableEntity)
              .send(errors.array());
          }
    
          const { id } = request.params;
    
          Logger.debug('CategoryController - delete - call categoryService.delete');
          await this.categoryService.delete(id);
    
          return response.status(HttpStatusCode.NoContent).send();
        } catch (error) {
          Logger.error(`CategoryController - delete - error: ${error}`);
    
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
