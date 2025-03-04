const express = require("express");
const { addToCart, getCartItems, removeCartItem, updateCart } = require("../controllers/cartController.js");
const { protect } = require("../middleware/auth.js");
const cartRouter = express.Router();

cartRouter.post("/add/:id", protect, addToCart);
cartRouter.get("/get", protect, getCartItems);
cartRouter.put("/update", protect, updateCart);
cartRouter.delete("/remove/:id", protect, removeCartItem);

module.exports = cartRouter;
