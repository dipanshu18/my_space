import type { Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { OK, UNAUTHORIZED } from "../constants/httpStatus";
import { generateToken } from "../utils/jwt";
import { getTokenCookieOptions } from "../utils/cookies";
import { APP_ORIGIN, JWT_ACCESS_SECRET } from "../constants/env";

export async function authWithGoogle(req: Request, res: Response) {
  const user = req.user;

  if (!user) {
    res.redirect(`${APP_ORIGIN}/register?error=unauthorized`);
    return;
  }

  const token = generateToken(user);

  res.cookie("token", token, getTokenCookieOptions());

  res.redirect(`${APP_ORIGIN}/register`);
}

export async function authWithGithub(req: Request, res: Response) {
  const user = req.user;

  if (!user) {
    res.redirect(`${APP_ORIGIN}/register?error=unauthorized`);
    return;
  }

  const token = generateToken(user);

  res.cookie("token", token, getTokenCookieOptions());

  res.redirect(`${APP_ORIGIN}/register`);
}

export async function logoutHandler(req: Request, res: Response) {
  const token = req.cookies.token as string | undefined;
  if (!token) {
    res.status(UNAUTHORIZED).json({
      message: "Unauthorized",
    });
    return;
  }

  const decoded = jwt.verify(token || "", JWT_ACCESS_SECRET) as JwtPayload;

  if (!decoded) {
    res.status(UNAUTHORIZED).json({
      message: "Invalid token",
    });
    return;
  }

  res.clearCookie("token");
  res.status(OK).json({ message: "Logout successful" });
  return;
}
