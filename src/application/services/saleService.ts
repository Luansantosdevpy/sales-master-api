import { inject, injectable } from 'tsyringe';
import Logger from '../../infrastructure/log/logger';
import { calculateTotalPrice } from '../middlewares/calculateTotalPrice';
import SalesRepositoryInterface from '../../domain/interfaces/repositories/saleRepositoryInterface';
import Sale from '../../domain/models/Sales';
import ProductService from './productService';

@injectable()
class SaleService {
  constructor(
    @inject('SalesRepositoryInterface')
    public readonly saleRepository: SalesRepositoryInterface,
    @inject(ProductService)
    public readonly productService: ProductService
  ) {}

  async create(sale: Sale): Promise<Sale> {
    let prices: number[] = [];
    Logger.debug('SaleService - create - validate email');

    for (const value of sale.itensSale) {
      const product = await this.productService.findById(value);

      if (product) {
        prices.push(product.price);
      }
    }

    const total = await calculateTotalPrice(prices);

    sale.total = total;

    Logger.debug('SaleService - create - call saleRepository.save');
    return this.saleRepository.save(sale);
  }

  public findAll = async (): Promise<Sale[] | null> => {
    Logger.debug('SaleService - findAll - call saleRepository.findAll');
    return this.saleRepository.findAll();
  };

  public update = async (
    id: string,
    updatedSale: Partial<Sale>
  ): Promise<void> => {
    Logger.debug('SaleService - update - call SaleService.find');
    await this.findById(id);

    Logger.debug('SaleService - update - call saleRepository.update');
    return this.saleRepository.update(id, updatedSale);
  };

  public findById = async (id: string): Promise<Sale | null> => {
    Logger.debug('SaleService - findById - call saleRepository.findById');
    return this.saleRepository.findById(id);
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug('SaleService - delete - call saleRepository.findById');
    await this.findById(id);

    Logger.debug('SaleService - delete - call saleRepository.delete');
    return this.saleRepository.delete(id);
  };
}

export default SaleService;
