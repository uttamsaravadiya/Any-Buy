const User = require("../models/User");

// @desc Get user details
// @route GET /api/users/:id
exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID, select only required fields
    const user = await User.findById(id).select(
      "firstName lastName email image userType phone address"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Update user profile (image, phone, address)
// @route PUT /api/users/:id
exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { phone, address } = req.body;
    const image = req.file ? req.file.path : undefined; // If an image is uploaded

    // Find user by ID
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (image) user.image = image;

    // Save updated user
    await user.save();

    res.json({
      message: "User profile updated successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        userType: user.userType,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
