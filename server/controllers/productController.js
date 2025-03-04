const Product = require("../models/Product.js");
const User = require("../models/User.js");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, discount, description, color, category, condition } = req.body;
    const image = req.file.path;

    const product = await Product.create({
      name,
      price,
      discount,
      description,
      color,
      image,
      category,
      condition,
      seller: req.user._id
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { products: product._id }
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('seller', 'fullName')
      .sort('-createdAt');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { cart: req.params.productId } },
      { new: true }
    ).populate('cart');
    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { wishlist: req.params.productId } },
      { new: true }
    ).populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};