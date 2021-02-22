import { request, Request, Response, Router } from "express";

import { validateStrings, validateProduct } from "../utils/functions";
import { IProfits, Profit } from "../models/profits";

const createProfit = async (req: Request, res: Response) => {
  const { type, number, products, description } = req.body;

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

  function getNumberOfWeek() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (today.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear - firstDayOfYear.getDay() + 1) / 7);
  }

  const data: IProfits = {
    createdAt,
    type,
    number,
    products,
    total,
    description: description || "",
    year: createdAt.getFullYear(),
    weakOfTheYear: Math.floor(getNumberOfWeek()),
    month: createdAt.getMonth() + 1,
    day: createdAt.getDate(),
  };

  const profit = new Profit(data);

  await profit.save();

  res.json({ message: "Profit created successfully", data: profit });
};

const getProfit = async (req: Request, res: Response) => {
  try {
    const Profits = await Profit.find().sort({ createdAt: -1 }).limit(50);
    return res.json({ data: Profits });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProfitId = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id) {
    try {
      const Profits = await Profit.findById(id);
      return res.json({ data: Profits });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: "Not Found" });
    }
  }

  return res.status(400).json({ message: "Bad Request" });
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
    console.error(error);
    return res.status(404).json({
      message: "Not Found",
    });
  }
};

const deleteProfit = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    await Profit.findByIdAndDelete(id);
    return res.json({});
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const profitByMonth = async (req: Request, res: Response) => {
  const { data } = req.query;
  const { month, year } = JSON.parse(data as string);

  if (!month || !year) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  try {
    const p = await Profit.find({ month, year }).sort({ createdAt: -1 });
    return res.json({ profits: p });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const profitByDateRange = async (req: Request, res: Response) => {
  const { data } = req.query;
  const { dateI, dateF } = JSON.parse(data as string);

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
    }).sort({ createdAt: -1 });
    return res.json({ profits: p });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const profitByWeek = async (req: Request, res: Response) => {
  const { data } = req.query;
  const { week } = JSON.parse(data as string);

  if (!week) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  try {
    const p = await Profit.find({
      weakOfTheYear: week,
    }).sort({ createdAt: -1 });
    return res.json({ profits: p });
  } catch (error) {
    console.error(error);
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
  getProfitId,
  deleteProfit,
};
