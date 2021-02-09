import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";

import ProductRouter from "./routes/productsRouter";
import ProfitRouter from "./routes/profitsRouter";
import ExpenseRouter from "./routes/expensesRouter";

const app = express();
const port = process.env.PORT || 8000;
const dbname = process.env.DBNAME || "test";
const mongooseURL = `mongodb+srv://admin:admin@cluster0.y28gj.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(mongooseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyparser.json());

app.use("/products", ProductRouter);
app.use("/profits", ProfitRouter);
app.use("/expenses", ExpenseRouter);

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
