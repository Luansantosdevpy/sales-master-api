import IRole from '../modelInterfaces/roleInterface';

export default interface RoleRepositoryInterface {
  save(role: IRole): Promise<IRole>;
  findByName(name: string): Promise<IRole | null>;
  findAll(): Promise<IRole[] | null>;
  findById(id: string): Promise<IRole | null>;
  delete(id: string): Promise<void>;
  update(id: string, client: Partial<IRole>): Promise<void>;
}
