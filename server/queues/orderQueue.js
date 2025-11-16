import Queue from "bull";
import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const connection = new Redis(redisUrl);

export const orderQueue = new Queue("orderQueue", { redis: { port: 6379, host: "127.0.0.1" }, prefix: process.env.BULL_PREFIX || "trademore" });

export default orderQueue;
