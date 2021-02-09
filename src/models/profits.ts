import { Schema, Document, model } from "mongoose";

export interface IProfits {
  date: Date;
  type: string;
  number: number;
  products: [
    {
      name: string;
      quantity: number;
      price: number;
    }
  ];
}

const profitsSchema = new Schema({
  date: Date,
  type: String,
  number: Number,
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
});

interface IProfitsExtend extends IProfits, Document {}

export const Profit = model<IProfitsExtend>("profits", profitsSchema);
