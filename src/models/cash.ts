import { Schema, Document, model } from "mongoose";

export interface ICash {
  type: string;
  balance: number;
  createdAt: Date;
  description: string;
  abono?: number;
  cargo?: number;
  weakOfTheYear: number;
  year: number;
  month: number;
  day: number;
}

const cashSchema = new Schema({
  type: String,
  balance: Number,
  createdAt: Date,
  description: String,
  abono: { type: Number, default: 0 },
  cargo: { type: Number, default: 0 },
  weakOfTheYear: Number,
  year: Number,
  month: Number,
  day: Number,
});

interface ICashExtended extends ICash, Document {}

export const Cash = model<ICashExtended>("cash", cashSchema);
