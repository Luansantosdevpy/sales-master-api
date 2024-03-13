import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/modelInterfaces/userInterface';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    cpf: { type: String, required: true },
    password: { type: String, required: true },
    confirm_password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, alias: 'created_at' },
    updatedAt: { type: Date, default: Date.now, alias: 'updated_at' }
  },
  { collection: 'users' } // Define o nome da coleção no MongoDB
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
