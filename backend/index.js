const express = require("express");
const userschema = require("./models/schema");
const routes = require("./Routes/routes");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
const mongodb = require("./db");
mongodb();

app.get("/", routes);
app.post("/api/createuser", routes);
app.post("/api/login", routes);
app.get("/api/getfood", routes);
app.post("/api/addtocart", routes);
app.put("/api/removeitem", routes);
app.post("/api/getdata", routes);
app.put("/api/checkout", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
