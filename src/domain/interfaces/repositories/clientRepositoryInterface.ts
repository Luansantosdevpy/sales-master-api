import IClient from '../modelInterfaces/clientInterface';

export default interface ClientRepositoryInterface {
  save(user: IClient): Promise<IClient>;
  findByName(name: string): Promise<IClient | null>;
  findAll(): Promise<IClient[] | null>;
  findById(id: string): Promise<IClient | null>;
  delete(id: string): Promise<void>;
  update(id: string, client: Partial<IClient>): Promise<void>;
}
