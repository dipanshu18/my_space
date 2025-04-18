"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function getUserProfile() {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      const data = await response.data;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = await error.response?.data.msg;
      console.log(errorMsg);
    }
  }
}
