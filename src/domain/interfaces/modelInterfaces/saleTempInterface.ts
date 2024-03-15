import { Document } from "mongoose";

export default interface ISaleTempInterface extends Document {
  tableId: string;
  itensSale: string[];
  createdAt?: Date;
  updatedAt?: Date;
}