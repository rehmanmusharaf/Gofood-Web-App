const mongoose = require("mongoose");
const mongourl =
  "mongodb+srv://goffood:gofood@cluster0.qlkoag7.mongodb.net/gofood?retryWrites=true&w=majority";

async function mongodb() {
  try {
    await mongoose.connect(mongourl);
    console.log("Connected to MongoDB");
    mongoose.connection.db
      .collection("foodcategory")
      .find({})
      .toArray()
      .then((category) => {
        mongoose.connection.db
          .collection("fooditem")
          .find({})
          .toArray()
          .then((items) => {
            // console.log(items);
            // console.log(category);
            global.foodcategory = category;
            global.fooditems = items;
          });
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log("Error connecting to MongoDB: " + err);
  }
}

module.exports = mongodb;
