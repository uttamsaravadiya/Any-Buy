const Product = require("../models/Product");

// @desc Create a new product
// @route POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, color, condition, category, rating } =
      req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const product = new Product({
      name,
      price,
      description,
      color,
      image: req.file.path, // Store image path
      condition,
      category,
      rating: rating || 0, // Default to 0 if not provided
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get a single product by ID
// @route GET /api/products/:id
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all products with pagination and filtering
// @route GET /api/products
exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;

    let filter = {};
    if (category) {
      filter.category = category; // Filter by category if provided
    }

    const products = await Product.find(filter)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const totalProducts = await Product.countDocuments(filter);

    res.json({
      totalProducts,
      totalPages: Math.ceil(totalProducts / parseInt(limit)),
      currentPage: parseInt(page),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
