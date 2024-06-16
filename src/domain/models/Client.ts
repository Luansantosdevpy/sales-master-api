import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'clients',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Client {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public phone_number!: string;

  @prop({ required: true })
  public cpf!: string;

  @prop({ required: true })
  public address!: string;

  @prop({ required: true })
  public postal_code!: string;

  @prop({ required: true })
  public address_number!: number;

  @prop()
  public complement?: string;

  @prop({ required: true })
  public province!: string;

  @prop({ required: true })
  public city!: string;

  @prop({ required: true })
  public uf!: string;

  @prop({ default: Date.now })
  public createdAt?: Date;

  @prop({ default: Date.now })
  public updatedAt?: Date;
}

const ClientModel = getModelForClass(Client);
export default ClientModel;
