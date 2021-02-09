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

const getProfits = async (req: Request, res: Response) => {
  const profits = await Profit.find();

  return res.json({ data: profits });
};

const updateProfits = async (req: Request, res: Response) => {
  const { id, type, number, products } = req.body;

  if (
    !validateStrings(id) ||
    !validateStrings(type) ||
    !number ||
    !validateProduct(products)
  ) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }
  try {
    await Profit.findByIdAndUpdate(id, { type, number, products });
    return res.json({ message: "Profit updated successfully" });
  } catch (error) {
    return res.status(404).json({
      message: "Not Found",
    });
  }
};

export { createProfit, getProfits, updateProfits };
