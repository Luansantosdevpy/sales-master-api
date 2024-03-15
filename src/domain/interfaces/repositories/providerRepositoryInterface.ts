import IProvider from '../modelInterfaces/providerInterface';

export default interface ProviderRepositoryInterface {
  save(user: IProvider): Promise<IProvider>;
  findByName(name: string): Promise<IProvider | null>;
  findAll(): Promise<IProvider[] | null>;
  findById(id: string): Promise<IProvider | null>;
  delete(id: string): Promise<void>;
  update(id: string, IProvider: Partial<IProvider>): Promise<void>;
}
