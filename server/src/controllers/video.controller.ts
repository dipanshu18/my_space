import type { Request, Response } from "express";

// import { AWS_BUCKET_NAME, PORT } from "./constants/env";
// import { PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { s3 } from "./utils/s3";
// import { OK } from "./constants/httpStatus";
// app.get("/url/:userId/:videoId", async (req, res) => {
//   // const {id} = req.user;
//   const { userId, videoId } = req.params;

//   const key = `${userId}/${videoId}/${crypto.randomUUID()}.mp4`;

//   const command = new PutObjectCommand({
//     Bucket: AWS_BUCKET_NAME,
//     Key: key,
//     ContentType: "video/mp4",
//   });

//   const url = await getSignedUrl(s3, command);

//   res.status(OK).json({ url });
//   return;
// });
export async function getUploadVideoPresignedUrl(req: Request, res: Response) {}
