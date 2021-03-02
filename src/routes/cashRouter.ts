import { Router } from "express";

import { addExpense, addProfit, getCash } from "../controllers/cashController";
import middleware from "../utils/middleware";

const router = Router();

router.get("/", middleware, getCash);
router.post("/expense", middleware, addExpense);
router.post("/profit", middleware, addProfit);

export default router;
