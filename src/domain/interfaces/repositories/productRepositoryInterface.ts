import IProduct from '../modelInterfaces/productInterface';

export default interface ProductRepositoryInterface {
  save(user: IProduct): Promise<IProduct>;
  findByName(name: string): Promise<IProduct | null>;
  findAll(): Promise<IProduct[] | null>;
  findAllByCategoryId(categoryId: string): Promise<IProduct[] | null>;
  findById(id: string): Promise<IProduct | null>;
  delete(id: string): Promise<void>;
  update(id: string, IProduct: Partial<IProduct>): Promise<void>;
}
