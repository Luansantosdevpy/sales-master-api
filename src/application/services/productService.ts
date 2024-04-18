import { inject, injectable } from 'tsyringe';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../exceptions/validationError';
import ProductRepositoryInterface from '../../domain/interfaces/repositories/productRepositoryInterface';
import CategoryService from './categoryService';
import IProduct from '../../domain/interfaces/modelInterfaces/productInterface';
import CategoryRepositoryInterface from '../../domain/interfaces/repositories/categoryRepositoryInterface';

@injectable()
class ProductService {
  constructor(
    @inject('ProductRepositoryInterface')
    public readonly productRepository: ProductRepositoryInterface,
    @inject('CategoryRepositoryInterface')
    public readonly categoryRepository: CategoryRepositoryInterface,
    @inject(CategoryService)
    public readonly categoryService: CategoryService
  ) {}

  async create(product: IProduct): Promise<IProduct> {
    Logger.debug('ProductService - create - validate email');
    const emailExists = await this.productRepository.findByName(product.name);

    if (emailExists) {
      throw new ValidationError(
        `The name '${product.name}' is already in use.`
      );
    }

    const verifyCategoryId = await this.categoryService.findById(
      product.categoryId
    );

    if (verifyCategoryId === null) {
      throw new ValidationError(
        `The category id '${product.categoryId}' don't exists.`
      );
    }

    Logger.debug('ProductService - create - call productRepository.save');
    return this.productRepository.save(product);
  }

  public findAll = async (): Promise<IProduct[] | null> => {
    Logger.debug('ProductService - findAll - call productRepository.findAll');
    return this.productRepository.findAll();
  };

  public update = async (
    id: string,
    updatedProduct: Partial<IProduct>
  ): Promise<void> => {
    Logger.debug('ProductService - update - call ProductService.find');
    await this.findById(id);

    Logger.debug('ProductService - update - validate Client name');
    const productExists = await this.productRepository.findByName(
      updatedProduct.name!
    );

    if (productExists) {
      throw new ValidationError(
        `The Product name '${updatedProduct.name}' is already in use.`
      );
    }

    Logger.debug('ProductService - update - call productRepository.update');
    return this.productRepository.update(id, updatedProduct);
  };

  public findById = async (id: string): Promise<IProduct | null> => {
    Logger.debug('ProductService - findById - call productRepository.findById');
    return this.productRepository.findById(id);
  };

  public findAllByCategoryId = async (
    categoryId: string
  ): Promise<IProduct[] | null> => {
    Logger.debug(
      'ProductService - findAllByCategoryId - call productRepository.findAllByCategoryId'
    );

    const verifyCategoryId = await this.categoryService.findById(categoryId);

    if (verifyCategoryId === null) {
      throw new ValidationError(
        `The category id '${categoryId}' don't exists.`
      );
    }
    return this.productRepository.findAllByCategoryId(categoryId);
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug('ProductService - delete - call productRepository.findById');
    await this.findById(id);

    Logger.debug('ProductService - delete - call productRepository.delete');
    return this.productRepository.delete(id);
  };
}

export default ProductService;
