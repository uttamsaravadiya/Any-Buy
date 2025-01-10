import express from 'express';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import {
  createProduct,
  getProducts,
  addToCart,
  addToWishlist
} from '../controllers/productController.js';

const router = express.Router();

router.post('/', protect, upload.single('image'), createProduct);
router.get('/', getProducts);
router.post('/cart/:productId', protect, addToCart);
router.post('/wishlist/:productId', protect, addToWishlist);

export default router;