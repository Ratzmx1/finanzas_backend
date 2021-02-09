// External Libraries
import { Request, Response } from "express";

// Local Modules
import { validateStrings } from "../utils/functions";
import { IProducts, Product } from "../models/products";

const createProduct = async (req: Request, res: Response) => {
  const { name, type } = req.body;

  if (!validateStrings(name) || !validateStrings(type)) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  const data: IProducts = {
    name,
    type,
  };

  const product = new Product(data);

  await product.save();

  res.json({ message: "Product created successfully", data: product });
};

const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();

  return res.json({ data: products });
};

export { createProduct, getProducts };
