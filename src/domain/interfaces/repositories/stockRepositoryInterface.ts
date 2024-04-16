import IStock from '../modelInterfaces/stockInterface';

export default interface StockRepositoryInterface {
  save(user: IStock): Promise<IStock>;
  findByName(name: string): Promise<IStock | null>;
  findAll(): Promise<IStock[] | null>;
  findById(id: string): Promise<IStock | null>;
  delete(id: string): Promise<void>;
  update(id: string, IStock: Partial<IStock>): Promise<void>;
  updateQuantity(id: string, qtd: number): Promise<void>;
}
