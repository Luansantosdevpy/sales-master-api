import IDelivery from '../modelInterfaces/deliveryInterface';

export default interface DeliveryRepositoryInterface {
  //falta alguns metodos ainda n emplementados
  save(user: IDelivery): Promise<IDelivery>;
  findAll(): Promise<IDelivery[] | null>;
  findById(id: string): Promise<IDelivery | null>;
  delete(id: string , reasonOfDelete: string): Promise<void>;
}
