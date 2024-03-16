import { Document } from "mongoose";

export default interface IRole extends Document {
    name: String,
    permissions: String[],
    createdAt?: Date;
    updatedAt?: Date;
}