import Redis from "ioredis";
import { REDIS_URL } from "../constants/env";

const redis = new Redis(REDIS_URL);

export { redis };
