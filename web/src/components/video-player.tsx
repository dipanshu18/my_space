"use client";

import { useEffect, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export function VideoPlayer({ src, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      // Initialize Video.js player
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        fluid: true,
        responsive: true,
        sources: [
          {
            src,
            type: "application/x-mpegURL", // MIME type for HLS
          },
        ],
        poster,
      });

      // Add event listeners if needed
      playerRef.current.on("error", () => {
        console.error("An error occurred during video playback");
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose(); // Dispose of the player on unmount
        playerRef.current = null;
      }
    };
  }, [src, poster]);

  return (
    <div data-vjs-player>
      {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
      <video
        ref={videoRef}
        className="video-js vjs-default-skin vjs-big-play-centered"
      />
    </div>
  );
}
