const express = require("express");
const connectDB = require("./constant/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();
const app = express();

app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send(`Hello Node API`);
});

app.get("/blog", (req, res) => {
  res.send(`Hello Blog my name is saad waheed khan`);
});

//productApis
app.use("/products", productRoutes);

//signUp API
app.use("/users", userRoutes);

//mongoDB connectivity
connectDB().then(() => {
  app.listen(3000, () => {
    console.log("NodeAPI app is running on port 3000");
  });
});
