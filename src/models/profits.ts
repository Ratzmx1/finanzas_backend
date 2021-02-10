import { Schema, Document, model } from "mongoose";

export interface IProfits {
  createdAt: Date;
  updatedAt?: Date;
  type: string;
  number: number;
  products: [
    {
      name: string;
      quantity: number;
      price: number;
    }
  ];
  total: number;
}

const profitsSchema = new Schema({
  createdAt: Date,
  updatedAt: Date,
  type: String,
  number: Number,
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  total: Number,
});

interface IProfitsExtend extends IProfits, Document {}

export const Profit = model<IProfitsExtend>("profits", profitsSchema);
