import { Schema, Document, model } from "mongoose";

export interface ICash {
  type: string;
  balance: number;
  createdAt: Date;
  description: string;
  abono?: number;
  cargo?: number;
}

const cashSchema = new Schema({
  type: String,
  balance: Number,
  createdAt: Date,
  description: String,
  abono: { type: Number, default: 0 },
  cargo: { type: Number, default: 0 },
});

interface ICashExtended extends ICash, Document {}

export const Cash = model<ICashExtended>("cash", cashSchema);
