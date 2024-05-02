import { DependencyContainer, instanceCachingFactory } from 'tsyringe';
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
import HealthCheckRepositoryInterface from './domain/interfaces/repositories/healthCheckRepositoryInterface';
import PostgresHealthCheckRepository from './infrastructure/data/repositories/healthCheckRepository';
import HealthCheckService from './application/services/healthCheckService';
import TableRepositoryInterface from './domain/interfaces/repositories/tableRepositoryInterface';
import TableRepository from './infrastructure/data/repositories/tableRepository';
import TableService from './application/services/tableService';
import PermissionRepositoryInterface from './domain/interfaces/repositories/permissionRepositoryInterface';
import PermissionRepository from './infrastructure/data/repositories/permissionRepository';
import PermissionService from './application/services/permissionService';
import RoleRepositoryInterface from './domain/interfaces/repositories/roleRepositoryInterface';
import RoleRepository from './infrastructure/data/repositories/roleRepository';
import RoleService from './application/services/roleService';
import StockRepository from './infrastructure/data/repositories/stockRepository';
import StockService from './application/services/stockService';
import StockRepositoryInterface from './domain/interfaces/repositories/stockRepositoryInterface';
import axios, { AxiosStatic } from 'axios';
import ViaCepMiddlewareInterface from './domain/interfaces/externals/viaCepMiddlewareInterface';
import ViaCepMiddleware from './infrastructure/externals/viaCepMiddleware';
import DeliveryService from './application/services/deliveryService';

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

  container.register<TableRepositoryInterface>('TableRepositoryInterface', {
    useClass: TableRepository
  });

  container.register<TableService>('TableService', {
    useClass: TableService
  });

  container.register<PermissionRepositoryInterface>(
    'PermissionRepositoryInterface',
    {
      useClass: PermissionRepository
    }
  );

  container.register<PermissionService>('PermissionService', {
    useClass: PermissionService
  });

  container.register<RoleRepositoryInterface>('RoleRepositoryInterface', {
    useClass: RoleRepository
  });

  container.register<RoleService>('RoleService', {
    useClass: RoleService
  });

  container.register<StockRepositoryInterface>('StockRepositoryInterface', {
    useClass: StockRepository
  });

  container.register<StockService>('StockService', {
    useClass: StockService
  });

  container.register<DeliveryService>('DeliveryService', {
    useClass: DeliveryService
  });

  container.register<HealthCheckRepositoryInterface>(
    'HealthCheckRepositoryInterface',
    {
      useClass: PostgresHealthCheckRepository
    }
  );

  container.register<HealthCheckService>('HealthCheckService', {
    useClass: HealthCheckService
  });

  container.register<AxiosStatic>('Axios', {
    useFactory: instanceCachingFactory(() => axios)
  });

  container.register<ViaCepMiddlewareInterface>('ViaCepMiddlewareInterface', {
    useClass: ViaCepMiddleware
  });
  Logger.debug('Dependency container initialized!');
};
