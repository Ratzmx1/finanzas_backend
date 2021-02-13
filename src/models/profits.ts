import { Schema, Document, model } from "mongoose";

export interface IProfits {
  createdAt: Date;
  updatedAt?: Date;
  type: string;
  number: number;
  weakOfTheYear: number;
  year: number;
  month: number;
  day: number;
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
  weakOfTheYear: Number,
  year: Number,
  month: Number,
  day: Number,
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
