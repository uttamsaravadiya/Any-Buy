import User from "../models/User.js";

//Add products to user cart
export const addToCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.cart.includes(req.params.id)) {
      return res.status(400).json({ message: "Product already in cart" });
    }
    user.cart.push(req.params.id);
    await user.save();
    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Update user cart
const updateCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = req.body.cart;
    await user.save();
    res.status(200).json({ message: "Cart updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get user cart data
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart");
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Remove product from user cart
export const removeFromCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter((item) => item.toString() !== req.params.id);
    await user.save();
    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addToCart, getCart, removeFromCart, updateCart };
