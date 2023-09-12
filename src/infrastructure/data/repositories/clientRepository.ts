import { injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import Logger from '../../log/logger';
import Client from '../../../domain/models/Client';
import ClientRepositoryInterface from '../../../domain/interfaces/repositories/clientRepositoryInterface';

@injectable()
export default class ClientRepository implements ClientRepositoryInterface {
  public save = async (newClient: Partial<Client>): Promise<Client> => {
    Logger.debug(
      `ClientRepository - create - execute [newClient: ${newClient}]`
    );
    const client = Client.create({
      id: uuidv4(),
      name: newClient.name,
      email: newClient.email,
      phone_number: newClient.phone_number,
      cpf: newClient.cpf,
      address: newClient.address,
      postal_code: newClient.postal_code,
      address_number: newClient.address_number,
      complement: newClient.complement,
      province: newClient.province,
      city: newClient.city,
      uf: newClient.uf
    });
    return client;
  };

  public findByName = async (name: string): Promise<Client | null> => {
    Logger.debug(`ClientRepository - findByName - name: ${name}`);
    return Client.findOne({
      where: {
        name
      }
    });
  };

  public findAll = async (): Promise<Client[]> => {
    Logger.debug('ClientRepository - findAll - execute');
    return Client.findAll({
      order: [['name', 'ASC']]
    });
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug(`ClientRepository - delete - execute [id: ${id}]`);
    await Client.destroy({
      where: {
        id
      }
    });
  };

  public update = async (
    id: string,
    updatedClient: Partial<Client>
  ): Promise<void> => {
    Logger.debug(
      `ClientRepository - update - execute [id: ${id} | updatedClient: ${updatedClient}]`
    );
    await Client.update(
      {
        name: updatedClient.name,
        email: updatedClient.email,
        phone_number: updatedClient.phone_number,
        cpf: updatedClient.cpf,
        address: updatedClient.address,
        postal_code: updatedClient.postal_code,
        address_number: updatedClient.address_number,
        complement: updatedClient.complement,
        province: updatedClient.province,
        city: updatedClient.city,
        uf: updatedClient.uf,
        updatedAt: new Date()
      },
      {
        where: {
          id
        }
      }
    );
  };

  public findById = async (id: string): Promise<Client | null> => {
    Logger.debug(`ClientRepository - findById - execute [id: ${id}]`);
    return Client.findOne({
      where: {
        id
      }
    });
  };
}
