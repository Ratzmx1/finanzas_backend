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

  const createdAt = new Date();
  const updatedAt = new Date();
  let total = 0;

  products.forEach((element: { price: number; quantity: number }) => {
    total += element.price * element.quantity;
  });

  const data: IExpenses = {
    createdAt,
    updatedAt,
    facture,
    products,
    provider,
    total,
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
  const updatedAt = new Date();

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
    await Expense.findByIdAndUpdate(id, {
      facture,
      products,
      provider,
      updatedAt,
    });
    return res.json({ message: "Expense updated successfully" });
  } catch (error) {
    return res.status(404).json({
      message: "Not Found",
    });
  }
};

export { createExpenses, getExpenses, updateExpenses };
