import { createClient } from "redis";
import "dotenv/config";
const client = createClient({
  url: `${
    process.env.NODE_ENV === "dev"
      ? "redis://localhost:6379"
      : `redis://${process.env.REDIS_USER}:${process.env.REDIS_USER_PASSWORD}@redis-15843.c302.asia-northeast1-1.gce.cloud.redislabs.com:15843`
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
