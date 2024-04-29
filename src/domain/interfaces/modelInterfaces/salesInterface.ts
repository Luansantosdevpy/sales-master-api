import { Document } from 'mongoose';
export default interface ISale extends Document {
  date: Date;
  clientId: string;
  total: number;
  itensSale: string[];
  createdAt?: Date;
  updatedAt?: Date;
  typeOfSale: {
    type: String;
    enum: ['pickupOrder', 'inStoreOrder', 'tableOrder'];
  };
  timeOfSale: {
    type: String;
    enum: ['wait', 'prepare', 'done'];
  };
}
