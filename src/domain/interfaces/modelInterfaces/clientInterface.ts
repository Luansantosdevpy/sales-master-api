import { Document } from 'mongoose';

export default interface IClient extends Document {
  name: string;
  email: string;
  phone_number: string;
  cpf: string;
  address: string;
  postal_code: string;
  address_number: number;
  complement?: string;
  province: string;
  city: string;
  uf: string;
  createdAt?: Date;
  updatedAt?: Date;
}
