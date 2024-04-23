import { AxiosError, AxiosResponse, AxiosStatic } from 'axios';
import Logger from '../../infrastructure/log/logger';
import ViaCepMiddlewareInterface from '../../domain/interfaces/externals/viaCepMiddlewareInterface';
import { inject, injectable } from 'tsyringe';
import AddressInterface from '../../domain/interfaces/modelInterfaces/addressInterface';

@injectable()
export default class ViaCepMiddleware implements ViaCepMiddlewareInterface {
  baseUrl: string = process.env.URL_VIA_CEP!;
  constructor(
    @inject('Axios')
    private axios: AxiosStatic
  ) {}

  findAddressByCep = async (cep: string): Promise<Partial<AddressInterface> | null> => {
    const url = `${this.baseUrl}/ws/${cep}/json`;
    try {
      const response = await this.axios.get(url);

      if (response.status !== 200) {
        throw new AxiosError();
      }

      const addressData: Partial< AddressInterface> = {
        address: response.data.logradouro,
      postal_code: response.data.cep,
      complement: response.data.complemento,
      province: response.data.bairro,
      city: response.data.localidade,
      uf: response.data.uf
      } 
      Logger.debug('Automate Address By Postal Code - Find address by CEP');

      return addressData ?? [];
    } catch (error) {
      Logger.error('Error fetching address data:', error);
      throw error;
    }
  };
}
