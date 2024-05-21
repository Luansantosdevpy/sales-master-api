import { inject, injectable } from 'tsyringe';
import Logger from '../../infrastructure/log/logger';
import ValidationError from '../exceptions/validationError';
import paymentRepositoryInterface from '../../domain/interfaces/repositories/paymentRepositoryInterface';
import IPayment from '../../domain/interfaces/modelInterfaces/paymentInterface';

@injectable()
class PaymentService {
  constructor(
    @inject('PaymentRepositoryInterface')
    public readonly paymentRepository: paymentRepositoryInterface
  ) {}

  async create(payment: IPayment): Promise<IPayment> {
    Logger.debug('PaymentService - create - call paymentRepository.save');
    return this.paymentRepository.save(payment);
  }

  public findAll = async (): Promise<IPayment[] | null> => {
    Logger.debug('PaymentService - findAll - call paymentRepository.findAll');
    return this.paymentRepository.findAll();
  };

  public update = async (id: string, reasonOfCancel: string): Promise<void> => {
    Logger.debug('PaymentService - update - call PaymentService.find');
    await this.findById(id);

    Logger.debug('PaymentService - update - call paymentRepository.update');
    return this.paymentRepository.update(id, reasonOfCancel);
  };

  public findById = async (id: string): Promise<IPayment | null> => {
    Logger.debug('PaymentService - findById - call paymentRepository.findById');
    return this.paymentRepository.findById(id);
  };

  public findAllByPaymentDate = async (
    paymentDate: string
  ): Promise<IPayment[] | null> => {
    Logger.debug(
      'PaymentService - findAllByPaymentDate - call paymentRepository.findAllByPaymentDate'
    );
   
    const dateObject = new Date(paymentDate);
    Logger.debug(
      `Invalid date format: ${dateObject}`
    );
    if (isNaN(dateObject.getTime())) {
      throw new Error(`Invalid date format: ${dateObject}`);
  }
    return this.paymentRepository.findAllByPaymentDate(dateObject);
  };

  public findAllByPaymentOftype = async (
    type: string
  ): Promise<IPayment[] | null> => {
    Logger.debug('ProductService - findAll - call productRepository.findAll');
    return this.paymentRepository.findAllByPaymentOfType(type);
  };
}

export default PaymentService;
