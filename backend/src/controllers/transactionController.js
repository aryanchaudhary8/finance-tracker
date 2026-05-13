const pool = require("../config/db");
const redisClient = require("../config/redis");

const invalidateAnalytics = async (userId) => {
  try {
    await redisClient.del(`analytics:${userId}`);
    await redisClient.del("analytics:admin");
  } catch {}
};

const getTransactions = async (req, res) => {
  try {
    const { search = "", type = "", page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let params = [];
    let where = [];

    if (req.user.role !== "admin") {
      params.push(req.user.id);
      where.push(`user_id=$${params.length}`);
    }

    if (search) {
      params.push(`%${search}%`);
      where.push(`(category ILIKE $${params.length} OR description ILIKE $${params.length})`);
    }

    if (type) {
      params.push(type);
      where.push(`type=$${params.length}`);
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
    params.push(Number(limit), offset);

    const result = await pool.query(
      `SELECT * FROM transactions ${whereSql} ORDER BY transaction_date DESC LIMIT $${params.length-1} OFFSET $${params.length}`,
      params
    );

    res.json(result.rows);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, transaction_date, user_id } = req.body;
    const ownerId = req.user.role === "admin" && user_id ? user_id : req.user.id;

    const result = await pool.query(
      `INSERT INTO transactions (user_id,type,amount,category,description,transaction_date)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [ownerId, type, amount, category, description, transaction_date]
    );

    await invalidateAnalytics(ownerId);
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, category, description, transaction_date } = req.body;

    const check = await pool.query("SELECT * FROM transactions WHERE id=$1", [id]);
    const tx = check.rows[0];
    if (!tx) return res.status(404).json({ message: "Transaction not found" });
    if (req.user.role !== "admin" && tx.user_id !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const result = await pool.query(
      `UPDATE transactions SET type=$1, amount=$2, category=$3, description=$4, transaction_date=$5
       WHERE id=$6 RETURNING *`,
      [type, amount, category, description, transaction_date, id]
    );

    await invalidateAnalytics(tx.user_id);
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const check = await pool.query("SELECT * FROM transactions WHERE id=$1", [id]);
    const tx = check.rows[0];
    if (!tx) return res.status(404).json({ message: "Transaction not found" });
    if (req.user.role !== "admin" && tx.user_id !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await pool.query("DELETE FROM transactions WHERE id=$1", [id]);
    await invalidateAnalytics(tx.user_id);
    res.json({ message: "Transaction deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getTransactions, addTransaction, updateTransaction, deleteTransaction };
