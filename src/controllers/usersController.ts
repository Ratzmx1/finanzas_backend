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
  try {
    const existe = await User.exists({ rut });
    if (existe) {
      return res.status(409).json({ message: "User already created" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
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

  const token = await jwt.sign(
    { name: user.name, lastname: user.lastname, rut: user.rut, id: user.id },
    "PUNTOFERRETEROXD",
    { expiresIn: 60 * 60 * 24 }
  );
  return res.json({
    message: "User created successfully",
    data: {
      user: {
        name: user.name,
        lastname: user.lastname,
        rut: user.rut,
        id: user.id,
      },
      token,
    },
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
      { name: doc.name, lastname: doc.lastname, rut: doc.rut, id: doc.id },
      "PUNTOFERRETEROXD",
      { expiresIn: 60 * 60 * 24 }
    );

    return res.json({
      user: {
        name: doc.name,
        lastname: doc.lastname,
        rut: doc.rut,
        id: doc.id,
      },
      token,
    });
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

const changePassword = async (req: Request, res: Response) => {
  const { password } = req.body;

  try {
    const pass = bcrypt.hashSync(password, 8);
    const user = User.findByIdAndUpdate(req.user.id, { password: pass });
    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
  }
};

export { createUser, changePassword, login };
