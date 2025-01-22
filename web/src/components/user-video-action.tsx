"use client";

import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export function Like() {
  return (
    <Button>
      <ThumbsUp />
    </Button>
  );
}

export function Dislike() {
  return (
    <Button variant={"outline"}>
      <ThumbsDown />
    </Button>
  );
}
