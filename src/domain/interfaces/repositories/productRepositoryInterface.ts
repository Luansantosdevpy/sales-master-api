import Product from '../../models/Product';

export default interface ProductRepositoryInterface {
  save(user: Product): Promise<Product>;
  findByName(name: string): Promise<Product | null>;
  findAll(): Promise<Product[] | null>;
  findById(id: string): Promise<Product | null>;
  delete(id: string): Promise<void>;
  update(id: string, Product: Partial<Product>): Promise<void>;
}
