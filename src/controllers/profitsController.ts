import { Request, Response, Router } from "express";

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

  function days_passed(dt: Date) {
    let current = new Date();
    let previous = new Date(dt.getFullYear(), 0, 1);

    return Math.ceil((current.getTime() - previous.getTime() + 1) / 86400000);
  }

  const data: IProfits = {
    createdAt,
    type,
    number,
    products,
    total,
    year: createdAt.getFullYear(),
    weakOfTheYear: Math.floor(days_passed(createdAt) / 7),
    month: createdAt.getMonth() + 1,
    day: createdAt.getDate(),
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

const profitByMonth = async (req: Request, res: Response) => {
  const { month } = req.body;

  if (!month) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  try {
    const p = await Profit.find({ month });
    return res.json({ profits: p });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const profitByDateRange = async (req: Request, res: Response) => {
  const { dateI, dateF } = req.body;

  if (!dateI || !dateF) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }
  const i = new Date(dateI);
  const f = new Date(dateF);
  try {
    const p = await Profit.find({
      createdAt: { $gte: i, $lte: f },
    });
    return res.json({ profits: p });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const profitByWeek = async (req: Request, res: Response) => {
  const { week } = req.body;

  if (!week) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }
  try {
    const p = await Profit.find({
      weakOfTheYear: week,
    });
    return res.json({ profits: p });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createProfit,
  getProfit,
  updateProfit,
  profitByMonth,
  profitByDateRange,
  profitByWeek,
};
profitByWeek;
