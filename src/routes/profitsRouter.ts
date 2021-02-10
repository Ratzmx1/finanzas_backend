import { Router } from "express";

import {
  createProfit,
  // getProfits,
  // updateProfits,
} from "../controllers/profitsController";

const router = Router();

router.post("/", createProfit);
// router.get("/", getProfits);
// router.post("/update", updateProfits);

export default router;
