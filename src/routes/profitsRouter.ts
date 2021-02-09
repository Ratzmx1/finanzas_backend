import { Router } from "express";

import { createProfit } from "../controllers/profitsController";

const router = Router();

router.post("/", createProfit);

export default router;
