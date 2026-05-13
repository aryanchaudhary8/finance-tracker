const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const { analyticsLimiter } = require("../middleware/rateLimiters");
const { getAnalytics } = require("../controllers/analyticsController");

router.get("/", protect, analyticsLimiter, getAnalytics);

module.exports = router;
