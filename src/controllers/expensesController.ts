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

const getExpenses = async (req: Request, res: Response) => {
  const Expenses = await Expense.find();

  return res.json({ data: Expenses });
};

const updateExpenses = async (req: Request, res: Response) => {
  const { id, facture, products, provider } = req.body;

  if (
    !validateStrings(id) ||
    !facture ||
    !validateStrings(provider) ||
    !validateProduct(products)
  ) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }
  try {
    await Expense.findByIdAndUpdate(id, { facture, products, provider });
    return res.json({ message: "Expense updated successfully" });
  } catch (error) {
    return res.status(404).json({
      message: "Not Found",
    });
  }
};

export { createExpenses, getExpenses, updateExpenses };
