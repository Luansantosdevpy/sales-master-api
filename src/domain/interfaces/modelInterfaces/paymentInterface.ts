import { Document } from 'mongoose';
export enum PaymentType {
  PIX = 'pix',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  MONEY_BILL = 'money_bill'
}
export default interface IPayment extends Document {
  total: Number;
  payment_type: PaymentType;
  payment_date: Date;
  clientId?: String;
  deletedAt?: Date;
  reasonOfCancel?: String;
}
