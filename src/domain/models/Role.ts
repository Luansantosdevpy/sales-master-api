import { prop, getModelForClass, modelOptions, Ref, Severity } from '@typegoose/typegoose';
import { Permission } from './Permission';

@modelOptions({
  schemaOptions: {
    collection: 'roles',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Role {
  @prop({ required: true, unique: true })
  public name!: string;

  @prop({ ref: () => Permission })
  public permissions?: Ref<Permission>[];

  @prop({ default: Date.now })
  public createdAt?: Date;

  @prop({ default: Date.now })
  public updatedAt?: Date;
}

const RoleModel = getModelForClass(Role);
export default RoleModel;
