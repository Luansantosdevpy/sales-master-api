import { inject, injectable } from 'tsyringe';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../exceptions/validationError';
import ClientRepositoryInterface from '../../domain/interfaces/repositories/clientRepositoryInterface';
import IClient from '../../domain/interfaces/modelInterfaces/clientInterface';
import Client from '../../domain/models/Client';
import ViaCepMiddlewareInterface from '../../domain/interfaces/externals/viaCepMiddlewareInterface';
import { AxiosError } from 'axios';
@injectable()
class ClientService {
  constructor(
    @inject('ClientRepositoryInterface')
    public readonly clientRepository: ClientRepositoryInterface,
    @inject('ViaCepMiddlewareInterface')
    public readonly viaCepMiddleware: ViaCepMiddlewareInterface
  ) {}

  async create(client: IClient): Promise<IClient> {
    Logger.debug('clientService - create - validate email');
    const emailExists = await this.clientRepository.findByName(client.name);

    if (emailExists) {
      throw new ValidationError(`The name '${client.name}' is already in use.`);
    }
    const cep = await this.viaCepMiddleware.findAddressByCep(
      client.postal_code
    );
    if (!cep) {
      throw new AxiosError();
    }

    Logger.debug('clientService - create - call clientRepository.save');
    const clientWithCep = new Client({
      ...client,
      address: cep.address,
      postal_code: cep.postal_code,
      complement: cep.complement,
      province: cep.province,
      city: cep.city,
      uf: cep.uf
    });
    return this.clientRepository.save(clientWithCep);
  }

  public findAll = async (): Promise<IClient[] | null> => {
    Logger.debug('ClientService - findAll - call clientRepository.findAll');
    return this.clientRepository.findAll();
  };

  public update = async (
    id: string,
    updatedClient: Partial<IClient>
  ): Promise<void> => {
    Logger.debug('ClientService - update - call ClientService.find');
    await this.findById(id);

    Logger.debug('ClientService - update - validate Client name');
    const ClientExists = await this.clientRepository.findByName(
      updatedClient.name!
    );

    if (ClientExists) {
      throw new ValidationError(
        `The Client name '${updatedClient.name}' is already in use.`
      );
    }

    Logger.debug('ClientService - update - call ClientRepository.update');
    return this.clientRepository.update(id, updatedClient);
  };

  public findById = async (id: string): Promise<IClient | null> => {
    Logger.debug('ClientService - findById - call clientRepository.findById');
    return this.clientRepository.findById(id);
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug('clientService - delete - call clientRepository.findById');
    await this.findById(id);

    Logger.debug('clientService - delete - call clientRepository.delete');
    return this.clientRepository.delete(id);
  };
}

export default ClientService;
