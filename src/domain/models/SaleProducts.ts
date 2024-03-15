import mongoose, { Schema } from 'mongoose';
import ISaleTempInterface from '../interfaces/modelInterfaces/saleTempInterface';

const SaleTempSchema = new Schema(
  {
    tableId: { type: Schema.Types.ObjectId, ref: 'Table', required: true },
    itensSale: { type: Array, ref: 'Product', required: true },
    quantity: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { collection: 'saleProducts' }
);

const SaleTemp = mongoose.model<ISaleTempInterface>('SaleTemp', SaleTempSchema);

export default SaleTemp;
