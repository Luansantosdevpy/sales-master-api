import { DependencyContainer } from 'tsyringe';
import Logger from './infrastructure/log/logger';
import UserRepository from './infrastructure/data/repositories/userRepository';
import UserService from './application/services/userService';
import UserRepositoryInterface from './domain/interfaces/repositories/userRepositoryInterface';
import ClientRepositoryInterface from './domain/interfaces/repositories/clientRepositoryInterface';
import ClientRepository from './infrastructure/data/repositories/clientRepository';
import ClientService from './application/services/clientService';
import CategoryRepositoryInterface from './domain/interfaces/repositories/categoryRepositoryInterface';
import CategoryRepository from './infrastructure/data/repositories/categoryRepository';
import CategoryService from './application/services/categoryService';
import ProductRepositoryInterface from './domain/interfaces/repositories/productRepositoryInterface';
import ProductRepository from './infrastructure/data/repositories/productRepository';
import ProductService from './application/services/productService';
import SalesRepositoryInterface from './domain/interfaces/repositories/saleRepositoryInterface';
import SalesRepository from './infrastructure/data/repositories/saleRepository';
import SaleService from './application/services/saleService';
import ProviderRepositoryInterface from './domain/interfaces/repositories/providerRepositoryInterface';
import ProviderRepository from './infrastructure/data/repositories/providerRepository';
import ProviderService from './application/services/providerService';

export default async (container: DependencyContainer): Promise<void> => {
  Logger.debug('Dependency container initializing...');

  container.register<UserRepositoryInterface>('UserRepositoryInterface', {
    useClass: UserRepository
  });

  container.register<UserService>('UserService', {
    useClass: UserService
  });

  container.register<ClientRepositoryInterface>('ClientRepositoryInterface', {
    useClass: ClientRepository
  });

  container.register<ClientService>('ClientService', {
    useClass: ClientService
  });

  container.register<CategoryRepositoryInterface>(
    'CategoryRepositoryInterface',
    {
      useClass: CategoryRepository
    }
  );

  container.register<CategoryService>('CategoryService', {
    useClass: CategoryService
  });

  container.register<ProductRepositoryInterface>('ProductRepositoryInterface', {
    useClass: ProductRepository
  });

  container.register<ProductService>('ProductService', {
    useClass: ProductService
  });

  container.register<SalesRepositoryInterface>('SalesRepositoryInterface', {
    useClass: SalesRepository
  });

  container.register<SaleService>('SaleService', {
    useClass: SaleService
  });

  container.register<ProviderRepositoryInterface>(
    'ProviderRepositoryInterface',
    {
      useClass: ProviderRepository
    }
  );

  container.register<ProviderService>('ProviderService', {
    useClass: ProviderService
  });

  Logger.debug('Dependency container initialized!');
};
