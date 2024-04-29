import { inject, injectable } from 'tsyringe';
import Logger from '../../infrastructure/log/logger';
import { calculateTotalPrice } from '../middlewares/calculateTotalPrice';
import SalesRepositoryInterface from '../../domain/interfaces/repositories/saleRepositoryInterface';
import ProductService from './productService';
import ISale from '../../domain/interfaces/modelInterfaces/salesInterface';
import ISaleTempInterface from '../../domain/interfaces/modelInterfaces/saleTempInterface';
import TableRepositoryInterface from '../../domain/interfaces/repositories/tableRepositoryInterface';
import NotFoundError from '../exceptions/notFoundError';
import Sale from '../../domain/models/Sales';
import AccountTableInterface from '../../domain/interfaces/outputInterfaces/accountTableInterface';

@injectable()
class SaleService {
  constructor(
    @inject('SalesRepositoryInterface')
    public readonly saleRepository: SalesRepositoryInterface,
    @inject(ProductService)
    public readonly productService: ProductService,
    @inject('TableRepositoryInterface')
    public readonly tableRepository: TableRepositoryInterface
  ) {}

  async create(sale: ISale): Promise<ISale> {
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
    sale.timeOfSale[0];
    Logger.debug('SaleService - create - call saleRepository.save');
    return this.saleRepository.save(sale);
  }

  async addItem(sale: ISaleTempInterface): Promise<ISaleTempInterface> {
    Logger.debug('SaleService - addItem - verify if table is occuped');
    const table = await this.tableRepository.findById(sale.tableId);

    if(!table) {
      throw new NotFoundError('Not found table with this id');
    }

    if (table.table_status === false) {
      const tableUpdate = {
        table_number: table.table_number,
        table_status: true
      };
      await this.tableRepository.update(table.id, tableUpdate)
    }
    Logger.debug('SaleService - create - call saleRepository.addItem');
    return this.saleRepository.addItem(sale);
  }

  async visualizeAccount(tableId: string): Promise<Partial<ISaleTempInterface> | null> {
    const saleTemp = await this.saleRepository.findSaleByTableId(tableId);
  
    if (!saleTemp) {
      throw new NotFoundError('Not found sale for this table');
    }

    const table = await this.tableRepository.findById(tableId);
    
    if(!table) {
      throw new NotFoundError('Not found table with this id');
    };

    if (table.table_status === false) {
       return null;
    }
  
    let prices: number[] = [];
    let products: string[] = [];
  
    saleTemp.forEach(item => {
      item.itensSale.forEach(sale => {
        products.push(sale);
      });
    });
  
    await Promise.all(products.map(async product => {
      const unitProduct = await this.productService.findById(product);
  
      if (!unitProduct) {
        throw new NotFoundError('Not found product with this id');
      }
  
      prices.push(unitProduct.price);
    }));
  
    const total = await calculateTotalPrice(prices);
    
    const accountTable: Partial<AccountTableInterface> = {
      tableId: tableId,
      itens: products,
      total: total
    };
  
    return accountTable;
  }

  async closeTable(tableId: string): Promise<ISale | null> {
    const saleTemp = await this.saleRepository.findSaleByTableId(tableId);
  
    if (!saleTemp) {
      throw new NotFoundError('Not found sale for this table');
    }

    const table = await this.tableRepository.findById(tableId);
    
    if(!table) {
      throw new NotFoundError('Not found table with this id');
    };

    if (table.table_status === false) {
       return null;
    }
  
    let prices: number[] = [];
    let products: string[] = [];
  
    saleTemp.forEach(item => {
      item.itensSale.forEach(sale => {
        products.push(sale);
      });
    });
  
    await Promise.all(products.map(async product => {
      const unitProduct = await this.productService.findById(product);
  
      if (!unitProduct) {
        throw new NotFoundError('Not found product with this id');
      }
  
      prices.push(unitProduct.price);
    }));
  
    const total = await calculateTotalPrice(prices);
    
    const newSale = new Sale({
      total: total,
      itensSale: products
    });
  
    const sale = await this.saleRepository.save(newSale);

    await this.saleRepository.deleteTempSale(tableId);

    const tableUpdated = {
      table_number: table.table_number,
      table_status: false
    }

    await this.tableRepository.update(tableId, tableUpdated);
  
    return sale;
  }

  public findAll = async (): Promise<ISale[] | null> => {
    Logger.debug('SaleService - findAll - call saleRepository.findAll');
    return this.saleRepository.findAll();
  };

  public update = async (
    id: string,
    updatedSale: Partial<ISale>
  ): Promise<void> => {
    Logger.debug('SaleService - update - call SaleService.find');
    await this.findById(id);

    Logger.debug('SaleService - update - call saleRepository.update');
    return this.saleRepository.update(id, updatedSale);
  };

  public findById = async (id: string): Promise<ISale | null> => {
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
