const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const orderschema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validator(value) {
      if (!value.isEmail()) {
        throw new Error("Invalid Email");
      }
    },
  },
  Orderdata: {
    type: Array,
    required: true,
  },
});
module.exports = mongoose.model("Myorder", orderschema);
