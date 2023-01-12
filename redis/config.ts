import { createClient } from "redis";
import "dotenv/config";
const client = createClient({
  url: `${
    process.env.NODE_ENV === "dev"
      ? "redis://localhost:6379"
      : `redis://${process.env.REDIS_USER}:${process.env.REDIS_USER_PASSWORD}@${process.env.REDIS_END_POINT}`
  }`,
  commandsQueueMaxLength: 1000,
});

(async () => {
  try {
    await client.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("🚀 ~ file: config.ts ~ line 14 ~ error", error);
  }
})();

export { client };
