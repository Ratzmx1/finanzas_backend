import { Schema, Document, model } from "mongoose";

export interface IUsers {
  rut: number;
  name: string;
  lastname: string;
  password: string;
}

const usersSchema = new Schema({
  rut: Number,
  name: String,
  lastname: String,
  password: String,
});

interface IUsersExtend extends IUsers, Document {}

export const User = model<IUsersExtend>("users", usersSchema);
