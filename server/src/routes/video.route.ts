import { Router } from "express";
import {
  changeVideoVisibility,
  createVideoMetadata,
  getAllVideos,
  getUploadVideoPresignedUrl,
  getVideoDetails,
} from "../controllers/video.controller";

const videoRoutes = Router();

videoRoutes.get("/all", getAllVideos);

videoRoutes.post("/create", createVideoMetadata);

videoRoutes.get("/url/:videoId", getUploadVideoPresignedUrl);

videoRoutes.get("/:videoId", getVideoDetails);

videoRoutes.patch("/visibility/:videoId", changeVideoVisibility);

export default videoRoutes;
