"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

import { commentOnVideo } from "@/actions/video-action";

export function CommentInput({ videoId }: { videoId: string }) {
  const router = useRouter();
  const commentRef = useRef<HTMLInputElement>(null);

  async function handleCommentOnVideo(e: FormEvent) {
    e.preventDefault();
    if (commentRef.current?.value.trim()) {
      await commentOnVideo(videoId, commentRef.current.value);
      commentRef.current.value = "";
      router.refresh();
    }
  }

  return (
    <div className="my-5 flex items-center gap-2">
      <Input placeholder="add your comment" ref={commentRef} />
      <Button onClick={handleCommentOnVideo}>
        <Send />
      </Button>
    </div>
  );
}
