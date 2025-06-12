"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function likeVideo(id: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/video-action/like/${id}`,
      {},
      {
        headers: {
          Cookie: `token=${token}`,
        },
        withCredentials: true,
      }
    );

    const data = await response.data.msg;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = await error.response?.data.msg;
      console.log(errorMsg);
    }
  }
}

export async function dislikeVideo(id: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/video-action/dislike/${id}`,
      {},
      {
        headers: {
          Cookie: `token=${token}`,
        },
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      const data = await response.data.msg;
      return data;
    }

    if (response.status === 200) {
      const data = await response.data.msg;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = await error.response?.data.msg;
      console.log(errorMsg);
    }
  }
}

export async function commentOnVideo(id: string, comment: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/video-action/comment/${id}`,
      { comment },
      {
        headers: {
          Cookie: `token=${token}`,
        },
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      const data = await response.data.msg;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = await error.response?.data.msg;
      console.log(errorMsg);
    }
  }
}
