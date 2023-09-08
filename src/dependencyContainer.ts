import { DependencyContainer } from 'tsyringe';
import Logger from './infrastructure/log/logger';

export default async (container: DependencyContainer): Promise<void> => {
  Logger.debug('Dependency container initializing...');

  Logger.debug('Dependency container initialized!');
};
