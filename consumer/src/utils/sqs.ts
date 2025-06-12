import { SQSClient } from "@aws-sdk/client-sqs";
import { AWS_ACCESS_KEY, AWS_REGION, AWS_SECRET_KEY } from "../constants/env";

export const sqs = new SQSClient({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
  region: AWS_REGION,
});
