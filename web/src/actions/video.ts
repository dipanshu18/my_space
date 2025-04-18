import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function getVideoDetails(id: string) {
  try {
    const token = (await cookies()).get("token")?.value;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/video/${id}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      const data = await response.data.video;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = await error.response?.data.msg;
      console.log(errorMsg);
    }
  }
}
