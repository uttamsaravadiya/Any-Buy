const express = require("express");
const {
  createProduct,
  getProduct,
  getAllProducts,
} = require("../controllers/productController");
const upload = require("../middleware/uploadMulter");

const router = express.Router();

router.post("/", upload.single("image"), createProduct);
router.get("/", getAllProducts); // Get all products with optional pagination & filtering
router.get("/:id", getProduct);

module.exports = router;
