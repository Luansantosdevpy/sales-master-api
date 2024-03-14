import mongoose, { Schema } from 'mongoose';
import ISaleProducts from '../interfaces/modelInterfaces/saleProductInterface';

const saleProductsSchema = new Schema(
  {
    saleId: { type: Schema.Types.ObjectId, ref: 'Sale', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { collection: 'saleProducts' }
);

const SaleProducts = mongoose.model<ISaleProducts>('SaleProducts', saleProductsSchema);

export default SaleProducts;
