import { Document } from "mongoose";

export default interface ITable extends Document {
    table_number: number;
    table_status: boolean;
  }