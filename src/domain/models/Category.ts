import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'categories',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Category {
  @prop({ required: true })
  public category_name!: string;

  @prop({ required: true })
  public description!: string;

  @prop()
  public category_image?: string;

  @prop()
  public category_icon?: string;

  @prop({ default: Date.now })
  public createdAt?: Date;

  @prop({ default: Date.now })
  public updatedAt?: Date;
}

const CategoryModel = getModelForClass(Category);
export default CategoryModel;
