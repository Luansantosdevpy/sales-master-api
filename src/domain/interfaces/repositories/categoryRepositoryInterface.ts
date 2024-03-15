import ICategory from '../modelInterfaces/categoryInterface';

export default interface CategoryRepositoryInterface {
  save(user: ICategory): Promise<ICategory>;
  findByName(name: string): Promise<ICategory | null>;
  findAll(): Promise<ICategory[] | null>;
  findById(id: string): Promise<ICategory | null>;
  delete(id: string): Promise<void>;
  update(id: string, category: Partial<ICategory>): Promise<void>;
}
