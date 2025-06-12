import { Router } from "express";

import {
  commentOnVideo,
  dislikeVideo,
  likeVideo,
} from "../controllers/video-action.controller";

const videoActionRoutes = Router();

videoActionRoutes.post("/like/:videoId", likeVideo);

videoActionRoutes.post("/dislike/:videoId", dislikeVideo);

videoActionRoutes.post("/comment/:videoId", commentOnVideo);

export default videoActionRoutes;
