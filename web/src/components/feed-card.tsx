import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import {
  ChangeVideoVisibility,
  DeleteVideo,
  EditVideo,
} from "./channel-video-action";
import type { IVideo } from "@/types";

export function FeedCard({
  type,
  videoDetails,
}: {
  type: "profile" | "public" | "private";
  videoDetails: IVideo;
}) {
  return (
    <div className="border rounded-md">
      <Image
        src={"/header.svg"}
        alt="Video title thumbnail"
        width={1080}
        height={1920}
        quality={100}
        className="aspect-video object-cover"
      />
      <div className="p-5 flex items-center justify-between">
        {videoDetails.status !== "PROCESSING" &&
        (type === "profile" || type === "private") ? (
          <Link
            href={
              type === "private"
                ? `/channel/private/${videoDetails.id}`
                : `/feed/${videoDetails.id}`
            }
          >
            <h1 className="text-xl font-bold">{videoDetails.title}</h1>
          </Link>
        ) : (
          <h1 className="text-xl font-bold">
            {videoDetails.title}{" "}
            {videoDetails.status === "PROCESSING" && "(PROCESSING)"}
          </h1>
        )}
        {videoDetails.status !== "PROCESSING" &&
          (type === "profile" || type === "private") && (
            <Popover>
              <PopoverTrigger>
                <MoreVertical />
              </PopoverTrigger>
              <PopoverContent className="grid gap-2 w-fit">
                <ChangeVideoVisibility
                  videoId={videoDetails.id}
                  visibility={type === "private" ? "PUBLIC" : "PRIVATE"}
                />
                <EditVideo videoId={videoDetails.id} />
                <DeleteVideo videoId={videoDetails.id} />
              </PopoverContent>
            </Popover>
          )}
      </div>
    </div>
  );
}
