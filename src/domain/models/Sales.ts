import { prop, getModelForClass, modelOptions, Ref, Severity } from '@typegoose/typegoose';
import { Client } from './Client';

@modelOptions({
  schemaOptions: {
    collection: 'sales',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Sale {
  @prop({ required: true })
  public date!: Date;

  @prop({ ref: () => Client })
  public clientId?: Ref<Client>;

  @prop()
  public total?: number;

  @prop({ type: () => [String] })
  public itensSale?: string[];

  @prop({ default: Date.now })
  public createdAt?: Date;

  @prop({ default: Date.now })
  public updatedAt?: Date;
}

const SaleModel = getModelForClass(Sale);
export default SaleModel;
