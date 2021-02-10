import { Router } from "express";
import Middleware from "../utils/middleware";

import {
  createUser,
  changePassword,
  login,
} from "../controllers/usersController";

const router = Router();

router.post("/register", createUser);
router.post("/login", login);
router.post("/change/password", Middleware, changePassword);

export default router;
