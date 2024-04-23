import AddressInterface from '../modelInterfaces/addressInterface';

export default interface ViaCepMiddlewareInterface {
  findAddressByCep(cep: string): Promise<Partial<AddressInterface> | null>;
}
