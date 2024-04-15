import { Document } from "mongoose";

export default interface IStock extends Document {
    
    productsName: string;
    productId: string;
    description: string;
    quantityAvailable: number;
    quantity: number;
    retailPrice: number;
    provider: string;
    expirationDate: string;
    createdAt?: Date;
    updatedAt?: Date;
  }