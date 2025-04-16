import "dotenv/config";

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Missing env variable: ${key}`);
  }

  return value;
}

export const AWS_SQS_URL = getEnv("AWS_SQS_URL");
export const AWS_REGION = getEnv("AWS_REGION");
export const AWS_ACCESS_KEY = getEnv("AWS_ACCESS_KEY");
export const AWS_SECRET_KEY = getEnv("AWS_SECRET_KEY");
export const AWS_ECS_CLUSTER_NAME = getEnv("AWS_ECS_CLUSTER_NAME");
export const AWS_ECS_TASK_NAME = getEnv("AWS_ECS_TASK_NAME");
export const AWS_CDN_URL = getEnv("AWS_CDN_URL");
