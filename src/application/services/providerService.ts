import { inject, injectable } from 'tsyringe';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../exceptions/validationError';
import ProviderRepositoryInterface from '../../domain/interfaces/repositories/providerRepositoryInterface';
import IProvider from '../../domain/interfaces/modelInterfaces/providerInterface';

@injectable()
class ProviderService {
  constructor(
    @inject('ProviderRepositoryInterface')
    public readonly providerRepository: ProviderRepositoryInterface
  ) {}

  async create(provider: IProvider): Promise<IProvider> {
    Logger.debug('ProviderService - create - validate name');
    const nameExists = await this.providerRepository.findByName(provider.name);

    if (nameExists) {
      throw new ValidationError(
        `The name '${provider.name}' is already in use.`
      );
    }

    Logger.debug('ProviderService - create - call ProviderRepository.save');
    return this.providerRepository.save(provider);
  }

  public findAll = async (): Promise<IProvider[] | null> => {
    Logger.debug('ProviderService - findAll - call ProviderRepository.findAll');
    return this.providerRepository.findAll();
  };

  public update = async (
    id: string,
    updatedProvider: Partial<IProvider>
  ): Promise<void> => {
    Logger.debug('ProviderService - update - call ProviderService.find');
    await this.findById(id);

    Logger.debug('ProviderService - update - validate Client name');
    const ProviderExists = await this.providerRepository.findByName(
      updatedProvider.name!
    );

    if (ProviderExists) {
      throw new ValidationError(
        `The Provider name '${updatedProvider.name}' is already in use.`
      );
    }

    Logger.debug('ProviderService - update - call ProviderRepository.update');
    return this.providerRepository.update(id, updatedProvider);
  };

  public findById = async (id: string): Promise<IProvider | null> => {
    Logger.debug(
      'ProviderService - findById - call ProviderRepository.findById'
    );
    return this.providerRepository.findById(id);
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug('ProviderService - delete - call ProviderRepository.findById');
    await this.findById(id);

    Logger.debug('ProviderService - delete - call ProviderRepository.delete');
    return this.providerRepository.delete(id);
  };
}

export default ProviderService;
