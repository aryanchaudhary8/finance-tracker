const pool = require("../config/db");
const redisClient = require("../config/redis");

const getAnalytics = async (req, res) => {
  try {
    const cacheKey = req.user.role === "admin" ? "analytics:admin" : `analytics:${req.user.id}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const params = [];
    const where = req.user.role === "admin" ? "" : "WHERE user_id=$1";
    if (req.user.role !== "admin") params.push(req.user.id);

    const summary = await pool.query(
      `SELECT 
        COALESCE(SUM(CASE WHEN type='income' THEN amount ELSE 0 END),0) AS income,
        COALESCE(SUM(CASE WHEN type='expense' THEN amount ELSE 0 END),0) AS expense
       FROM transactions ${where}`,
      params
    );

    const category = await pool.query(
      `SELECT category, SUM(amount) AS total FROM transactions ${where} AND type='expense'
       GROUP BY category ORDER BY total DESC`.replace("WHERE  AND", "WHERE").replace(" AND type", where ? " AND type" : "WHERE type"),
      params
    );

    const monthly = await pool.query(
      `SELECT TO_CHAR(transaction_date, 'YYYY-MM') AS month, type, SUM(amount) AS total
       FROM transactions ${where}
       GROUP BY month, type ORDER BY month`,
      params
    );

    const data = {
      summary: {
        income: Number(summary.rows[0].income),
        expense: Number(summary.rows[0].expense),
        balance: Number(summary.rows[0].income) - Number(summary.rows[0].expense)
      },
      category: category.rows,
      monthly: monthly.rows
    };

    await redisClient.setEx(cacheKey, 900, JSON.stringify(data));
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAnalytics };
