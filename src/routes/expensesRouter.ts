import { Router } from "express";

import {
  createExpenses,
  getExpenses,
  updateExpenses,
} from "../controllers/expensesController";

const router = Router();

router.post("/", createExpenses);
router.get("/", getExpenses);
router.post("/update", updateExpenses);

export default router;
