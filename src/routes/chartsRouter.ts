import { Router } from "express";

import Middleware from "../utils/middleware";

import {
  getPercentage,
  getLast11Months,
  getLastMonthProfits,
} from "../controllers/chartsController";

const router = Router();

router.get("/", Middleware, getPercentage);
router.get("/last", Middleware, getLast11Months);
router.get("/profits", Middleware, getLastMonthProfits);

export default router;
