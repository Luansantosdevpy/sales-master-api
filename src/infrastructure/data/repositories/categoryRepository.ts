import { injectable } from 'tsyringe';
import Logger from '../../log/logger';
import Category from '../../../domain/models/Category';
import ICategory from '../../../domain/interfaces/modelInterfaces/categoryInterface';
import CategoryRepositoryInterface from '../../../domain/interfaces/repositories/categoryRepositoryInterface';

@injectable()
export default class CategoryRepository implements CategoryRepositoryInterface {
  public save = async (newCategory: Partial<ICategory>): Promise<ICategory> => {
    Logger.debug(
      `CategoryRepository - create - execute [newCategory: ${newCategory}]`
    );
    const category = await Category.create({
      ...newCategory,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return category;
  };

  public findByName = async (name: string): Promise<ICategory | null> => {
    Logger.debug(`CategoryRepository - findByName - name: ${name}`);
    return await Category.findOne({ category_name: name });
  };

  public findAll = async (): Promise<ICategory[]> => {
    Logger.debug('CategoryRepository - findAll - execute');
    return await Category.find().sort({ category_name: 1 });
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug(`CategoryRepository - delete - execute [id: ${id}]`);
    await Category.deleteOne({ _id: id });
  };

  public update = async (
    id: string,
    updatedCategory: Partial<ICategory>
  ): Promise<void> => {
    Logger.debug(
      `CategoryRepository - update - execute [id: ${id} | updatedCategory: ${updatedCategory}]`
    );
    await Category.updateOne(
      { _id: id },
      {
        ...updatedCategory,
        updatedAt: new Date(),
      }
    );
  };

  public findById = async (id: string): Promise<ICategory | null> => {
    Logger.debug(`CategoryRepository - findById - execute [id: ${id}]`);
    return await Category.findById(id);
  };
}
