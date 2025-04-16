import { ECSClient } from "@aws-sdk/client-ecs";
import { AWS_ACCESS_KEY, AWS_REGION, AWS_SECRET_KEY } from "../constants/env";

export const ecs = new ECSClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});
