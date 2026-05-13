const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { transactionLimiter } = require("../middleware/rateLimiters");
const controller = require("../controllers/transactionController");

router.use(protect);
router.use(transactionLimiter);

router.get("/", controller.getTransactions);
router.post("/", allowRoles("admin", "user"), controller.addTransaction);
router.put("/:id", allowRoles("admin", "user"), controller.updateTransaction);
router.delete("/:id", allowRoles("admin", "user"), controller.deleteTransaction);

module.exports = router;
