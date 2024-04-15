import mongoose, { Schema } from 'mongoose';
import IStock from '../interfaces/modelInterfaces/stockInterface';

const stockSchema: Schema = new Schema({
  productsName: { type: String, required: true },
  description: { type: String },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantityAvailable: { type: Number, required: true },
  quantity: { type: Number, required: true },
  retailPrice: { type: Number, required: true },
  provider: { type: String, required: true },
  expirationDate: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Stock = mongoose.model<IStock>('Stock', stockSchema);

export default Stock;
