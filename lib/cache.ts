import { Redis } from "ioredis";
import { getErrorMessage } from "./error";

// enviroment
const { REDIS_URL, REDIS_TTL } = process.env;
const URL = REDIS_URL ?? "redis://localhost:6379";
const TTL = REDIS_TTL ? +REDIS_TTL : 300;

// client
let redis: Redis | null = null;
function getRedis(): Redis {
  if (!redis) {
    redis = new Redis(URL);
  }
  return redis;
}

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const client = getRedis();
    const value = await client.get(key);
    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  } catch (ex) {
    console.error(`Error reading from cache key ${key}`, getErrorMessage(ex));
    return null;
  }
}

export async function setCache<T>(
  key: string,
  value: T,
  ttl = TTL
): Promise<void> {
  try {
    const client = getRedis();
    const json = JSON.stringify(value);

    if (ttl) {
      await client.set(key, json, "EX", ttl);
    } else {
      await client.set(key, json);
    }
  } catch (ex) {
    console.error(`Error setting cache key ${key}`, getErrorMessage(ex));
  }
}

export async function delCache(key: string) {
  try {
    const client = getRedis();
    await client.del(key);
  } catch (ex) {
    console.error(`Error cache key ${key} invalidation`, getErrorMessage(ex));
  }
}
