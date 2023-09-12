import { DependencyContainer } from 'tsyringe';
import Logger from './infrastructure/log/logger';
import UserRepository from './infrastructure/data/repositories/userRepository';
import UserService from './application/services/userService';
import UserRepositoryInterface from './domain/interfaces/repositories/userRepositoryInterface';
import ClientRepositoryInterface from './domain/interfaces/repositories/clientRepositoryInterface';
import ClientRepository from './infrastructure/data/repositories/clientRepository';
import ClientService from './application/services/clientService';

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

  Logger.debug('Dependency container initialized!');
};
