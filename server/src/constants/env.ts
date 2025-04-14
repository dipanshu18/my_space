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
