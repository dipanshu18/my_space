import type { Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import {
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
  UNAUTHORIZED,
  UNPROCESSABLE_CONTENT,
} from "../constants/httpStatus";
import { db } from "../utils/db";
import { ONE_DAY_MS, oneYearFromNow, thirtyDaysFromNow } from "../utils/date";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import {
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
} from "../utils/cookies";
import {
  APP_ORIGIN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} from "../constants/env";

export async function authWithGoogle(req: Request, res: Response) {
  const user = req.user;

  if (!user) {
    res.redirect(`${APP_ORIGIN}/register?error=unauthorized`);
    return;
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user.id);

  res.cookie("accessToken", accessToken, getAccessTokenCookieOptions());
  res.cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

  res.redirect(`${APP_ORIGIN}/register?token=${accessToken}`);
}

export async function authWithGithub(req: Request, res: Response) {
  const user = req.user;

  if (!user) {
    res.redirect(`${APP_ORIGIN}/register?error=unauthorized`);
    return;
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user.id);

  res.cookie("accessToken", accessToken, getAccessTokenCookieOptions());
  res.cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

  res.redirect(`${APP_ORIGIN}/register?token=${accessToken}`);
}

export async function refreshTokenHandler(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken as string | undefined;

    if (!refreshToken) {
      res.status(UNAUTHORIZED).json({
        message: "Missing refresh token",
      });
      return;
    }

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    if (!decoded) {
      res.status(UNAUTHORIZED).json({
        message: "Invalid refresh token",
      });
      return;
    }

    const { exp, id } = decoded as JwtPayload;
    let newAccessToken: string | undefined;
    if (exp && exp - Date.now() <= ONE_DAY_MS) {
      const user = await db.user.findFirst({ where: { id } });

      if (!user) {
        res.status(UNAUTHORIZED).json({ message: "Invalid refresh token" });
        return;
      }

      newAccessToken = generateAccessToken(user);
    }

    res.cookie("accessToken", newAccessToken, getAccessTokenCookieOptions());

    res.status(OK).json({
      message: "Access token refreshed",
      accessToken: newAccessToken,
    });
    return;
  } catch (error) {
    console.log("ERROR:", error);
    res.status(INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
    return;
  }
}

export async function logoutHandler(req: Request, res: Response) {
  const accessToken = req.cookies.accessToken as string | undefined;
  if (!accessToken) {
    res.status(UNAUTHORIZED).json({
      message: "Unauthorized",
    });
    return;
  }

  const decoded = jwt.verify(
    accessToken || "",
    JWT_ACCESS_SECRET
  ) as JwtPayload;

  if (!decoded) {
    res.status(UNAUTHORIZED).json({
      message: "Invalid token",
    });
    return;
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken", { path: "/auth/refresh" });
  res.status(OK).json({ message: "Logout successful" });
  return;
}
