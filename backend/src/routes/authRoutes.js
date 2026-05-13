const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const { authLimiter } = require("../middleware/rateLimiters");

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

module.exports = router;
