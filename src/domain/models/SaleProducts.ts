import { prop, getModelForClass, modelOptions, Ref, Severity } from '@typegoose/typegoose';
import { Table } from './Table';
import { Product } from './Product';

@modelOptions({
  schemaOptions: {
    collection: 'saleProducts',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class SaleTemp {
  @prop({ required: true, ref: () => Table })
  public tableId!: Ref<Table>;

  @prop({ required: true, ref: () => Product })
  public itensSale!: Ref<Product>[];

  @prop()
  public quantity?: number;

  @prop({ default: Date.now })
  public createdAt?: Date;

  @prop({ default: Date.now })
  public updatedAt?: Date;
}

const SaleTempModel = getModelForClass(SaleTemp);
export default SaleTempModel;
