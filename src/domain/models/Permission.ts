import { Schema, model } from 'mongoose';
import IPermission from '../interfaces/modelInterfaces/permissionInteface';

const permissionSchema: Schema = new Schema({
  permissionName: { type: String, required: true },
  entity: { type: String, required: true },
  operation: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Permission = model<IPermission>('Permission', permissionSchema);

export default Permission;
