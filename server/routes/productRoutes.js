const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProducts,
  getProductsByCategory,
  searchProducts,
} = require("../controllers/productController");
const upload = require("../middleware/uploadMulter");

const router = express.Router();

router.post("/", upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/:id", getProduct);
router.get("/category/:category", getProductsByCategory);

module.exports = router;
