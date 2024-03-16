import { Schema, model } from 'mongoose';
import IRole from '../interfaces/modelInterfaces/roleInterface';

const roleSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: Array, ref: 'Permission' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Role = model<IRole>('Role', roleSchema);

export default Role;
