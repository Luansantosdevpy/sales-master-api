import { Document } from "mongoose";

export default interface ICategory extends Document {
    category_name: string;
    description: string;
    category_image?: string;
    category_icon?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }