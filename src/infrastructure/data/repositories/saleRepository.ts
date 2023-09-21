import { injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import Logger from '../../log/logger';
import Product from '../../../domain/models/Product';
import SalesRepositoryInterface from '../../../domain/interfaces/repositories/saleRepositoryInterface';
import Sales from '../../../domain/models/Sales';

@injectable()
export default class SalesRepository implements SalesRepositoryInterface {
  public save = async (newSale: Partial<Sales>): Promise<Sales> => {
    Logger.debug(`SalesRepository - create - execute [newProduct: ${newSale}]`);
    const sale = Sales.create({
      id: uuidv4(),
      date: new Date(),
      clientId: newSale.clientId,
      total: newSale.total,
      itensSale: [newSale.itensSale]
    });
    return sale;
  };

  public findAll = async (): Promise<Sales[]> => {
    Logger.debug('SalesRepository - findAll - execute');
    return Sales.findAll({
      order: [['clientId', 'ASC']]
    });
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug(`SalesRepository - delete - execute [id: ${id}]`);
    await Sales.destroy({
      where: {
        id
      }
    });
  };

  public update = async (
    id: string,
    updatedSale: Partial<Sales>
  ): Promise<void> => {
    Logger.debug(
      `ProductRepository - update - execute [id: ${id} | updatedSale: ${updatedSale}]`
    );
    await Product.update(
      {
        date: new Date(),
        clientId: updatedSale.clientId,
        total: updatedSale.total,
        itensSale: [updatedSale.itensSale],
        updatedAt: new Date()
      },
      {
        where: {
          id
        }
      }
    );
  };

  public findById = async (id: string): Promise<Sales | null> => {
    Logger.debug(`SalesRepository - findById - execute [id: ${id}]`);
    return Sales.findOne({
      where: {
        id
      }
    });
  };
}
