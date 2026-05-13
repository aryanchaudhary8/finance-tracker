const { createClient } = require("redis");
require("dotenv").config();

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});

redisClient.on("error", (err) => console.error("Redis error:", err));

(async () => {
  if (!redisClient.isOpen) await redisClient.connect();
})();

module.exports = redisClient;
