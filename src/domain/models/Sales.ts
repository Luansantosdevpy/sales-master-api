import mongoose, { Schema } from 'mongoose';
import ISale from '../interfaces/modelInterfaces/salesInterface';

const saleSchema = new Schema(
  {
    date: { type: Date, required: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    total: { type: Number, required: true },
    itensSale: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { collection: 'sales' }
);

const Sale = mongoose.model<ISale>('Sale', saleSchema);

export default Sale;
