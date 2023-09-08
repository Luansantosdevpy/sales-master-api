import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import { container } from 'tsyringe';
import { Server } from 'http';
import dependencyContainer from './dependencyContainer';
import Logger from './infrastructure/log/logger';

export default class App {
  public express: express.Application = express();

  private server: Server;

  public initialize = async (): Promise<void> => {
    await this.dependencyContainer();
    await this.middlewares();
    await this.routes();
  };

  public start = (port: number, appName: string): void => {
    this.server = this.express.listen(port, '0.0.0.0', () => {
      Logger.info(`${appName} listening on port ${port}!`);
    });
  };

  public stop = (): void => {
    this.server.close();
  };

  private middlewares = async (): Promise<void> => {
    this.express.use(express.json());
    this.express.use(
      cors({
        origin: '*',
        methods: 'POST, GET, PUT, OPTIONS, PATCH, DELETE',
        exposedHeaders: 'X-file-name'
      })
    );
    this.express.use(cors());
  };

  private dependencyContainer = async (): Promise<void> => {
    await dependencyContainer(container);
  };

  private routes = async (): Promise<void> => {
    //
  };
}
