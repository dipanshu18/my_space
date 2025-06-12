import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route";
import { authenticate } from "./middlewares/auth.middleware";
import userRoutes from "./routes/user.route";
import { PORT } from "./constants/env";
import videoRoutes from "./routes/video.route";
import videoActionRoutes from "./routes/video-action.route";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(cookieParser());
app.use(passport.initialize());

app.use((req, _, next) => {
  console.log(
    req.method,
    req.path,
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString()
  );
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/user", authenticate, userRoutes);
app.use("/api/video", authenticate, videoRoutes);
app.use("/api/video-action", authenticate, videoActionRoutes);

app.listen(PORT, () => {
  console.log("Server started on port:", PORT);
});
