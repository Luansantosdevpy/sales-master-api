import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public cpf!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true })
  public confirm_password!: string;

  @prop({ default: Date.now, alias: 'created_at' })
  public createdAt?: Date;

  @prop({ default: Date.now, alias: 'updated_at' })
  public updatedAt?: Date;
}

const UserModel = getModelForClass(User);
export default UserModel;
