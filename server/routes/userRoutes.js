const express = require("express");
const {
  getUserDetails,
  updateUserProfile,
} = require("../controllers/userController");
const upload = require("../middleware/uploadMulter");

const router = express.Router();

router.get("/:id", getUserDetails); // Get user details by ID
router.put("/update/:id", upload.single("image"), updateUserProfile);

module.exports = router;
