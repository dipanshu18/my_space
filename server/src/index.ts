import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route";
import { authenticate } from "./middlewares/auth.middleware";
import userRoutes from "./routes/user.route";
import { PORT } from "./constants/env";

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

app.use("/api/auth", authRoutes);
app.use("/api/user", authenticate, userRoutes);

app.listen(PORT, () => {
  console.log("Server started on port:", PORT);
});
