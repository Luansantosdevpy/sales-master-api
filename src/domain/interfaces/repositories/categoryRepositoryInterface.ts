import Category from '../../models/Category';

export default interface CategoryRepositoryInterface {
  save(user: Category): Promise<Category>;
  findByName(name: string): Promise<Category | null>;
  findAll(): Promise<Category[] | null>;
  findById(id: string): Promise<Category | null>;
  delete(id: string): Promise<void>;
  update(id: string, category: Partial<Category>): Promise<void>;
}
