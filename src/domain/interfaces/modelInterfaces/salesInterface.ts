import { Document } from 'mongoose';
export enum TypeOfSale {
  PICKUP_ORDER = 'pickupOrder',
  IN_STORE_ORDER = 'inStoreOrder',
  TABLE_ORDER = 'tableOrder'
}
export enum TimeOfSale {
  WAIT = 'wait',
  PREPARE = 'prepare',
  DONE = 'done'
}
export default interface ISale extends Document {
  date: Date;
  clientId: string;
  total: number;
  itensSale: string[];
  createdAt?: Date;
  updatedAt?: Date;
  typeOfSale: TypeOfSale;
  timeOfSale: TimeOfSale;
}
