// External Libraries
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Local Modules
import { validateStrings } from "../utils/functions";
import { User, IUsers } from "../models/users";

const createUser = async (req: Request, res: Response) => {
  const { lastname, name, password, rut } = req.body;

  if (
    !rut ||
    !validateStrings(name) ||
    !validateStrings(lastname) ||
    !validateStrings(password)
  ) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  const pass = await bcrypt.hashSync(password, 8);

  const data: IUsers = {
    lastname,
    name,
    password: pass,
    rut,
  };

  const user = new User(data);
  await user.save();

  return res.json({
    message: "User created successfully",
    data: { name: user.name, lastname: user.lastname, rut: user.rut },
  });
};

const login = async (req: Request, res: Response) => {
  const { rut, password } = req.body;

  if (!rut) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  const doc = await User.findOne({ rut });

  if (!doc) {
    return res.status(404).json({ message: "Not Found" });
  }
  const result = await bcrypt.compare(password, doc.password);

  if (result) {
    const token = await jwt.sign(
      { name: doc.name, lastname: doc.lastname, rut: doc.rut },
      "PUNTOFERRETEROXD"
    );

    return res.json({
      name: doc.name,
      lastname: doc.lastname,
      rut: doc.rut,
      token,
    });
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

const changePassword = async (req: Request, res: Response) => {
  const { password } = req.body;
};

export { createUser, changePassword, login };
