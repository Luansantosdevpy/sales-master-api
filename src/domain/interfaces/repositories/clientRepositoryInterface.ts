import Client from '../../models/Client';

export default interface ClientRepositoryInterface {
  save(user: Client): Promise<Client>;
  findByName(name: string): Promise<Client | null>;
  findAll(): Promise<Client[] | null>;
  findById(id: string): Promise<Client | null>;
  delete(id: string): Promise<void>;
  update(id: string, client: Partial<Client>): Promise<void>;
}
