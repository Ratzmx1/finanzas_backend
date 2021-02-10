import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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
    const decoded = jwt.verify(token, "PUNTOFERRETEROXD");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default middleware;
