import { injectable } from 'tsyringe';
import Logger from '../../log/logger';
import Provider from '../../../domain/models/Provider';
import IProvider from '../../../domain/interfaces/modelInterfaces/providerInterface';
import ProviderRepositoryInterface from '../../../domain/interfaces/repositories/providerRepositoryInterface';

@injectable()
export default class ProviderRepository implements ProviderRepositoryInterface {
  public save = async (newProvider: Partial<IProvider>): Promise<IProvider> => {
    Logger.debug(
      `ProviderRepository - create - execute [newProvider: ${newProvider}]`
    );
    const provider = await Provider.create({
      ...newProvider,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return provider;
  };

  public findByName = async (name: string): Promise<IProvider | null> => {
    Logger.debug(`ProviderRepository - findByName - name: ${name}`);
    return await Provider.findOne({ name });
  };

  public findAll = async (): Promise<IProvider[]> => {
    Logger.debug('ProviderRepository - findAll - execute');
    return await Provider.find().sort({ name: 1 });
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug(`ProviderRepository - delete - execute [id: ${id}]`);
    await Provider.deleteOne({ _id: id });
  };

  public update = async (
    id: string,
    updatedProvider: Partial<IProvider>
  ): Promise<void> => {
    Logger.debug(
      `ProviderRepository - update - execute [id: ${id} | updatedProvider: ${updatedProvider}]`
    );
    await Provider.updateOne(
      { _id: id },
      {
        ...updatedProvider,
        updatedAt: new Date(),
      }
    );
  };

  public findById = async (id: string): Promise<IProvider | null> => {
    Logger.debug(`ProviderRepository - findById - execute [id: ${id}]`);
    return await Provider.findById({ _id: id }).exec();
  };
}
