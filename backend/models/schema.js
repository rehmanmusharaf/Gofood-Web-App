const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const userschema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
    required: true,
  },
  location: {
    type: String,
    minLength: 20,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userschema);
