import { Document } from 'mongoose';

export default interface IPermission extends Document {
  permissionName: string;
  entity: string;
  operation: string[];
  createdAt?: Date;
  updatedAt?: Date;
}