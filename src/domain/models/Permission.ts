import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'permissions',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Permission {
  @prop({ required: true })
  public permissionName!: string;

  @prop({ required: true })
  public entity!: string;

  @prop({ required: true, type: () => [String] })
  public operation!: string[];

  @prop({ default: Date.now })
  public createdAt?: Date;

  @prop({ default: Date.now })
  public updatedAt?: Date;
}

const PermissionModel = getModelForClass(Permission);
export default PermissionModel;
