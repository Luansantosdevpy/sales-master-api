import { inject, injectable } from 'tsyringe';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../exceptions/validationError';
import NotFoundError from '../exceptions/notFoundError';
import StockRepositoryInterface from '../../domain/interfaces/repositories/stockRepositoryInterface';
import IStock from '../../domain/interfaces/modelInterfaces/stockInterface';

@injectable()
class StockService {
  constructor(
    @inject('StockRepositoryInterface')
    public readonly stockRepository: StockRepositoryInterface
  ) {}

  async create(stock: IStock): Promise<IStock> {
    Logger.debug('StockService - create - call stockRepository.save');
    return this.stockRepository.save(stock);
  }

  public findAll = async (): Promise<IStock[] | null> => {
    Logger.debug('StockService - findAll - call stockRepository.findAll');
    return this.stockRepository.findAll();
  };

  public updateQuantityBySale = async (
    id: string,
    qtd: number
  ): Promise<void> => {
    Logger.debug(
      'StockService - updateQuantityBySale - call StockService.findById'
    );
    const item = await this.findById(id);

    if (!item) {
      throw new NotFoundError('Not Found item');
    }
    const newQtd = await this.subtractionStock(item.quantity, qtd);

    Logger.debug(
      'StockService - updateQuantityBySale - call stockRepository.updateQuantity'
    );
    return this.stockRepository.updateQuantity(id, newQtd);
  };

  private subtractionStock = async (
    qtd1: number,
    qtd2: number
  ): Promise<number> => {
    const sub: number = qtd1 - qtd2;
    return sub;
  };

  public updateQuantityByInput = async (
    id: string,
    qtd: number
  ): Promise<void> => {
    Logger.debug(
      'StockService - updateQuantityByInput - call StockService.findById'
    );
    const item = await this.findById(id);

    if (!item) {
      throw new NotFoundError('Not Found item');
    }
    const newQtd = await this.additionStock(item.quantity, qtd);

    Logger.debug(
      'StockService - updateQuantityByInput - call stockRepository.updateQuantity'
    );
    return this.stockRepository.updateQuantity(id, newQtd);
  };

  private additionStock = async (
    qtd1: number,
    qtd2: number
  ): Promise<number> => {
    const sum: number = qtd1 + qtd2;
    return sum;
  };

  public update = async (
    id: string,
    updatedStock: Partial<IStock>
  ): Promise<void> => {
    Logger.debug('StockService - update - call StockService.findById');
    await this.findById(id);

    Logger.debug('StockService - update - call StockRepository.update');
    return this.stockRepository.update(id, updatedStock);
  };

  public findById = async (id: string): Promise<IStock | null> => {
    Logger.debug('StockService - findById - call stockRepository.findById');
    const stock = this.stockRepository.findById(id);
    if (!stock) {
      throw new NotFoundError('Not found stock with this id');
    }

    return stock;
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug('CategoryService - delete - call categoryRepository.findById');
    await this.findById(id);

    Logger.debug('CategoryService - delete - call categoryRepository.delete');
    return this.stockRepository.delete(id);
  };
}

export default StockService;
