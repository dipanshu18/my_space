import express from "express";
import cors from "cors";
import passport from "passport";

import { AWS_BUCKET_NAME, PORT } from "./constants/env";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "./utils/s3";
import { OK } from "./constants/httpStatus";
import authRoutes from "./routes/auth.route";
import { authenticate } from "./middlewares/auth.middleware";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
// app.use("/api/user", authenticate, userRoutes);
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

app.listen(PORT, () => {
  console.log("Server started on port:", PORT);
});
