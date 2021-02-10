import { Schema, Document, model } from "mongoose";

export interface IExpenses {
  provider: string;
  facture: number;
  createdAt: Date;
  updatedAt?: Date;
  products: [
    {
      name: string;
      quantity: number;
      price: number;
    }
  ];
  total: number;
}

const expensesSchema = new Schema({
  provider: String,
  facture: Number,
  createdAt: Date,
  updatedAt: Date,
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  total: Number,
});

interface IExpensesExtend extends IExpenses, Document {}

export const Expense = model<IExpensesExtend>("expenses", expensesSchema);
