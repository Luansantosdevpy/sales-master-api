import { Document } from "mongoose";

export default interface IRole extends Document {
    name: string,
    permissions: string[],
    createdAt?: Date;
    updatedAt?: Date;
}