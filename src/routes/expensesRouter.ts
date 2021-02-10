import { Router } from "express";

import Middleware from "../utils/middleware";

import {
  createExpenses,
  getExpenses,
  updateExpenses,
} from "../controllers/expensesController";

const router = Router();

router.post("/", Middleware, createExpenses);
router.get("/", Middleware, getExpenses);
router.post("/update", Middleware, updateExpenses);

export default router;
