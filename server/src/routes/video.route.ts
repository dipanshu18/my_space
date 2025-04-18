import { Router } from "express";
import {
  createVideoMetadata,
  getUploadVideoPresignedUrl,
  getVideoDetails,
} from "../controllers/video.controller";

const videoRoutes = Router();

videoRoutes.post("/create", createVideoMetadata);

videoRoutes.get("/url/:videoId", getUploadVideoPresignedUrl);

videoRoutes.get("/:videoId", getVideoDetails);

export default videoRoutes;
