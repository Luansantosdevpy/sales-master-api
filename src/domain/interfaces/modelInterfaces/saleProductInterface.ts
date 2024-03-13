import { Document } from "mongoose";

export default interface ISaleProducts extends Document {
    saleId: string;
    productId: string;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
  }