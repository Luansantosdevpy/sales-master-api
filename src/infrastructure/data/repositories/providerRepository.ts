import { injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import Logger from '../../log/logger';
import Product from '../../../domain/models/Product';
import ProviderRepositoryInterface from '../../../domain/interfaces/repositories/providerRepositoryInterface';
import Provider from '../../../domain/models/Provider';

@injectable()
export default class ProviderRepository implements ProviderRepositoryInterface {
  public save = async (newProvider: Partial<Provider>): Promise<Provider> => {
    Logger.debug(
      `ProviderRepository - create - execute [newProvider: ${newProvider}]`
    );
    const provider = Provider.create({
      id: uuidv4(),
      name: newProvider.name,
      cnpj: newProvider.cnpj,
      corporate_name: newProvider.corporate_name,
      fantasy_name: newProvider.fantasy_name,
      phone_number: newProvider.phone_number,
      postal_code: newProvider.postal_code,
      address: newProvider.address,
      complement: newProvider.complement,
      address_number: newProvider.address_number,
      province: newProvider.province,
      city: newProvider.city,
      uf: newProvider.uf,
      active: newProvider.active
    });
    return provider;
  };

  public findByName = async (name: string): Promise<Provider | null> => {
    Logger.debug(`ProviderRepository - findByName - name: ${name}`);
    return Provider.findOne({
      where: {
        name
      }
    });
  };

  public findAll = async (): Promise<Provider[]> => {
    Logger.debug('ProviderRepository - findAll - execute');
    return Provider.findAll({
      order: [['name', 'ASC']]
    });
  };

  public delete = async (id: string): Promise<void> => {
    Logger.debug(`ProductRepository - delete - execute [id: ${id}]`);
    await Product.destroy({
      where: {
        id
      }
    });
  };

  public update = async (
    id: string,
    updatedProvider: Partial<Provider>
  ): Promise<void> => {
    Logger.debug(
      `ProviderRepository - update - execute [id: ${id} | updatedProvider: ${updatedProvider}]`
    );
    await Provider.update(
      {
        name: updatedProvider.name,
        cnpj: updatedProvider.cnpj,
        corporate_name: updatedProvider.corporate_name,
        fantasy_name: updatedProvider.fantasy_name,
        phone_number: updatedProvider.phone_number,
        postal_code: updatedProvider.postal_code,
        address: updatedProvider.address,
        complement: updatedProvider.complement,
        address_number: updatedProvider.address_number,
        province: updatedProvider.province,
        city: updatedProvider.city,
        uf: updatedProvider.uf,
        active: updatedProvider.active,
        updatedAt: new Date()
      },
      {
        where: {
          id
        }
      }
    );
  };

  public findById = async (id: string): Promise<Provider | null> => {
    Logger.debug(`ProviderRepository - findById - execute [id: ${id}]`);
    return Provider.findOne({
      where: {
        id
      }
    });
  };
}
