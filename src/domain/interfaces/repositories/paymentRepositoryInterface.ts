import IPayment from '../modelInterfaces/paymentInterface';

export default interface PaymentRepositoryInterface {
  save(user: IPayment): Promise<IPayment>;
  findAllByPaymentOfType(type: string): Promise<IPayment[] | null>;
  findAll(): Promise<IPayment[] | null>;
  findAllByPaymentDate(paymentDate: Date): Promise<IPayment[] | null>;
  findById(id: string): Promise<IPayment | null>;
  update(id: string, reasonOfCancel: string): Promise<void>;
}
