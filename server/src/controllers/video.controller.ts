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
        publisher: {
          omit: {
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
