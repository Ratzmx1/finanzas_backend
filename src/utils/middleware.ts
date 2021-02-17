import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/users";

interface tokenInterface {
  name: string;
  lastname: string;
  rut: number;
  id: string;
}

const middleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const auth = authorization.trim().split(" ");

  if (auth[0].toUpperCase() !== "BEARER") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = auth[1];

  try {
    const decoded = jwt.verify(token, "PUNTOFERRETEROXD") as tokenInterface;

    const user = User.findById(decoded.id);

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default middleware;
