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

  const date = new Date();

  const data: IProfits = {
    date,
    type,
    number,
    products,
  };

  const profit = new Profit(data);

  await profit.save();

  res.json({ message: "Profit created successfully", data: profit });
};

export { createProfit };
