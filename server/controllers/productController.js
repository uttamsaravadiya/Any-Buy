const Product = require("../models/Product");

// @desc Create a new product
// @route POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      color,
      condition,
      category,
      rating,
      stock,
    } = req.body;

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
      stock: stock || 0, // Default to 0 if not provided
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

exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};
    if (category) {
      filter.category = category;
    }

    // Fetch all products without pagination
    const products = await Product.find(filter);

    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json({
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/products/category/:category
exports.getProductsByCategory = async (req, res) => {
  try {
    let { category } = req.params;

    // Define allowed categories with their URL-friendly versions
    const categoryMap = {
      "home-appliances": "Home Appliances",
      headphones: "Headphones",
      laptop: "Laptop",
      "gaming-accessories": "Gaming Accessories",
      phone: "Phone",
      television: "Television",
      smartwatch: "Smartwatch", // ✅ New Category Added
    };

    // Convert URL-friendly category to actual database category
    const categoryMatch = categoryMap[category.toLowerCase()];

    if (!categoryMatch) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // Fetch products that exactly match the category
    const products = await Product.find({ category: categoryMatch });

    if (!products.length) {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }

    res.json({
      totalProducts: products.length,
      category: categoryMatch,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Improved: Case-insensitive search by name & category
    const products = await Product.find({
      $or: [
        { name: { $regex: new RegExp(query, "i") } }, // 🔍 Case-insensitive name match
        { category: { $regex: new RegExp(query, "i") } }, // 🔍 Case-insensitive category match
      ],
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json({ totalProducts: products.length, products });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.filterProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, minRating, condition, sort } =
      req.query;

    let filter = {};

    // ✅ Category Mapping
    const categoryMap = {
      "home-appliances": "Home Appliances",
      headphones: "Headphones",
      laptop: "Laptop",
      "gaming-accessories": "Gaming Accessories",
      phone: "Phone",
      television: "Television",
      smartwatch: "Smartwatch",
    };

    // ✅ Convert URL-friendly category to actual database category
    if (category) {
      const categoryMatch = categoryMap[category.toLowerCase()];
      if (!categoryMatch) {
        return res.status(400).json({ message: "Invalid category" });
      }
      filter.category = categoryMatch;
    }

    // ✅ Fix Price Filtering Logic
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice); // Convert `minPrice` to a number
      if (maxPrice) filter.price.$lte = Number(maxPrice); // Convert `maxPrice` to a number
    }

    // ✅ Filter by minimum rating
    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating) };
    }

    // ✅ Filter by condition (must be "advance" or "delivery")
    if (
      condition &&
      ["advance", "delivery"].includes(condition.toLowerCase())
    ) {
      filter.condition = condition.toLowerCase();
    }

    // ✅ Sorting Logic (Default: No Sorting)
    let sortOption = {};
    if (sort === "price-asc") {
      sortOption.price = 1; // Sort Price Low to High
    } else if (sort === "price-desc") {
      sortOption.price = -1; // Sort Price High to Low
    }

    // 🔍 Fetch filtered & sorted products
    const products = await Product.find(filter).sort(sortOption);

    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json({ totalProducts: products.length, products });
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({ message: error.message });
  }
};
