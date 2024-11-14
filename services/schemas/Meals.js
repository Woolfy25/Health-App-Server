const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const meals = new Schema({
  product: {
    type: String,
    required: [true, "Please set the product name!"],
    minLength: 2,
  },
  weight: {
    type: Number,
    required: [true, "Please set the product weight!"],
    minLength: 2,
  },
  calories: {
    type: Number,
    minLength: 2,
  },
  date: {
    type: Date,
    required: [true, "Please set the product date!"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Meals = mongoose.model("Meals", meals, "meals");

module.exports = Meals;
