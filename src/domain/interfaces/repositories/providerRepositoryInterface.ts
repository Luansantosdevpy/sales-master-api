import Provider from '../../models/Provider';

export default interface ProviderRepositoryInterface {
  save(user: Provider): Promise<Provider>;
  findByName(name: string): Promise<Provider | null>;
  findAll(): Promise<Provider[] | null>;
  findById(id: string): Promise<Provider | null>;
  delete(id: string): Promise<void>;
  update(id: string, provider: Partial<Provider>): Promise<void>;
}
