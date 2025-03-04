const express = require("express");
const { protect } = require("../middleware/auth.js");
const upload = require("../middleware/upload.js");
const { createProduct, getProducts, addToCart, addToWishlist } = require("../controllers/productController.js");
const router = express.Router();

router.post('/', protect, upload.single('image'), createProduct);
router.get('/', getProducts);
router.post('/cart/:productId', protect, addToCart);
router.post('/wishlist/:productId', protect, addToWishlist);

module.exports = router;