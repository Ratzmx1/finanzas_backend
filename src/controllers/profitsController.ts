import { Request, Response } from "express";

import { validateStrings, validateProduct } from "../utils/functions";
import { IProfits, Profit } from "../models/profits";

const createProfit = async (req: Request, res: Response) => {
  const { type, number, products } = req.body;

  if (!number || !validateStrings(type) || !validateProduct(products)) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  const createdAt = new Date();

  let total = 0;

  products.forEach((element: { price: number; quantity: number }) => {
    total += element.price * element.quantity;
  });

  const data: IProfits = {
    createdAt,
    type,
    number,
    products,
    total,
  };

  const profit = new Profit(data);

  await profit.save();

  res.json({ message: "Profit created successfully", data: profit });
};

const getProfit = async (req: Request, res: Response) => {
  const Profits = await Profit.find();

  return res.json({ data: Profits });
};

const updateProfit = async (req: Request, res: Response) => {
  const { id, type, number, products } = req.body;

  if (
    !validateStrings(id) ||
    !number ||
    !validateStrings(type) ||
    !validateProduct(products)
  ) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }
  try {
    await Profit.findByIdAndUpdate(id, {
      type,
      number,
      products,
      updatedAt: new Date(),
    });

    return res.json({ message: "Profit updated successfully" });
  } catch (error) {
    return res.status(404).json({
      message: "Not Found",
    });
  }
};

export { createProfit, getProfit, updateProfit };
