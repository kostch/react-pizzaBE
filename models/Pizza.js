import mongoose from "mongoose";

const PizzaSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    types: {
      type: Array,
    },
    sizes: {
      type: Array,
    },
    price: {
      type: Number,
    },
    category: {
      type: Number,
    },
    rating: {
      type: Number,
    },
  }
);

export default mongoose.model("Pizza", PizzaSchema);
