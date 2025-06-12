"use client";

import { useRef, useState, type FormEvent } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";

export function UploadVideoForm({ type }: { type: "edit" | "upload" }) {
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
  });
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [videoFile, setVideoFile] = useState<File | undefined>();
  const videoId = useRef(undefined);

  async function handleCreateMetadata(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/video/create`,
        metadata,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        const data = await response.data.videoId;
        videoId.current = data;

        await handleVideoUpload();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("ERROR:", error);
      }
    }
  }

  async function handleVideoUpload() {
    const urlResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/video/url/${videoId.current}`,
      { withCredentials: true }
    );

    if (urlResponse.status === 200) {
      const url = await urlResponse.data.url;

      await axios.put(url, videoFile, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (progressEvent.loaded * 100) / videoFile?.size
          );
          setUploadProgress(percentCompleted);

          if (percentCompleted === 100) {
            setLoading(false);
            setMetadata({
              title: "",
              description: "",
            });
            setVideoFile(undefined);

            alert("Video uploaded success and processing in progress!");
          }
        },
      });
    }
  }

  return (
    <form className="grid grid-cols-1 gap-3">
      {type !== "edit" && (
        <div className="grid grid-cols-1 gap-3">
          <Label>Upload video file</Label>
          <Input
            type="file"
            accept="video/mp4"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setVideoFile(e.target.files[0]);
              }
            }}
          />
        </div>
      )}
      <div className="grid grid-cols-1 gap-3">
        <Label>Video title</Label>
        <Input
          type="text"
          placeholder="enter title for your video"
          onChange={(e) => setMetadata({ ...metadata, title: e.target.value })}
          value={metadata.title}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <Label>Description</Label>
        <Textarea
          rows={10}
          placeholder="enter description"
          onChange={(e) =>
            setMetadata({ ...metadata, description: e.target.value })
          }
          value={metadata.description}
        />
      </div>

      <div className="mt-2">
        {type === "upload" ? (
          <Button
            disabled={loading}
            onClick={handleCreateMetadata}
            className="w-full mx-auto"
          >
            {loading ? `${uploadProgress}% uploaded` : "Upload video"}
          </Button>
        ) : (
          <Button className="w-full mx-auto">Save changes</Button>
        )}
      </div>
    </form>
  );
}
