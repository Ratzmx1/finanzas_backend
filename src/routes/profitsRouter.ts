import { Router } from "express";
import Middleware from "../utils/middleware";

import {
  createProfit,
  getProfit,
  updateProfit,
  profitByMonth,
  profitByDateRange,
  profitByWeek,
  getProfitId,
  deleteProfit,
} from "../controllers/profitsController";

const router = Router();

router.post("/", Middleware, createProfit);
router.get("/", Middleware, getProfit);
router.get("/byId/:id", Middleware, getProfitId);
router.post("/update", Middleware, updateProfit);
router.post("/delete", Middleware, deleteProfit);
router.get("/month", Middleware, profitByMonth);
router.get("/range", Middleware, profitByDateRange);
router.get("/week", Middleware, profitByWeek);

export default router;
