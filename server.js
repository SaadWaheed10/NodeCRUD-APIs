const express = require("express");
const connectDB = require("./constant/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();
const app = express();

app.use(express.json());

//productApis
app.use("/products", productRoutes);

//signUp & SignIn API
app.use("/users", userRoutes);

//mongoDB connectivity
connectDB().then(() => {
  app.listen(3000, () => {
    console.log("NodeAPI app is running on port 3000");
  });
});
