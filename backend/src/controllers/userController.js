const pool = require("../config/db");

const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, created_at FROM users ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.log("GET USERS ERROR:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Admin can only change user <-> admin
    const allowedRoles = ["admin", "user"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Admin can only assign admin or user role",
      });
    }

    const result = await pool.query(
      "UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role",
      [role, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Role updated successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.log("UPDATE USER ROLE ERROR:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

const updateMyRole = async (req, res) => {
  try {

    console.log("UPDATE MY ROLE HIT:", req.user, req.body);
    const { role } = req.body;

    // User can only change own role user <-> read-only
    const allowedRoles = ["user", "read-only"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "You can only switch between user and read-only",
      });
    }

    const result = await pool.query(
      "UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role",
      [role, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Your role updated successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.log("UPDATE MY ROLE ERROR:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

module.exports = { getUsers, updateUserRole, updateMyRole };