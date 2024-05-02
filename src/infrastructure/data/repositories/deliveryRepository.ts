import { injectable } from 'tsyringe';
import IDelivery from '../../../domain/interfaces/modelInterfaces/deliveryInterface';
import Logger from '../../log/logger';
import DeliveryRepositoryInterface from '../../../domain/interfaces/repositories/deliveryRepositoryInterface';
import Delivery from '../../../domain/models/Delivery';
injectable();
export default class DeliveryRepository implements DeliveryRepositoryInterface {
  public save = async (newDelivery: Partial<IDelivery>): Promise<IDelivery> => {
    Logger.debug(
      `DeliveryRepository - create - execute [newDelivery: ${newDelivery}]`
    );

    const delivery = await Delivery.create({
      ...newDelivery,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return delivery;
  };

  public findAll = async (): Promise<IDelivery[]> => {
    Logger.debug('DeliveryRepository - findAll - execute');
    return await Delivery.find().sort({ name: 1 });
  };

  public delete = async (id: string, reasonOfDelete: string): Promise<void> => {
    Logger.debug(`DeliveryRepository - delete - execute [id: ${id}]`);
    await Delivery.updateOne({
      _id: id,
      reasonOfDelete,
      deletedAt: new Date()
    });
  };

  public update = async (
    id: string,
    updatedStatusOfDelivery: Partial<IDelivery>
  ): Promise<void> => {
    Logger.debug(
      `DeliveryRepository - update - execute [id: ${id} | updatedStatusOfDelivery: ${updatedStatusOfDelivery}]`
    );
    await Delivery.updateOne(
      { _id: id },
      {
        ...updatedStatusOfDelivery,
        updatedAt: new Date()
      }
    );
  };

  //encontrar por id
  public findById = async (id: string): Promise<IDelivery | null> => {
    Logger.debug(`DeliveryRepository - findById - execute [id: ${id}]`);
    return await Delivery.findById({ _id: id }).exec();
  };

  // id da venda
  public findAllBySalesId = async (
    salesId: string
  ): Promise<IDelivery[] | null> => {
    Logger.debug(
      `DeliveryRepository - findAllBySalesId - execute [id: ${salesId}]`
    );
    return await Delivery.find({ salesId: salesId }).sort({ name: 1 });
  };
}
