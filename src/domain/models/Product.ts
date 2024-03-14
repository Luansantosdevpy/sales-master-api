import mongoose, { Schema } from 'mongoose';
import IProduct from '../interfaces/modelInterfaces/productInterface';

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    productStock: { type: Number, required: true },
    sku: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    provider: { type: String, required: true },
    active: { type: Boolean, required: true },
    image: { type: String, required: true },
    attributes: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { collection: 'products' }
);

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
