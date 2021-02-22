import { Router } from "express";

import Middleware from "../utils/middleware";

import {
  createExpenses,
  getExpenses,
  updateExpenses,
  expenseByMonth,
  expensesByDateRange,
  expensesByWeek,
  geExpenseId,
  deleteExpense,
} from "../controllers/expensesController";

const router = Router();

router.post("/", Middleware, createExpenses);
router.get("/", Middleware, getExpenses);
router.post("/update", Middleware, updateExpenses);
router.post("/delete", Middleware, deleteExpense);
router.get("/month", Middleware, expenseByMonth);
router.get("/range", Middleware, expensesByDateRange);
router.get("/week", Middleware, expensesByWeek);
router.get("/byId/:id", Middleware, geExpenseId);

export default router;
