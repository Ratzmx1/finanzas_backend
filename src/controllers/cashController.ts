import { Request, Response } from "express";

import { Cash, ICash } from "../models/cash";

import { getNumberOfWeek } from "../utils/functions";

const addExpense = async (req: Request, res: Response) => {
  const { description, value } = req.body;

  try {
    const prevCash = await Cash.find().sort({ createdAt: -1 });
    const balance =
      prevCash && prevCash[0] ? prevCash[0].balance - value : -value;

    if (balance < 0) {
      return res
        .status(400)
        .json({ message: "No puede haber saldo negativo en la cartera" });
    }
    const createdAt = new Date();

    const data: ICash = {
      balance,
      createdAt: new Date(),
      description,
      type: "Cargo",
      cargo: value,
      year: createdAt.getFullYear(),
      weakOfTheYear: Math.floor(getNumberOfWeek(createdAt)),
      month: createdAt.getMonth() + 1,
      day: createdAt.getDate(),
    };
    await Cash.create(data);
    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addProfit = async (req: Request, res: Response) => {
  const { description, value } = req.body;

  try {
    const prevCash = await Cash.find().sort({ createdAt: -1 });
    const createdAt = new Date();
    const data: ICash = {
      balance: prevCash && prevCash[0] ? prevCash[0].balance + value : value,
      createdAt: new Date(),
      description,
      type: "Abono",
      abono: value,
      year: createdAt.getFullYear(),
      weakOfTheYear: Math.floor(getNumberOfWeek(createdAt)),
      month: createdAt.getMonth() + 1,
      day: createdAt.getDate(),
    };
    await Cash.create(data);
    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCash = async (req: Request, res: Response) => {
  try {
    const data = await Cash.find().sort({ createdAt: -1 }).limit(50);
    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//////////////////////////////////////////////////////////////////////////////////////

const cashByMonth = async (req: Request, res: Response) => {
  const { data } = req.query;
  const { month, year } = JSON.parse(data as string);

  if (!month || !year) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  try {
    const p = await Cash.find({ month, year }).sort({ createdAt: -1 });
    return res.json({ data: p });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const cashByDateRange = async (req: Request, res: Response) => {
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
    const p = await Cash.find({
      createdAt: { $gte: i, $lte: f },
    }).sort({ createdAt: -1 });
    return res.json({ data: p });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const cashByWeek = async (req: Request, res: Response) => {
  const { data } = req.query;
  const { week } = JSON.parse(data as string);

  if (!week) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  try {
    const p = await Cash.find({
      weakOfTheYear: week,
    }).sort({ createdAt: -1 });
    return res.json({ data: p });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  addExpense,
  addProfit,
  getCash,
  cashByDateRange,
  cashByMonth,
  cashByWeek,
};
