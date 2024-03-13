import mongoose, { Schema } from 'mongoose';
import IProvider from '../interfaces/modelInterfaces/providerInterface';

const providerSchema = new Schema(
  {
    name: { type: String, required: true },
    cnpj: { type: String, required: true },
    corporate_name: { type: String, required: true },
    fantasy_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    postal_code: { type: String, required: true },
    address: { type: String, required: true },
    complement: { type: String },
    address_number: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    uf: { type: String, required: true },
    active: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { collection: 'providers' }
);

const Provider = mongoose.model<IProvider>('Provider', providerSchema);

export default Provider;
