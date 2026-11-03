"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

type OapVideoProps = {
  src: string;
  poster: string;
  label: string;
  preload?: "none" | "metadata" | "auto";
};

/** Plays original self-hosted MP4 or losslessly remuxed HLS on all modern browsers. */
export default function OapVideo({
  src, poster, label, preload = "metadata",
}: OapVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let hls: Hls | undefined;
    if (src.endsWith(".m3u8") &&
        !video.canPlayType("application/vnd.apple.mpegurl") &&
        Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        maxBufferLength: 30,
        backBufferLength: 30,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
    } else {
      // MP4 and native HLS (including iOS Safari).
      video.src = src;
    }

    return () => {
      hls?.destroy();
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      controls
      playsInline
      preload={preload}
      poster={poster}
      aria-label={label}
    />
  );
}
