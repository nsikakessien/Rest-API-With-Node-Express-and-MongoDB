const Category = require("../models/Category");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const createCategory = async (req, res) => {
  if (!req.body) {
    return res.status(422).json({ message: "Please enter category details" });
  }
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(422).json({ message: "Category name is required" });
    }

    if (await Category.findOne({ name })) {
      return res
        .status(409)
        .json({ message: `The category ${name} already exists` });
    }

    const newCategory = await Category.create({ name });
    res
      .status(201)
      .json({ message: "Category created successfully", data: newCategory });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().select("-__v");
    return res.status(200).json({
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving categories",
      error: error.message,
    });
  }
};

const updateCategoryById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(422).json({ message: "Invalid category ID" });
    }

    if (!name) {
      return res.status(422).json({ message: "Category name is required" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating category",
      error: error.message,
    });
  }
};

const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(422).json({ message: "Invalid category ID" });
    }

    const productsWithCategory = await Product.find({ category: id });
    if (productsWithCategory.length > 0) {
      return res.status(409).json({
        message: "Cannot delete category with associated products",
      });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting category",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById,
};
