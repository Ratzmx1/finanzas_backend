import { Request, Response } from "express";

import { validateStrings, validateProduct } from "../utils/functions";

import { IExpenses, Expense } from "../models/expenses";

const createExpenses = async (req: Request, res: Response) => {
  const { facture, products, provider } = req.body;

  if (!facture || !validateStrings(provider) || !validateProduct(products)) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  const date = new Date();

  const data: IExpenses = {
    date,
    facture,
    products,
    provider,
  };

  const Expenses = new Expense(data);

  await Expenses.save();

  res.json({ message: "Expenses created successfully", data: Expenses });
};

export { createExpenses };
