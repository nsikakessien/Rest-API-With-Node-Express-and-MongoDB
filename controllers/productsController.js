const Category = require("../models/Category");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const getProductQueryOptions = ["category", "active", "name"];

const createProduct = async (req, res) => {
  const productData = req.body;
  try {
    const { name, price, category } = productData; // Destructure to ensure we have the right data
    if (!name || !price || !category) {
      return res.status(422).json({
        message: "name, price, and category are required fields",
      });
    }

    if (typeof price !== "number" || price <= 0) {
      return res.status(422).json({
        message: "Price must be a positive number",
      });
    }

    if (!mongoose.isValidObjectId(category)) {
      return res.status(422).json({ message: "Invalid category ID" });
    }

    if (!(await Category.findById(category))) {
      return res.status(422).json({
        message: "Invalid category ID. Please provide a valid category.",
      });
    }

    const newProduct = await Product.create(productData);
    res
      .status(201)
      .json({ message: "Product created succesfully", data: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const queryObject = {};

    // Validate allowed keys
    const allowedKeys = getProductQueryOptions;
    const areQueriesValid = Object.keys(req.query).every((key) =>
      allowedKeys.includes(key)
    );

    if (!areQueriesValid) {
      return res.status(422).json({
        message: `Invalid query parameters. Valid options are: ${allowedKeys.join(
          ", "
        )}`,
      });
    }

    // Handle 'active' (boolean)
    if (req.query.active !== undefined) {
      queryObject.active = req.query.active === "true";
    }

    // Handle 'category' (ObjectId)
    if (req.query.category) {
      if (!mongoose.isValidObjectId(req.query.category)) {
        return res.status(422).json({ message: "Invalid category ID" });
      }
      queryObject.category = req.query.category;
    }

    // Handle 'name' (partial text search)
    if (req.query.name) {
      queryObject.name = { $regex: req.query.name, $options: "i" };
    }

    //  Execute the query
    const products = await Product.find(queryObject)
      .select("-__v")
      .populate({ path: "category", select: "_id name" });

    return res.status(200).json({
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving products",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(422).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id)
      .select("-__v")
      .populate({ path: "category", select: "_id name" });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product retrieved successfully", data: product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving product", error: error.message });
  }
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(422).json({ message: "Invalid product ID" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(422).json({ message: "Invalid product ID" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product deleted successfully", data: deletedProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
