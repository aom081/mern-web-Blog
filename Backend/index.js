const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const UserRouter = require("./router/User.router");
const PostRouter = require("./router/Post.router");

const app = express();
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

//Connect to Mongo DB
try {
  mongoose.connect(DB_URL);
  console.log("Connected to MongoDB");
} catch (err) {
  console.log(err);
}

app.use(cors({ origin: BASE_URL, credentials: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>Welcome to SE NPRU Blog</h1>");
});

app.use("/uploads", express.static(__dirname + "/uploads"));

//use Pouter
app.use("/api/v1/auth", UserRouter);
app.use("api/v1/post", PostRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
