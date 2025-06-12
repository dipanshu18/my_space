import { getVideoDetails } from "@/actions/video";
import { CommentSection } from "@/components/comments";
import { Dislike, Like } from "@/components/user-video-action";
import { VideoPlayer } from "@/components/video-player";
import { IVideo } from "@/types";

export default async function VideoDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const videoDetails = (await getVideoDetails(id)) as IVideo;

  return (
    <div className="p-5 mt-16 lg:mt-0 flex flex-col xl:flex-row gap-5">
      <div className="">
        <div className="w-full">
          <VideoPlayer
            src={`${process.env.NEXT_PUBLIC_CDN_URL}/${videoDetails.mediaUrl}`}
            poster=""
          />
        </div>

        <div className="my-5 space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">{videoDetails.title}</h1>
            <div className="space-x-5">
              <Like
                videoId={videoDetails.id}
                count={videoDetails._count.likes}
              />
              <Dislike
                videoId={videoDetails.id}
                count={videoDetails._count.dislikes}
              />
            </div>
          </div>
          <p className="text-base">{videoDetails.description}</p>
        </div>
      </div>

      <div className="xl:w-4/5 lg:border-l lg:pl-5">
        <h1 className="text-xl font-bold">Comments</h1>

        <CommentSection
          videoId={videoDetails.id}
          comments={videoDetails.comment}
        />
      </div>
    </div>
  );
}
