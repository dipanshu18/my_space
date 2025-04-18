import { Router } from "express";
import passport from "passport";

import "../strategies/googleOauth";
import "../strategies/githubOauth";
import {
  authWithGithub,
  authWithGoogle,
  logoutHandler,
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.get(
  "/register/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false,
  })
);

authRoutes.get(
  "/callback/google",
  passport.authenticate("google", {
    session: false,
  }),
  authWithGoogle
);

authRoutes.get(
  "/register/github",
  passport.authenticate("github", { scope: ["user:email"], session: false })
);

authRoutes.get(
  "/callback/github",
  passport.authenticate("github", {
    session: false,
  }),
  authWithGithub
);

authRoutes.get("/logout", logoutHandler);

export default authRoutes;
