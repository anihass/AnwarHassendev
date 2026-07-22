const Users = require("../models/user");

// GET all users (admin only)
const fetchUsersController = async (req, res) => {
  try {
    const users = await Users.find().select("-password"); // hide password
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE user role (admin only)
const updateUserRoleController = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body; // expected: "admin" or "user"

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ success: true, message: `User role updated to ${role}`, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// DELETE user (admin only)
const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = { fetchUsersController, updateUserRoleController,deleteUserController};
