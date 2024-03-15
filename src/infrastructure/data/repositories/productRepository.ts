import { injectable } from 'tsyringe';
import Logger from '../../log/logger';
import Product from '../../../domain/models/Product';
import IProduct from '../../../domain/interfaces/modelInterfaces/productInterface';
import ProductRepositoryInterface from '../../../domain/interfaces/repositories/productRepositoryInterface';

@injectable()
export default class ProductRepository implements ProductRepositoryInterface {
  public save = async (newProduct: Partial<IProduct>): Promise<IProduct> => {
    Logger.debug(
      `ProductRepository - create - execute [newProduct: ${newProduct}]`
    );
    const product = await Product.create({
      ...newProduct,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return product;
  };

  public findByName = async (name: string): Promise<IProduct | null> => {
    Logger.debug(`ProductRepository - findByName - name: ${name}`);
    return await Product.findOne({ name });
  };

  public findAll = async (): Promise<IProduct[]> => {
    Logger.debug('ProductRepository - findAll - execute');
    return await Product.find().sort({ name: 1 });
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug(`ProductRepository - delete - execute [id: ${id}]`);
    await Product.deleteOne({ _id: id });
  };

  public update = async (
    id: string,
    updatedProduct: Partial<IProduct>
  ): Promise<void> => {
    Logger.debug(
      `ProductRepository - update - execute [id: ${id} | updatedProduct: ${updatedProduct}]`
    );
    await Product.updateOne(
      { _id: id },
      {
        ...updatedProduct,
        updatedAt: new Date(),
      }
    );
  };

  public findById = async (id: string): Promise<IProduct | null> => {
    Logger.debug(`ProductRepository - findById - execute [id: ${id}]`);
    return await Product.findById({ _id: id }).exec();
  };
}
