import { useEffect, useRef } from "react";
import { useTransform } from "framer-motion";
import { useParallax } from "./ParallaxProvider";

export const useScrollAudio = (src, range = [0.15, 0.85]) => {
  const { progress } = useParallax();
  const audioRef = useRef(null);
  const volume = useTransform(progress, range, [0, 1]);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";

    const unlock = () => {
      audio.play().catch(() => {});
      window.removeEventListener("touchstart", unlock);
    };

    window.addEventListener("touchstart", unlock, { once: true });

    audioRef.current = audio;

    const unsubscribe = volume.on("change", (v) => {
      audio.volume = Math.min(Math.max(v, 0), 1);
    });

    return () => {
      unsubscribe();
      audio.pause();
      audio.src = "";
    };
  }, []);

  return null;
};
