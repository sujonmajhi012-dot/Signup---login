const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./models/db");
const AuthRouter = require("./routes/auth");
const productAuth = require("./routes/productRouter");

const PORT = process.env.PORT || 3003;

console.log("Mongo URL:", process.env.MONGO_CONN);

app.use(bodyParse.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json("hello");
});
app.use("/auth", AuthRouter);
app.use("/product", productAuth);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
