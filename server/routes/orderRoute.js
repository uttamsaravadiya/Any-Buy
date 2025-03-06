import express from "express";
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateOrderStatus,
  userOrders,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";
const orderRouter = express.Router();

//Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

//Payment Features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

//User Features
orderRouter.post("/userorders", authUser, userOrders);

//Verify Payment
orderRouter.post("/verifyStripe", adminAuth, verifyStripe);

export default orderRouter;
