import { Router } from "express";
import passport from "passport";
import {
  authWithGithub,
  authWithGoogle,
  logoutHandler,
  refreshTokenHandler,
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post(
  "/register/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false,
  })
);

authRoutes.post(
  "/callback/google",
  passport.authenticate("google", {
    session: false,
  }),
  authWithGoogle
);

authRoutes.post(
  "/register/github",
  passport.authenticate("github", { scope: ["user:email"], session: false })
);

authRoutes.post(
  "/callback/github",
  passport.authenticate("github", {
    session: false,
  }),
  authWithGithub
);

authRoutes.get("/logout", logoutHandler);

authRoutes.get("/refresh", refreshTokenHandler);

export default authRoutes;
