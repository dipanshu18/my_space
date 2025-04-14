"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function UploadVideoForm({ type }: { type: "edit" | "upload" }) {
  return (
    <form className="grid grid-cols-1 gap-3">
      <div className="grid grid-cols-1 gap-3">
        <Label>Upload video file</Label>
        <Input type="file" accept="video/mp4" />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <Label>Video title</Label>
        <Input type="text" placeholder="enter title for your video" />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <Label>Description</Label>
        <Textarea rows={10} placeholder="enter description" />
      </div>

      <div className="mt-2">
        {type === "upload" ? (
          <Button className="w-full mx-auto">Upload video</Button>
        ) : (
          <Button className="w-full mx-auto">Save changes</Button>
        )}
      </div>
    </form>
  );
}
