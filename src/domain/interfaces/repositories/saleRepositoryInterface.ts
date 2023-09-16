import Sales from '../../models/Sales';

export default interface SalesRepositoryInterface {
  save(user: Sales): Promise<Sales>;
  findAll(): Promise<Sales[] | null>;
  findById(id: string): Promise<Sales | null>;
  delete(id: string): Promise<void>;
  update(id: string, sales: Partial<Sales>): Promise<void>;
}
