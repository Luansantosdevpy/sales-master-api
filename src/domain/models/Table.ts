import { Schema, model } from 'mongoose';
import ITable from '../interfaces/modelInterfaces/tableInterface';

const TableSchema: Schema = new Schema({
  table_number: { type: Number, required: true },
  table_status: { type: Boolean, required: true }
});

const Table = model<ITable>('Table', TableSchema);

export default Table;