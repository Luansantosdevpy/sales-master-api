import { Document } from "mongoose";

export default interface IProvider extends Document {
    name: string;
    cnpj: string;
    corporate_name: string;
    fantasy_name: string;
    phone_number: string;
    postal_code: string;
    address: string;
    complement: string;
    address_number: string;
    province: string;
    city: string;
    uf: string;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }