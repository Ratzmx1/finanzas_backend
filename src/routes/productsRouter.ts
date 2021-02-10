import { Router } from "express";
import Middleware from "../utils/middleware";

import {
  createProduct,
  getProducts,
  updateProducts,
} from "../controllers/productsController";

const router = Router();

router.post("/", Middleware, createProduct);
router.get("/", Middleware, getProducts);
router.post("/update", Middleware, updateProducts);

export default router;
