import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {PizzaController} from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.8hnfosw.mongodb.net/pizzas?retryWrites=true&w=majority", // change log:pass
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/items/:id", PizzaController.getOne);
app.get("/items?", PizzaController.getWithParams);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK!");
});
