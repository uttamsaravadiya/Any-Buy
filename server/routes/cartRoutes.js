import express from "express";
import {
  addToCart,
  getCartItems,
  removeCartItem,
  updateCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add/:id", protect, addToCart);
cartRouter.get("/get", protect, getCartItems);
cartRouter.put("/update", protect, updateCart);
cartRouter.delete("/remove/:id", protect, removeCartItem);

export default cartRouter;
