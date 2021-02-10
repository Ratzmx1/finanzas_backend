import { Router } from "express";
import Middleware from "../utils/middleware";

import {
  createProfit,
  getProfit,
  updateProfit,
} from "../controllers/profitsController";

const router = Router();

router.post("/", Middleware, createProfit);
router.get("/", Middleware, getProfit);
router.post("/update", Middleware, updateProfit);

export default router;
