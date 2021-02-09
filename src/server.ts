import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";

// Routes
import UserRouter from "./routes/usersRouter";
import ProfitRouter from "./routes/profitsRouter";
import ExpenseRouter from "./routes/expensesRouter";
import ProductRouter from "./routes/productsRouter";

// App Configuration
const app = express();
const port = process.env.PORT || 8000;
const dbname = process.env.DBNAME || "test";
const mongooseURL = `mongodb+srv://admin:admin@cluster0.y28gj.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(mongooseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyparser.json());

// App Routers
app.use("/users", UserRouter);
app.use("/profits", ProfitRouter);
app.use("/expenses", ExpenseRouter);
app.use("/products", ProductRouter);

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
