import { inject, injectable } from 'tsyringe';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../exceptions/validationError';
import CategoryRepositoryInterface from '../../domain/interfaces/repositories/categoryRepositoryInterface';
import ICategory from '../../domain/interfaces/modelInterfaces/categoryInterface';
import NotFoundError from '../exceptions/notFoundError';

@injectable()
class CategoryService {
  constructor(
    @inject('CategoryRepositoryInterface')
    public readonly categoryRepository: CategoryRepositoryInterface
  ) {}

  async create(category: ICategory): Promise<ICategory> {
    Logger.debug('CategoryService - create - validate category name');
    const categoryExists = await this.categoryRepository.findByName(
      category.category_name
    );

    if (categoryExists) {
      throw new ValidationError(
        `The name '${category.category_name}' is already in use.`
      );
    }

    Logger.debug('CategoryService - create - call categoryRepository.save');
    return this.categoryRepository.save(category);
  }

  public findAll = async (): Promise<ICategory[] | null> => {
    Logger.debug('CategoryService - findAll - call categoryRepository.findAll');
    return this.categoryRepository.findAll();
  };

  public update = async (
    id: string,
    updatedCategory: Partial<ICategory>
  ): Promise<void> => {
    Logger.debug('CategoryService - update - call CategoryService.find');
    await this.findById(id);

    Logger.debug('CategoryService - update - validate Category name');
    const CategoryExists = await this.categoryRepository.findByName(
      updatedCategory.category_name!
    );

    if (CategoryExists) {
      throw new ValidationError(
        `The Category name '${updatedCategory.category_name}' is already in use.`
      );
    }

    Logger.debug('CategoryService - update - call categoryRepository.update');
    return this.categoryRepository.update(id, updatedCategory);
  };

  public findById = async (id: string): Promise<ICategory | null> => {
    Logger.debug(
      'CategoryService - findById - call categoryRepository.findById'
    );
    const category = this.categoryRepository.findById(id);
    if (!category) {
      throw new NotFoundError('Not found category with this id');
    }

    return category;
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug('CategoryService - delete - call categoryRepository.findById');
    await this.findById(id);

    Logger.debug('CategoryService - delete - call categoryRepository.delete');
    return this.categoryRepository.delete(id);
  };
}

export default CategoryService;
