import { injectable } from 'tsyringe';
import Logger from '../../log/logger';
import Stock from '../../../domain/models/Stock';
import IStock from '../../../domain/interfaces/modelInterfaces/stockInterface';
import StockRepositoryInterface from '../../../domain/interfaces/repositories/stockRepositoryInterface';

@injectable()
export default class StockRepository implements StockRepositoryInterface {
    public save = async (newStock: Partial<IStock>): Promise<IStock> => {
      Logger.debug(
        `StockRepository - create - execute [newStock: ${newStock}]`
      );
      const stock = await Stock.create({
        ...newStock,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return stock;
    };
  
    public findByName = async (name: string): Promise<IStock | null> => {
      Logger.debug(`StockRepository - findByName - name: ${name}`);
      return await Stock.findOne({ name });
    };
  
    public findAll = async (): Promise<IStock[]> => {
      Logger.debug('StockRepository - findAll - execute');
      return await Stock.find().sort({ name: 1 });
    };
  
    public delete = async (id: string): Promise<void> => {
      Logger.debug(`StockRepository - delete - execute [id: ${id}]`);
      await Stock.deleteOne({ _id: id });
    };
  
    public updateQuantity = async (
      id: string,
      qtd: number 
    ): Promise<void> => {
      Logger.debug(
        `StockRepository - updateQuantity - execute [id: ${id} | newQuantity: ${qtd}]`
      );
      await Stock.updateOne(
        { _id: id },
        {
          quantity: qtd,
          updatedAt: new Date(),
        }
      );
    };

    public update = async (
      id: string,
      updatedStock: Partial<IStock>
    ): Promise<void> => {
      Logger.debug(
        `StockRepository - update - execute [id: ${id} | updatedStock: ${updatedStock}]`
      );
      await Stock.updateOne(
        { _id: id },
        {
          ...updatedStock,
          updatedAt: new Date(),
        }
      );
    };
  
    public findById = async (id: string): Promise<IStock | null> => {
      Logger.debug(`StockRepository - findById - execute [id: ${id}]`);
      return await Stock.findById({ _id: id }).exec();
    };
  }
  