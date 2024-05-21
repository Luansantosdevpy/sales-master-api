import { injectable } from 'tsyringe';
import IPayment, {
  PaymentType
} from '../../../domain/interfaces/modelInterfaces/paymentInterface';
import Logger from '../../log/logger';
import Payment from '../../../domain/models/Payment';
import PaymentRepositoryInterface from '../../../domain/interfaces/repositories/paymentRepositoryInterface';

@injectable()
export default class PaymentRepository implements PaymentRepositoryInterface {
  public save = async (newPayment: Partial<IPayment>): Promise<IPayment> => {
    Logger.debug(
      `PaymentRepository - create - execute [newPayment: ${newPayment}]`
    );
    const payment = await Payment.create({
      payment_date: new Date(),
      total: newPayment.total,
      payment_type: newPayment.payment_type,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return payment;
  };

  public findAll = async (): Promise<IPayment[]> => {
    Logger.debug('PaymentRepository - findAll - execute');
    return await Payment.find().sort({ name: 1 });
  };

  public findAllByPaymentOfType = async (
    type: PaymentType
  ): Promise<IPayment[] | null> => {
    Logger.debug(`PaymentRepository - findByPaymentOfType - type: ${type}`);

    const payments = await Payment.find({ payment_type: type }).exec();
    return payments;
  };

  public update = async (id: string, reasonOfCancel: string): Promise<void> => {
    Logger.debug(
      `PaymentRepository - update - execute [id: ${id} | reasonOfCancel: ${reasonOfCancel}]`
    );
    await Payment.updateOne(
      { _id: id },
      {
        reasonOfCancel,
        deletedAt: new Date(),
        updatedAt: new Date()
      }
    );
  };

  public findById = async (id: string): Promise<IPayment | null> => {
    Logger.debug(`PaymentRepository - findById - execute [id: ${id}]`);
    return await Payment.findById({ _id: id }).exec();
  };

  public findAllByPaymentDate = async (
    paymentDate: Date
  ): Promise<IPayment[] | null> => {
    Logger.debug(
      `PaymentRepository - findAllByPaymentDate - execute [date: ${paymentDate}]`
    );

    const startOfDay = new Date(paymentDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(paymentDate);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const payment = await Payment.find({ payment_date: { $gte: startOfDay, $lte: endOfDay } });
    Logger.debug(
      `execute [payment: ${payment}]`
    );
    return payment
  };
}
