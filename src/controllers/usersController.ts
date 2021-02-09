// External Libraries
import { Request, Response } from "express";
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

  const pass = await bcrypt.hashSync(password, "PRIVATEKEY");

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

export { createUser };
