import { Schema, model } from 'mongoose';
import IClient from '../interfaces/modelInterfaces/clientInterface';

const ClientSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true },
  cpf: { type: String, required: true },
  address: { type: String, required: true },
  postal_code: { type: String, required: true },
  address_number: { type: Number, required: true },
  complement: { type: String },
  province: { type: String, required: true },
  city: { type: String, required: true },
  uf: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Client = model<IClient>('Client', ClientSchema);

export default Client;