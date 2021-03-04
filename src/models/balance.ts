import { Schema, Document, model } from "mongoose";

export interface IBalance {
  total: number;
  month: number;
  year: number;
}

const balanceSchema = new Schema({
  total: { required: true, type: Number, default: 0 },
  month: Number,
  year: Number,
});

interface IBalanceExtended extends IBalance, Document {}

export const Balance = model<IBalanceExtended>("balance", balanceSchema);
