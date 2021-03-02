import { Request, Response } from "express";

import { Cash, ICash } from "../models/cash";

const addExpense = async (req: Request, res: Response) => {
  const { description, cargo } = req.body;

  try {
    const prevCash = await Cash.find().sort({ createdAt: -1 });
    const balance =
      prevCash && prevCash[0] ? prevCash[0].balance - cargo : -cargo;

    if (balance < 0) {
      return res
        .status(400)
        .json({ message: "No puede haber saldo negativo en la cartera" });
    }

    const data: ICash = {
      balance,
      createdAt: new Date(),
      description,
      type: "Cargo",
      cargo,
    };
    await Cash.create(data);
    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addProfit = async (req: Request, res: Response) => {
  const { description, abono } = req.body;

  try {
    const prevCash = await Cash.find().sort({ createdAt: -1 });

    const data: ICash = {
      balance: prevCash && prevCash[0] ? prevCash[0].balance + abono : abono,
      createdAt: new Date(),
      description,
      type: "Cargo",
      abono,
    };
    await Cash.create(data);
    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCash = async (req: Request, res: Response) => {
  try {
    const data = await Cash.find().sort({ createdAt: -1 });
    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { addExpense, addProfit, getCash };
