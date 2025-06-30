const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
});

module.exports = mongoose.model("transactions", formSchema);
