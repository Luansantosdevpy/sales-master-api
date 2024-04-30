import mongoose, { Schema } from 'mongoose';
import ISale from '../interfaces/modelInterfaces/salesInterface';

const saleSchema = new Schema(
  {
    date: { type: Date, required: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    total: { type: Number },
    itensSale: { type: [String] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    typeOfSale: {
      type: String,
      enum:['pickupOrder','inStoreOrder','tableOrder']
    },
    timeOfSale: {
      type: String,
      enum:['wait','prepare','done']
    }
  },
  { collection: 'sales' }
);

const Sale = mongoose.model<ISale>('Sale', saleSchema);

export default Sale;
