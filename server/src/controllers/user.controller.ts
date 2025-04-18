import type { Request, Response } from "express";
import { db } from "../utils/db";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../constants/httpStatus";

export async function getUserProfile(req: Request, res: Response) {
  try {
    const { id } = req.user;
    const user = await db.user.findFirst({
      where: { id },
      omit: {
        providerId: true,
      },
      include: {
        videos: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      res.status(NOT_FOUND).json({ msg: "No user found" });
      return;
    }

    res.status(OK).json(user);
    return;
  } catch (error) {
    console.log("ERROR:", error);

    res.status(INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    return;
  }
}
