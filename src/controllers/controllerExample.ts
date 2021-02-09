import { Request, Response } from "express";
import { Example, IExample } from "../models/exampleModel";

const exampleRotue = async (req: Request, res: Response) => {
  const data: IExample = {
    name: "EJEMPLO",
    fecha: new Date(),
    productos: [{ name: "wea 1", cantidad: 5 }],
  };

  const example = new Example(data);
  await example.save();
  return res.json({ example });
};

function otherExampleRotue(req: Request, res: Response) {}

export { exampleRotue, otherExampleRotue };
