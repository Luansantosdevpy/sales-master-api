import { inject, injectable } from 'tsyringe';
import HealthCheckRepositoryInterface from '../../domain/interfaces/repositories/healthCheckRepositoryInterface';
import Logger from '../../infrastructure/log/logger';

@injectable()
export default class HealthCheckService {
  constructor(
    @inject('HealthCheckRepositoryInterface')
    private readonly postgresHealthCheckRepository: HealthCheckRepositoryInterface
  ) {}

  public async checkStatusAPI() {
    Logger.debug(
      'healthCheckService - checkStatusAPI - postgresHealthCheckRepository'
    );
    const postgresCheck = await this.postgresHealthCheckRepository.findStatus();

    const healthcheck = {
      name: 'Sales Master',
      status: 'OK',
      uptime: process.uptime(),
      timestamp: Date.now(),
      checks: [
        {
          name: 'Database',
          status: postgresCheck
        }
      ]
    };

    return healthcheck;
  }
}