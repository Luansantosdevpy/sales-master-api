import ISaleTempInterface from '../modelInterfaces/saleTempInterface';
import ISale from '../modelInterfaces/salesInterface';

export default interface SalesRepositoryInterface {
  save(user: ISale): Promise<ISale>;
  addItem(saleTempo: ISaleTempInterface): Promise<ISaleTempInterface>;
  findAll(): Promise<ISale[] | null>;
  findSaleByTableId(tableId: string): Promise<ISaleTempInterface[] | null>;
  findById(id: string): Promise<ISale | null>;
  delete(id: string): Promise<void>;
  deleteTempSale(tableId: string): Promise<void>;
  update(id: string, ISale: Partial<ISale>): Promise<void>;
}
