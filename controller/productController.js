const Product = require("../models/productModels");

//create product controller
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//get all product controller
const getAllProduct = async (req, res) => {
  try {
    const getProducts = await Product.find({});
    res.status(200).json(getProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const getProduct = await Product.findById(id);
    res.status(200).json(getProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//update product by id
const updateProductById = async (req, res) => {
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
};

//delete product by id
const deleteProductById = async (req, res) => {
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
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
