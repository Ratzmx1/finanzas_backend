import { Request, Response } from "express";
import { Profit, IProfits } from "../models/profits";
import { Expense, IExpenses } from "../models/expenses";

const getPercentage = async (req: Request, res: Response) => {
  const month = new Date().getMonth() + 1;

  try {
    const prof = await Profit.find({ month }).sort({ createdAt: -1 });
    const exp = await Expense.find({ month }).sort({ createdAt: -1 });

    const total: Array<{ type: string; total: number }> = [
      { type: "Gasto", total: 0 },
    ];
    const keys: Array<string> = ["Gasto"];
    let tot = 0;
    console.log(prof)
    prof.forEach((it) => {
      if (!keys.includes(it.type)) {
        total.push({ type: it.type, total: 0 });
        keys.push(it.type);
      }
      total.forEach((t) => {
        if (t.type === it.type) {
          tot += it.total;
          t.total = t.total + it.total;
          return;
        }
      });
    });

    exp.forEach((it) => {
      total[0].total = total[0].total + it.total;
      tot += it.total;
    });

    return res.json({ data: total, total: tot });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getLast11Months = async (req: Request, res: Response) => {
  const now = new Date();
  let prev = new Date(now.getFullYear() - 1, now.getMonth() + 2, 0);
  let results: Array<{ date: Date; total: number }> = [];
  let total: number;
  try {
    for (let i = 0; i < 12; i++) {
      total = 0;

      const prof = await Profit.find({
        month: prev.getMonth() + 1,
        year: prev.getFullYear(),
      });

      prof.forEach((e) => {
        total += e.total;
      });

      const exp = await Expense.find({
        month: prev.getMonth() + 1,
        year: prev.getFullYear(),
      });

      exp.forEach((e) => {
        total -= e.total;
      });

      results.push({ date: prev, total });

      prev = new Date(prev.getFullYear(), prev.getMonth() + 2, 0);
    }
    return res.json({ date: results });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getLastMonthProfits = async (req: Request, res: Response) => {
  const month = new Date().getMonth() + 1;
  let total = 0;

  try {
    const prof = await Profit.find({ month }).sort({ createdAt: -1 });

    prof.forEach((e) => {
      total += e.total;
    });

    return res.json({ data: prof, total });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getPercentage, getLast11Months, getLastMonthProfits };
