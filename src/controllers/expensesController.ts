import { Request, Response } from "express";

import { validateStrings, validateProduct } from "../utils/functions";

import { IExpenses, Expense } from "../models/expenses";
import { Balance, IBalance } from "../models/balance";

import { getNumberOfWeek } from "../utils/functions";
import { Cash } from "../models/cash";

const createExpenses = async (req: Request, res: Response) => {
  const {
    provider,
    documentType,
    facture,
    expenseType,
    paymentType,
    paymentDate,
    description,
    products,
  } = req.body;

  let { date } = req.body;

  if (
    !validateStrings(provider) ||
    !validateProduct(products) ||
    !validateStrings(paymentType) ||
    !validateStrings(expenseType) ||
    !validateStrings(documentType) ||
    products.length < 1
  ) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  date = new Date(date);

  const createdAt = date;
  let total = 0;

  products.forEach((element: { price: number; quantity: number }) => {
    total += element.price * element.quantity;
  });

  const data: IExpenses = {
    documentType,
    expenseType,
    paymentDate: paymentDate,
    paymentType,
    createdAt,
    facture,
    products,
    provider,
    total,
    description: description || "",
    year: createdAt.getFullYear(),
    weakOfTheYear: Math.floor(getNumberOfWeek(createdAt)),
    month: createdAt.getMonth() + 1,
    day: createdAt.getDate(),
  };

  const expense = new Expense(data);
  try {
    await expense.save();

    let bal = await Balance.findOne({
      month: createdAt.getMonth() + 1,
      year: createdAt.getFullYear(),
    });

    if (!bal) {
      bal = await Balance.create({
        month: createdAt.getMonth() + 1,
        year: createdAt.getFullYear(),
        total: -total,
      });
    } else {
      await bal.update({ total: bal.total - total });
      await bal.save();
    }
    return res.json({
      message: "Expenses created successfully",
      data: expense,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getExpenses = async (req: Request, res: Response) => {
  const Expenses = await Expense.find().sort({ createdAt: -1 });

  return res.json({ data: Expenses });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

  let total = 0;

  products.forEach((element: { price: number; quantity: number }) => {
    total += element.price * element.quantity;
  });

  try {
    await Expense.findByIdAndUpdate(id, {
      facture,
      products,
      provider,
      total,
      updatedAt: new Date(),
    });
    return res.json({ message: "Expense updated successfully" });
  } catch (error) {
    return res.status(404).json({
      message: "Not Found",
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const geExpenseId = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id) {
    try {
      const data = await Expense.findById(id);
      return res.json({ data });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: "Not Found" });
    }
  }

  return res.status(400).json({ message: "Bad Request" });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const expenseByMonth = async (req: Request, res: Response) => {
  const { data } = req.query;
  const { month, year } = JSON.parse(data as string);

  if (!month || !year) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  try {
    const p = await Expense.find({ month, year }).sort({ createdAt: -1 });
    return res.json({ data: p });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const expensesByDateRange = async (req: Request, res: Response) => {
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
    const p = await Expense.find({
      createdAt: { $gte: i, $lte: f },
    }).sort({ createdAt: -1 });
    return res.json({ data: p });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const expensesByWeek = async (req: Request, res: Response) => {
  const { data } = req.query;
  const { week } = JSON.parse(data as string);

  if (!week) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  try {
    const p = await Expense.find({
      weakOfTheYear: week,
    }).sort({ createdAt: -1 });
    return res.json({ data: p });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const expense = await Expense.findById(id);

    const total = expense?.total || 0;

    let bal = await Balance.findOne({
      month: expense?.month,
      year: expense?.year,
    });

    await Expense.findByIdAndDelete(id);
    await bal?.update({
      total: bal.total + total,
    });

    return res.json({});
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const markAsPaid = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const expense = await Expense.findById(id);
    expense?.set("paymentDate", undefined, { strict: false });

    await expense?.save();
    return res.json({ expense });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createExpenses,
  getExpenses,
  updateExpenses,
  expensesByDateRange,
  expensesByWeek,
  geExpenseId,
  expenseByMonth,
  deleteExpense,
  markAsPaid,
};
