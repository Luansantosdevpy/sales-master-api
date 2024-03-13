import { injectable } from 'tsyringe';
import Logger from '../../log/logger';
import Sales from '../../../domain/models/Sales';
import ISale from '../../../domain/interfaces/modelInterfaces/salesInterface';
import SalesRepositoryInterface from '../../../domain/interfaces/repositories/saleRepositoryInterface';

@injectable()
export default class SalesRepository implements SalesRepositoryInterface {
  public save = async (newSale: Partial<ISale>): Promise<ISale> => {
    Logger.debug(`SalesRepository - create - execute [newSale: ${newSale}]`);
    const sale = await Sales.create({
      ...newSale,
      date: new Date(),
    });
    return sale;
  };

  public findAll = async (): Promise<ISale[]> => {
    Logger.debug('SalesRepository - findAll - execute');
    return await Sales.find().sort({ clientId: 1 });
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug(`SalesRepository - delete - execute [id: ${id}]`);
    await Sales.deleteOne({ _id: id });
  };

  public update = async (
    id: string,
    updatedSale: Partial<ISale>
  ): Promise<void> => {
    Logger.debug(
      `SalesRepository - update - execute [id: ${id} | updatedSale: ${updatedSale}]`
    );
    await Sales.updateOne(
      { _id: id },
      {
        ...updatedSale,
        updatedAt: new Date(),
      }
    );
  };

  public findById = async (id: string): Promise<ISale | null> => {
    Logger.debug(`SalesRepository - findById - execute [id: ${id}]`);
    return await Sales.findById(id);
  };
}
