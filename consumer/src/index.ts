import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
} from "@aws-sdk/client-sqs";
import { RunTaskCommand } from "@aws-sdk/client-ecs";

import {
  AWS_CDN_URL,
  AWS_ECS_CLUSTER_NAME,
  AWS_ECS_TASK_NAME,
  AWS_SQS_URL,
} from "./constants/env";
import { sqs } from "./utils/sqs";
import { ecs } from "./utils/ecs";

async function pollQueue() {
  console.log("Listening for messages...");

  while (true) {
    try {
      const receiveParams = {
        QueueUrl: AWS_SQS_URL,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 10, // Enable long polling
      };

      const response = await sqs.send(new ReceiveMessageCommand(receiveParams));

      if (response.Messages && response.Messages.length > 0) {
        for (const message of response.Messages) {
          console.log("Raw SQS Message:", message.Body);

          const messageBody = JSON.parse(message.Body as string);
          const s3Record = messageBody.Records?.[0];

          if (s3Record?.s3?.object) {
            const objectKey = decodeURIComponent(
              s3Record.s3.object.key.replace(/\+/g, " ")
            );
            const [userId, videoId] = objectKey.split("/");

            console.log(
              "Starting run task with env vars:",
              userId,
              videoId,
              objectKey
            );

            console.log(`${AWS_CDN_URL}/${objectKey}`);
            // Run ECS task
            const taskCommand = new RunTaskCommand({
              cluster: AWS_ECS_CLUSTER_NAME,
              launchType: "FARGATE",
              taskDefinition: AWS_ECS_TASK_NAME,
              count: 1,
              networkConfiguration: {
                awsvpcConfiguration: {
                  assignPublicIp: "ENABLED",
                  subnets: [
                    "subnet-04690168017d37e8c",
                    "subnet-0665898f1df9a0580",
                    "subnet-023d466f3c36948f8",
                  ],
                  securityGroups: ["sg-06cf50f0fb685f086"],
                },
              },
              overrides: {
                containerOverrides: [
                  {
                    name: "transcoder",
                    environment: [
                      { name: "USER_ID", value: userId },
                      { name: "VIDEO_ID", value: videoId },
                      {
                        name: "OBJECT_URI",
                        value: `${AWS_CDN_URL}/${objectKey}`,
                      },
                    ],
                  },
                ],
              },
            });

            await ecs.send(taskCommand);
            console.log("Run task started");
          }

          // Delete the message after processing
          await sqs.send(
            new DeleteMessageCommand({
              QueueUrl: AWS_SQS_URL,
              ReceiptHandle: message.ReceiptHandle,
            })
          );
        }
      }
    } catch (error) {
      console.error("Error receiving or deleting message:", error);
    }
  }
}

pollQueue();
