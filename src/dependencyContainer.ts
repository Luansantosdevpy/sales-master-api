import { DependencyContainer } from 'tsyringe';
import Logger from './infrastructure/log/logger';
import UserRepository from './infrastructure/data/repositories/userRepository';
import UserService from './application/services/userService';
import UserRepositoryInterface from './domain/interfaces/repositories/userRepositoryInterface';

export default async (container: DependencyContainer): Promise<void> => {
  Logger.debug('Dependency container initializing...');

  container.register<UserRepositoryInterface>('UserRepositoryInterface', {
    useClass: UserRepository
  });

  container.register<UserService>('UserService', {
    useClass: UserService
  });

  Logger.debug('Dependency container initialized!');
};
