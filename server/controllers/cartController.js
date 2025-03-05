const User = require("../models/User");
const Product = require("../models/Product");

// @desc Add a product to the user's cart
// @route POST /api/cart/:userId
// exports.addToCart = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { productId } = req.body;

//     // Check if user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     // Prevent duplicate product in cart
//     if (user.cart.includes(productId)) {
//       return res
//         .status(400)
//         .json({ message: "Product is already in the cart" });
//     }

//     // Add product to cart
//     user.cart.push(productId);
//     await user.save();

//     res.json({
//       message: "Product added to cart successfully",
//       cart: user.cart,
//     });
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// @desc Get user cart details
// @route GET /api/cart/:userId
exports.getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user and populate cart with product details
    const user = await User.findById(userId).populate("cart");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the cart is empty
    if (user.cart.length === 0) {
      return res.json({ message: "Cart is empty", cart: [] });
    }

    res.json({
      message: "User cart retrieved successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Increase product quantity in cart
// @route PUT /api/cart/:userId/increase
exports.addToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Fix: Ensure cart exists and is properly structured
    if (!user.cart) {
      user.cart = [];
    }

    // ✅ Fix: Check if cart contains valid objects before running .find()
    const cartItem = user.cart.find(
      (item) => item.product && item.product.toString() === productId
    );

    if (cartItem) {
      // ✅ Increase quantity instead of adding a duplicate entry
      cartItem.quantity += 1;
    } else {
      // ✅ Add product with quantity 1 if not in cart
      user.cart.push({ product: productId, quantity: 1 });
    }

    // ✅ Save the updated user cart
    await user.save();

    res.json({
      message: "Product quantity updated in cart",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userId, cartId } = req.params;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Remove the cart item by filtering out the matching `cartId`
    user.cart = user.cart.filter((item) => item._id.toString() !== cartId);

    // ✅ Save updated cart
    await user.save();

    res.json({
      message: "Product removed from cart successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};
