import { CommentSection } from "@/components/comments";
import { Dislike, Like } from "@/components/user-video-action";
import { VideoPlayer } from "@/components/video-player";

export default function VideoDetails() {
  return (
    <div className="p-5 mt-16 lg:mt-0 flex flex-col xl:flex-row gap-5">
      <div className="">
        <div className="w-full">
          <VideoPlayer
            src={`${process.env.NEXT_PUBLIC_CDN_URL}/7/17/master.m3u8`}
            poster=""
          />
        </div>

        <div className="my-5 space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Video title</h1>
            <div className="space-x-5">
              <Like />
              <Dislike />
            </div>
          </div>
          <p className="text-base">
            Description: Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Expedita quae dignissimos fugit ut illum commodi fuga quia aut
            ratione magni rem, dolor, doloribus repellat libero voluptatibus
            praesentium necessitatibus recusandae debitis distinctio iure
            perspiciatis soluta non. Aspernatur est expedita odit. Nulla.
          </p>
        </div>
      </div>

      <div className="xl:w-4/5">
        <h1 className="text-xl font-bold">Comments</h1>

        <CommentSection />
      </div>
    </div>
  );
}
