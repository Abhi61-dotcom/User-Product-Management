const Product = require("../models/product");

// Add Product
const addProduct = async (req, res) => {
  try {

    // 🔥 YAHAN DEBUG LAGANA HAI
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const product = await Product.create({
      ...req.body,
      createdBy: req.user,
    });

    res.status(201).json({
      success: true,
      data: product,
    });

  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Unable to add product",
    });
  }
};



// Get Only Logged-in User Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      createdBy: req.user,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get products",
    });
  }
};


// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.createdBy.toString() !== req.user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update product",
    });
  }
};


// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.createdBy.toString() !== req.user) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete product",
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
