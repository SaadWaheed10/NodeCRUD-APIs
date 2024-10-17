const express = require("express");
const Product = require("../models/productModels");
const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controller/productController");

const router = express.Router();

//post product API
router.post("/product", createProduct);
//get product API
router.get("/getProducts", getAllProduct);
//get product by ID API
router.get("/getProduct/:id", getProductById);
//update product by ID API
router.put("/updateProduct/:id", updateProductById);
//delete product
router.delete("/deleteProduct/:id", deleteProductById);

module.exports = router;
