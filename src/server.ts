import express from "express";
import mongoose from "mongoose";

import ExampleRouter from "./routes/exampleRoute";

const app = express();

const port = process.env.PORT || 8000;

const dbname = process.env.DBNAME || "test";

const mongooseURL = `mongodb+srv://admin:admin@cluster0.y28gj.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(mongooseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/example", ExampleRouter);

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
