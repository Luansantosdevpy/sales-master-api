import { prop, getModelForClass, Ref, modelOptions, Severity } from '@typegoose/typegoose';
import { Category } from './Category';

@modelOptions({
  schemaOptions: {
    collection: 'products',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Product {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true })
  public productStock!: number;

  @prop()
  public sku?: string;

  @prop({ required: true, ref: () => Category })
  public categoryId!: Ref<Category>;

  @prop({ required: true })
  public provider!: string;

  @prop({ required: true })
  public active!: boolean;

  @prop({ required: true })
  public image!: string;

  @prop()
  public attributes?: string;

  @prop({ default: Date.now })
  public createdAt?: Date;

  @prop({ default: Date.now })
  public updatedAt?: Date;
}

const ProductModel = getModelForClass(Product);
export default ProductModel;