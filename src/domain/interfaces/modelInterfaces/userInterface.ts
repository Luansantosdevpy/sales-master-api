import { Document } from "mongoose";

export default interface IUser extends Document {
    name: string;
    email: string;
    cpf: string;
    password: string;
    confirm_password: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  