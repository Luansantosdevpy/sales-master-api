import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'providers',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Provider {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public cnpj!: string;

  @prop({ required: true })
  public corporate_name!: string;

  @prop({ required: true })
  public fantasy_name!: string;

  @prop({ required: true })
  public phone_number!: string;

  @prop({ required: true })
  public postal_code!: string;

  @prop({ required: true })
  public address!: string;

  @prop()
  public complement?: string;

  @prop({ required: true })
  public address_number!: string;

  @prop({ required: true })
  public province!: string;

  @prop({ required: true })
  public city!: string;

  @prop({ required: true })
  public uf!: string;

  @prop({ required: true })
  public active!: boolean;

  @prop({ default: Date.now })
  public createdAt?: Date;

  @prop({ default: Date.now })
  public updatedAt?: Date;
}

const ProviderModel = getModelForClass(Provider);
export default ProviderModel;
