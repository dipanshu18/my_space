import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
} from "@aws-sdk/client-sqs";
import { AWS_SQS_URL } from "./constants/env";
import { sqs } from "./utils/sqs";

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
            console.log("Extracted S3 Object Key:", objectKey.split("/"));

            // Do something with the objectKey...
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
