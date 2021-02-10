import { Router } from "express";

import {
  createUser,
  getUsers,
  changePassword,
  login,
} from "../controllers/usersController";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.post("/login", login);

export default router;
