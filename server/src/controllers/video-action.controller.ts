import type { Request, Response } from "express";

import { db } from "../utils/db";
import {
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  UNPROCESSABLE_CONTENT,
} from "../constants/httpStatus";

export async function likeVideo(req: Request, res: Response) {
  try {
    const { id: userId } = req.user;
    const { videoId } = req.params;

    const videoExists = await db.video.findFirst({
      where: {
        id: videoId,
      },
    });

    if (!videoExists) {
      res.status(NOT_FOUND).json({ msg: "Video not found" });
      return;
    }

    const likeExists = await db.like.findFirst({
      where: {
        videoId,
        userId,
      },
    });

    if (!likeExists) {
      const createLike = await db.like.create({
        data: {
          userId,
          videoId,
        },
      });

      if (createLike) {
        res.status(CREATED).json({ msg: "Video liked" });
        return;
      }

      res
        .status(UNPROCESSABLE_CONTENT)
        .json({ msg: "Error while liking the video!" });
      return;
    } else {
      await db.like.delete({
        where: {
          id: likeExists.id,
        },
      });

      res.status(OK).json({ msg: "Already liked so removed!" });
      return;
    }
  } catch (error) {
    console.log("ERROR:", error);
    res.status(INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    return;
  }
}

export async function dislikeVideo(req: Request, res: Response) {
  try {
    const { id: userId } = req.user;
    const { videoId } = req.params;

    const videoExists = await db.video.findFirst({
      where: {
        id: videoId,
      },
    });

    if (!videoExists) {
      res.status(NOT_FOUND).json({ msg: "Video not found" });
      return;
    }

    const dislikeExists = await db.dislike.findFirst({
      where: {
        videoId,
        userId,
      },
    });

    if (!dislikeExists) {
      const createDislike = await db.dislike.create({
        data: {
          userId,
          videoId,
        },
      });

      if (createDislike) {
        res.status(CREATED).json({ msg: "Video disliked" });
        return;
      }

      res
        .status(UNPROCESSABLE_CONTENT)
        .json({ msg: "Error while liking the video!" });
      return;
    } else {
      await db.dislike.delete({
        where: {
          id: dislikeExists.id,
        },
      });

      res.status(OK).json({ msg: "Already disliked so removed!" });
      return;
    }
  } catch (error) {
    console.log("ERROR:", error);
    res.status(INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    return;
  }
}

export async function commentOnVideo(req: Request, res: Response) {
  try {
    const { id: userId } = req.user;
    const { videoId } = req.params;
    const { comment } = req.body;

    const videoExists = await db.video.findFirst({
      where: {
        id: videoId,
      },
    });

    if (!videoExists) {
      res.status(NOT_FOUND).json({ msg: "Video not found" });
      return;
    }

    const createComment = await db.comment.create({
      data: {
        text: comment,
        userId,
        videoId,
      },
    });

    if (createComment) {
      res.status(CREATED).json({ msg: "Video disliked" });
      return;
    }

    res.status(UNPROCESSABLE_CONTENT).json({
      msg: "Error while commenting the video with given data",
    });
    return;
  } catch (error) {
    console.log("ERROR:", error);
    res.status(INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    return;
  }
}
