import { Schema, Document, model } from "mongoose";

export interface IProducts {
  name: string;
  type: string;
}

const productsSchema = new Schema({
  name: String,
  type: String,
});

interface IProductsExtend extends IProducts, Document {}

export const Product = model<IProductsExtend>("products", productsSchema);
