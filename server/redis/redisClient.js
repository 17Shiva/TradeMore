// server/redis/redisClient.js
import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

// Publisher → sends messages (used by worker)
export const pub = new Redis(REDIS_URL);

// Subscriber → receives messages (used by server)
export const sub = new Redis(REDIS_URL);

pub.on("connect", () => console.log("🟢 Redis Publisher connected"));
sub.on("connect", () => console.log("🔵 Redis Subscriber connected"));

sub.on("error", (err) => console.log("❌ Redis Subscriber Error:", err));
pub.on("error", (err) => console.log("❌ Redis Publisher Error:", err));
