import { Router } from "express";

import {
  createProduct,
  getProducts,
  updateProducts,
} from "../controllers/productsController";

const router = Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.post("/update", updateProducts);

export default router;
