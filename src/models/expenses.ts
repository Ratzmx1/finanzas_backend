import { Schema, Document, model } from "mongoose";

export interface IExpenses {
  provider: string;
  facture: number;
  date: Date;
  products: [
    {
      name: string;
      quantity: number;
      price: number;
    }
  ];
}

const expensesSchema = new Schema({
  provider: String,
  facture: Number,
  date: Date,
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
});

interface IExpensesExtend extends IExpenses, Document {}

export const Expenses = model<IExpensesExtend>("expenses", expensesSchema);
