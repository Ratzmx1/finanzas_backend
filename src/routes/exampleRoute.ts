import express from "express";
import { exampleRotue } from "../controllers/controllerExample";

const router = express.Router();

router.get("/", exampleRotue);

export default router;
