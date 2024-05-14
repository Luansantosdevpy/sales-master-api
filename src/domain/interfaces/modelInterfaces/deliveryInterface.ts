import { Document } from "mongoose";
export enum Payment{
  PIX =  'pix',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  INVOICE = 'invoice'
}
export default interface IDelivery extends Document{
    clientId: String;
    salesId: String;
    total: Number;
    payment: Payment;
    createdAt: Date;
    updatedAt: Date;
    //previsão de entrega qual o tipo ?
    deletedAt?: Date;
    reasonOfDelete?: String;
}