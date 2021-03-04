import { Router } from "express";

import {
  addExpense,
  addProfit,
  getCash,
  cashByDateRange,
  cashByMonth,
  cashByWeek,
} from "../controllers/cashController";
import middleware from "../utils/middleware";

const router = Router();

router.get("/", middleware, getCash);
router.post("/expense", middleware, addExpense);
router.post("/profit", middleware, addProfit);
router.get("/month", middleware, cashByMonth);
router.get("/range", middleware, cashByDateRange);
router.get("/week", middleware, cashByWeek);

export default router;
