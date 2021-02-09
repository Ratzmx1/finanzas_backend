import { Router } from "express";

import { createExpenses } from "../controllers/expensesController";

const router = Router();

router.post("/", createExpenses);

export default router;
