import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import Logger from '../../log/logger';

dotenv.config();

class Database {
  public connection: Sequelize;

  constructor() {
    this.createConnections();
  }

  private async createConnections() {
    this.connection = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_POSTGRES_HOST,
      port: parseInt(process.env.DB_POSTGRES_PORT!, 10),
      database: process.env.DB_POSTGRES_NAME,
      username: process.env.DB_POSTGRES_USER,
      password: process.env.DB_POSTGRES_PASSWORD,
      logging: false
    });

    await this.testConnections();
  }

  public testConnections = async (): Promise<void> => {
    try {
      await Promise.all([
        this.connection.authenticate()
      ]);

      Logger.debug('[DATABASE] - Connections successfully established.');
    } catch (error) {
      Logger.error(
        '[DATABASE] - Unable to connect to database:',
        error
      );
      throw error;
    }
  };
}

export default new Database();