import "dotenv/config";

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Missing env variable: ${key}`);
  }

  return value;
}

export const NODE_ENV = getEnv("NODE_ENV");
export const PORT = getEnv("PORT");
export const AWS_REGION = getEnv("AWS_REGION");
export const AWS_BUCKET_NAME = getEnv("AWS_BUCKET_NAME");
export const AWS_ACCESS_KEY = getEnv("AWS_ACCESS_KEY");
export const AWS_SECRET_KEY = getEnv("AWS_SECRET_KEY");
export const JWT_ACCESS_SECRET = getEnv("JWT_ACCESS_SECRET");
export const DATABASE_URL = getEnv("DATABASE_URL");
export const GOOGLE_CALLBACK_URL = getEnv("GOOGLE_CALLBACK_URL");
export const GOOGLE_CLIENT_ID = getEnv("GOOGLE_CLIENT_ID");
export const GOOGLE_CLIENT_SECRET = getEnv("GOOGLE_CLIENT_SECRET");
export const GITHUB_CALLBACK_URL = getEnv("GITHUB_CALLBACK_URL");
export const GITHUB_CLIENT_ID = getEnv("GITHUB_CLIENT_ID");
export const GITHUB_CLIENT_SECRET = getEnv("GITHUB_CLIENT_SECRET");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
