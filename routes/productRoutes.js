const express = require("express");
const Product = require("../models/productModels");

const router = express.Router();

//post product API
router.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//get product API
router.get("/getProducts", async (req, res) => {
  try {
    const getProducts = await Product.find({});
    res.status(200).json(getProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//get product by ID API
router.get("/getProduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getProduct = await Product.findById(id);
    res.status(200).json(getProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//update product by ID API
router.put("/updateProduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateProduct = await Product.findByIdAndUpdate(id, req.body);

    //we cannot find he product in database
    if (!updateProduct) {
      return res
        .status(404)
        .json({ message: `cannot find the product with ID ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//delete product
router.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res
        .status(404)
        .json({ message: `cannot find the product with ID ${id}` });
    }
    res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
