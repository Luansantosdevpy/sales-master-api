import { inject, injectable } from 'tsyringe';
import DeliveryRepositoryInterface from '../../domain/interfaces/repositories/deliveryRepositoryInterface';
import IDelivery from '../../domain/interfaces/modelInterfaces/deliveryInterface';
import Logger from '../../infrastructure/log/logger';

injectable();
class DeliveryService {
  constructor(
    @inject('DeliveryRepositoryInterface')
    public readonly deliveryRepository: DeliveryRepositoryInterface
  ) {}

  async create(delivery: IDelivery): Promise<IDelivery> {
    Logger.debug('DeliveryService - create - call DeliveryRepository.save');
    return this.deliveryRepository.save(delivery);
  }

  public findAll = async (): Promise<IDelivery[] | null> => {
    Logger.debug('DeliveryService - findAll - call DeliveryRepository.findAll');
    return this.deliveryRepository.findAll();
  };

  public findById = async (id: string): Promise<IDelivery | null> => {
    Logger.debug(
      'DeliveryService - findById - call DeliveryRepository.findById'
    );
    return this.deliveryRepository.findById(id);
  };

  public delete = async (id: string, reasonOfDelete: string): Promise<void> => {
    Logger.debug('deliveryService - delete - call deliveryRepository.findById');
    await this.findById(id);

    Logger.debug('deliveryService - delete - call deliveryRepository.delete');
    return this.deliveryRepository.delete(id, reasonOfDelete);
  };
}
export default DeliveryService;
