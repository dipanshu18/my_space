import type { Request, Response } from "express";

import { AWS_BUCKET_NAME } from "../constants/env";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { s3 } from "../utils/s3";
import {
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  UNPROCESSABLE_CONTENT,
} from "../constants/httpStatus";
import { db } from "../utils/db";
import { redis } from "../utils/redis";

export async function getAllVideos(req: Request, res: Response) {
  try {
    const videos = await db.video.findMany({
      where: {
        visibility: "PUBLIC",
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        publisher: {
          omit: {
            providerId: true,
            provider: true,
          },
        },
      },
    });

    if (videos.length < 1) {
      res.status(NOT_FOUND).json({ msg: "No public videos found" });
      return;
    }

    res.status(OK).json({ videos });
    return;
  } catch (error) {
    console.log("ERROR:", error);
    res.status(INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    return;
  }
}

export async function createVideoMetadata(req: Request, res: Response) {
  try {
    const { id } = req.user;
    const { title, description } = req.body;

    const newVideoMetadata = await db.video.create({
      data: {
        title,
        description,
        status: "UPLOADING",
        publisherId: id,
      },
    });

    if (newVideoMetadata) {
      await redis.set(`video:${newVideoMetadata.id}`, "processing");
      res.status(CREATED).json({ videoId: newVideoMetadata.id });
      return;
    }

    res
      .status(UNPROCESSABLE_CONTENT)
      .json({ msg: "Error while creating video with given details" });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    return;
  }
}
export async function getUploadVideoPresignedUrl(req: Request, res: Response) {
  try {
    const userId = req.user.id;
    const { videoId } = req.params;

    const key = `${userId}/${videoId}/${crypto.randomUUID()}.mp4`;

    const command = new PutObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      ContentType: "video/mp4",
    });

    const url = await getSignedUrl(s3, command);

    await db.video.update({
      where: {
        id: videoId,
      },
      data: {
        mediaUrl: `${userId}/${videoId}/master.m3u8`,
      },
    });

    res.status(OK).json({ url });
    return;
  } catch (error) {
    console.log("ERROR:", error);
    res.status(INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    return;
  }
}

export async function getVideoDetails(req: Request, res: Response) {
  try {
    const { videoId } = req.params;

    const video = await db.video.findFirst({
      where: {
        id: videoId,
      },
      include: {
        _count: {
          select: {
            likes: true,
            dislikes: true,
          },
        },
        comment: {
          include: {
            user: {
              omit: {
                provider: true,
                providerId: true,
              },
            },
          },
        },
        publisher: {
          omit: {
            provider: true,
            providerId: true,
          },
        },
      },
    });

    if (!video) {
      res.status(NOT_FOUND).json({ msg: "No video found" });
      return;
    }

    res.status(OK).json({ video });
    return;
  } catch (error) {
    console.log("ERROR:", error);
    res.status(INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    return;
  }
}

export async function changeVideoVisibility(req: Request, res: Response) {
  try {
    const { videoId } = req.params;
    const { visibility } = req.body;

    const video = await db.video.findFirst({
      where: {
        id: videoId,
      },
    });

    if (!video) {
      res.status(NOT_FOUND).json({ msg: "No video found" });
      return;
    }

    await db.video.update({
      where: {
        id: videoId,
      },
      data: {
        visibility,
      },
    });

    res.status(OK).json({ msg: "Changed video visibility" });
    return;
  } catch (error) {
    console.log("ERROR:", error);
    res.status(INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
    return;
  }
}
