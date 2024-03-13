import { Document } from "mongoose";

export default interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    productStock: number;
    sku: string;
    categoryId: string;
    provider: number;
    active: boolean;
    image: string;
    attributes: string;
    createdAt?: Date;
    updatedAt?: Date;
  }