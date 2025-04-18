import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { FORBIDDEN, UNAUTHORIZED } from "../constants/httpStatus";
import { JWT_ACCESS_SECRET } from "../constants/env";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token as string | undefined;

  if (!token) {
    res.status(FORBIDDEN).json({
      message: "No token",
    });
    return;
  }

  const decoded: JwtPayload | undefined = jwt.verify(
    token,
    JWT_ACCESS_SECRET
  ) as JwtPayload;

  if (!decoded) {
    res.status(UNAUTHORIZED).json({
      message: "Invalid token",
    });
    return;
  }

  req.user = { id: decoded.id, email: decoded.email };
  next();
}
