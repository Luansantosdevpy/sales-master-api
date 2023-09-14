import { injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import Logger from '../../log/logger';
import ProductRepositoryInterface from '../../../domain/interfaces/repositories/productRepositoryInterface';
import Product from '../../../domain/models/Product';

@injectable()
export default class ProductRepository implements ProductRepositoryInterface {
  public save = async (newProduct: Partial<Product>): Promise<Product> => {
    Logger.debug(
      `ProductRepository - create - execute [newProduct: ${newProduct}]`
    );
    const product = Product.create({
      id: uuidv4(),
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      productStock: newProduct.productStock,
      sku: newProduct.sku,
      categoryId: newProduct.categoryId,
      provider: newProduct.provider,
      active: newProduct.active,
      image: newProduct.image,
      attributes: newProduct.attributes
    });
    return product;
  };

  public findByName = async (name: string): Promise<Product | null> => {
    Logger.debug(`ProductRepository - findByName - name: ${name}`);
    return Product.findOne({
      where: {
        name
      }
    });
  };

  public findAll = async (): Promise<Product[]> => {
    Logger.debug('ProductRepository - findAll - execute');
    return Product.findAll({
      order: [['name', 'ASC']]
    });
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug(`ProductRepository - delete - execute [id: ${id}]`);
    await Product.destroy({
      where: {
        id
      }
    });
  };

  public update = async (
    id: string,
    updatedProduct: Partial<Product>
  ): Promise<void> => {
    Logger.debug(
      `ProductRepository - update - execute [id: ${id} | updatedProduct: ${updatedProduct}]`
    );
    await Product.update(
      {
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        productStock: updatedProduct.productStock,
        sku: updatedProduct.sku,
        categoryId: updatedProduct.categoryId,
        provider: updatedProduct.provider,
        active: updatedProduct.active,
        image: updatedProduct.image,
        attributes: updatedProduct.attributes,
        updatedAt: new Date()
      },
      {
        where: {
          id
        }
      }
    );
  };

  public findById = async (id: string): Promise<Product | null> => {
    Logger.debug(`ProductRepository - findById - execute [id: ${id}]`);
    return Product.findOne({
      where: {
        id
      }
    });
  };
}
