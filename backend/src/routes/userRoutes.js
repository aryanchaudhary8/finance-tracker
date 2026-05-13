const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const {
  getUsers,
  updateUserRole,
  updateMyRole,
} = require("../controllers/userController");

router.get("/", protect, allowRoles("admin"), getUsers);

// User can change own role: user <-> read-only
router.put("/me/role", protect, updateMyRole);

// Admin can change users: user <-> admin
router.put("/:id/role", protect, allowRoles("admin"), updateUserRole);

module.exports = router;