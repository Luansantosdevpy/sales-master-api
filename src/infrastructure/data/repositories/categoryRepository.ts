import { injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import Logger from '../../log/logger';
import CategoryRepositoryInterface from '../../../domain/interfaces/repositories/categoryRepositoryInterface';
import Category from '../../../domain/models/Category';

@injectable()
export default class CategoryRepository implements CategoryRepositoryInterface {
  public save = async (newCategory: Partial<Category>): Promise<Category> => {
    Logger.debug(`CategoryRepository - create - execute [newCategory: ${newCategory}]`);
    const category = Category.create({
      id: uuidv4(),
      category_name: newCategory.category_name,
      description: newCategory.description,
      category_image: newCategory.category_image,
      category_icon: newCategory.category_icon
    });
    return category;
  };

  public findByName = async (name: string): Promise<Category | null> => {
    Logger.debug(`CategoryRepository - findByName - name: ${name}`);
    return Category.findOne({
      where: {
        name
      }
    });
  };

  public findAll = async (): Promise<Category[]> => {
    Logger.debug('CategoryRepository - findAll - execute');
    return Category.findAll({
      order: [['name', 'ASC']]
    });
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug(`CategoryRepository - delete - execute [id: ${id}]`);
    await Category.destroy({
      where: {
        id
      }
    });
  };

  public update = async (
    id: string,
    updatedCategory: Partial<Category>
  ): Promise<void> => {
    Logger.debug(
      `CategoryRepository - update - execute [id: ${id} | updatedCategory: ${updatedCategory}]`
    );
    await Category.update(
      {
        category_name: updatedCategory.category_name,
        description: updatedCategory.description,
        category_image: updatedCategory.category_image,
        category_icon: updatedCategory.category_icon,
        updatedAt: new Date()
      },
      {
        where: {
          id
        }
      }
    );
  };

  public findById = async (id: string): Promise<Category | null> => {
    Logger.debug(`CategoryRepository - findById - execute [id: ${id}]`);
    return Category.findOne({
        where: {
           id
        }
    });
  };
}
