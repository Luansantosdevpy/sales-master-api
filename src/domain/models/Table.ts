import { prop, getModelForClass } from '@typegoose/typegoose';

export class Table {
  @prop({ required: true })
  public table_number!: number;

  @prop({ required: true })
  public table_status!: boolean;
}

const TableModel = getModelForClass(Table);
export default TableModel;
