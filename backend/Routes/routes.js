const express = require("express");
const routes = express();
const userschema = require("../models/schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const orderschema = require("../models/Orderschema");

require("dotenv").config();

const passwordValidator =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,}$/;

function validatePassword(password) {
  return passwordValidator.test(password);
}

routes.get("/", (req, res) => {
  res.send("hello");
});

routes.post("/api/createuser", async (req, res) => {
  if (!validatePassword(req.body.password)) {
    res.status(400).json({ success: false });
    console.log("error...");
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    console.log("salt is " + salt);
    const secpassword = await bcrypt.hash(req.body.password, salt);
    console.log("passwor is" + secpassword);
    const result = await userschema.create({
      name: req.body.name,
      email: req.body.email,
      password: secpassword,
      location: req.body.location,
    });
    res.json({ success: true });
    console.log(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
    // res.send(err)
  }
});
routes.post("/api/login", async (req, res) => {
  try {
    const response = await userschema.findOne({
      email: req.body.email,
    });

    if (response) {
      const result = await bcrypt.compare(req.body.password, response.password);

      if (!result) {
        res.status(400).json({ success: false });
        return;
      } else {
        // console.log(response);
        let token = jwt.sign(
          { user: { id: response.id } },
          process.env.secret_key
        );

        res.json({ success: true, token });
        console.log("after response code also run!");
      }
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.json({ success: false });
    console.log(error);
  }
});
routes.get("/api/getfood", (req, res) => {
  // console.log("api end point hit");
  try {
    res.json([global.fooditems, global.foodcategory]);
    // console.log(global.foodcategory);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});
routes.post("/api/addtocart", async (req, res) => {
  console.log("api end point hit");
  try {
    const resp = await orderschema.findOne({ email: req.body.email });
    // console.log(resp);
    if (resp == null) {
      console.log("if Case Run");

      const response = await orderschema.create({
        email: req.body.email,
        Orderdata: req.body.Order_data,
      });
      response ? res.json({ success: true }) : res.json({ success: false });
    } else {
      console.log("Else Case Run !");
      const response = await orderschema.findOneAndUpdate(
        { email: req.body.email },
        {
          Orderdata: req.body.Order_data,
        }
      );
      response ? res.json({ success: true }) : res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

routes.put("/api/removeitem", async (req, res) => {
  // console.log("api End Point Hit!");
  try {
    const resp = await orderschema.findOne({ email: req.body.email });
    if (resp != null) {
      const response = await orderschema.findOneAndUpdate(
        { email: req.body.email },
        {
          Orderdata: req.body.Order_data,
        }
      );
      response ? res.json({ success: true }) : res.json({ success: false });
    } else {
      res.status(400).send("with this email data doesn't exist");
    }
  } catch (error) {
    console.log(error);
  }
});
routes.post("/api/getdata", async (req, res) => {
  try {
    const resp = await orderschema.findOne({ email: req.body.email });
    if (resp != null) {
      const response = await orderschema.findOne({ email: req.body.email });
      response
        ? res.json({ cartdata: response.Orderdata })
        : res.json({ success: false });
    } else {
      res.status(400).send("with this email data doesn't exist");
    }
  } catch (error) {
    console.log(error);
  }
});
routes.put("/api/checkout", async (req, res) => {
  try {
    const resp = await orderschema.findOne({ email: req.body.email });
    if (resp != null) {
      const response = await orderschema.findOneAndUpdate({
        email: req.body.email,
        Orderdata: req.body.Order_data,
      });
      response
        ? res.json({ cartdata: [], success: true })
        : res.json({ success: false });
    } else {
      res.status(400).send("Checkout Failed email not exist!");
    }
  } catch (error) {
    res.status(400).send("Error during checkout!");
  }
});
module.exports = routes;
