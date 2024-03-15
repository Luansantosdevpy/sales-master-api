import { injectable } from 'tsyringe';
import Logger from '../../log/logger';
import IClient from '../../../domain/interfaces/modelInterfaces/clientInterface';
import ClientModel from '../../../domain/models/Client';
import ClientRepositoryInterface from '../../../domain/interfaces/repositories/clientRepositoryInterface';

@injectable()
export default class ClientRepository implements ClientRepositoryInterface {
  public save = async (newClient: Partial<IClient>): Promise<IClient> => {
    Logger.debug(
      `ClientRepository - create - execute [newClient: ${newClient}]`
    );
    const client = await ClientModel.create({
      ...newClient,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return client;
  };

  public findByName = async (name: string): Promise<IClient | null> => {
    Logger.debug(`ClientRepository - findByName - name: ${name}`);
    return await ClientModel.findOne({ name });
  };

  public findAll = async (): Promise<IClient[]> => {
    Logger.debug('ClientRepository - findAll - execute');
    return await ClientModel.find().sort({ name: 1 });
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug(`ClientRepository - delete - execute [id: ${id}]`);
    await ClientModel.deleteOne({ _id: id });
  };

  public update = async (
    id: string,
    updatedClient: Partial<IClient>
  ): Promise<void> => {
    Logger.debug(
      `ClientRepository - update - execute [id: ${id} | updatedClient: ${updatedClient}]`
    );
    await ClientModel.updateOne(
      { _id: id },
      {
        ...updatedClient,
        updatedAt: new Date(),
      }
    );
  };

  public findById = async (id: string): Promise<IClient | null> => {
    Logger.debug(`ClientRepository - findById - execute [id: ${id}]`);
    return await ClientModel.findById({ _id: id }).exec();
  };
}
