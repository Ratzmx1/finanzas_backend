import express from "express";
import mongoose from "mongoose";

import { Example, IExample } from "./models/exampleModel";

const app = express();

const port = process.env.PORT || 8000;

const dbname = process.env.DBNAME || "test";

const mongooseURL = `mongodb+srv://admin:admin@cluster0.y28gj.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(mongooseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  const data: IExample = {
    name: "EJEMPLO",
    fecha: new Date(),
    productos: [{ name: "wea 1", cantidad: 5 }],
  };
  const example = new Example(data);
  example.save();
  return res.json({ example });
});

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
