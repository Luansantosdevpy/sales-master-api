import mongoose, { Schema } from 'mongoose';
import ICategory from '../interfaces/modelInterfaces/categoryInterface';

const categorySchema = new Schema(
  {
    category_name: { type: String, required: true },
    description: { type: String, required: true },
    category_image: { type: String },
    category_icon: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { collection: 'categories' }
);

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
