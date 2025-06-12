"use client";

import { dislikeVideo, likeVideo } from "@/actions/video-action";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";

export function Like({ videoId, count }: { videoId: string; count: number }) {
  const router = useRouter();

  return (
    <Button
      onClick={async (e) => {
        e.preventDefault();
        await likeVideo(videoId);
        router.refresh();
      }}
    >
      {count} <ThumbsUp />
    </Button>
  );
}

export function Dislike({
  videoId,
  count,
}: {
  videoId: string;
  count: number;
}) {
  const router = useRouter();

  return (
    <Button
      variant={"outline"}
      onClick={async (e) => {
        e.preventDefault();
        await dislikeVideo(videoId);
        router.refresh();
      }}
    >
      {count} <ThumbsDown />
    </Button>
  );
}
