import { getVideoDetails } from "@/actions/video";
import { CommentSection } from "@/components/comments";
import { Dislike, Like } from "@/components/user-video-action";
import { VideoPlayer } from "@/components/video-player";
import type { IVideo } from "@/types";

export default async function PrivateVideoDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const video = (await getVideoDetails(id)) as IVideo;

  return (
    <div className="p-5 mt-16 lg:mt-0 flex flex-col xl:flex-row gap-5">
      <div className="">
        <div className="w-full">
          <VideoPlayer
            src={`${process.env.NEXT_PUBLIC_CDN_URL}/${video.mediaUrl}`}
            poster=""
          />
        </div>

        <div className="my-5 space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">{video.title}</h1>
            <div className="space-x-5">
              <Like count={video._count.likes} videoId={video.id} />
              <Dislike count={video._count.dislikes} videoId={video.id} />
            </div>
          </div>
          <p className="text-base">{video.description}</p>
        </div>
      </div>

      <div className="xl:w-4/5">
        <h1 className="text-xl font-bold">Comments</h1>

        <CommentSection videoId={video.id} comments={video.comment} />
      </div>
    </div>
  );
}
