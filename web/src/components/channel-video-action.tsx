"use client";

import Link from "next/link";
import { EyeIcon, PenBox, Trash2 } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { changeVideoVisibility } from "@/actions/video";
import { useRouter } from "next/navigation";

export function DeleteVideo({ videoId }: { videoId: string }) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button variant={"destructive"}>
            <Trash2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit video details</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function EditVideo({ videoId }: { videoId: string }) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Link href={"/channel/edit/:id"}>
            <Button>
              <PenBox />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit video details</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ChangeVideoVisibility({
  videoId,
  visibility,
}: {
  videoId: string;
  visibility: "PRIVATE" | "PUBLIC";
}) {
  const router = useRouter();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            onClick={async (e) => {
              e.preventDefault();
              await changeVideoVisibility(videoId, visibility);

              router.refresh();
            }}
          >
            <EyeIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Change visibility</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
