import { useEffect } from "react";
import { motionValue, animate } from "framer-motion";

/**
 * Returns a motionValue that goes from 0→1 over the timeline
 * @param {number} chapters - number of chapters
 * @param {number} duration - total duration in seconds
 * @param {function} onComplete - optional callback
 */
export const useTimeline = ({ chapters, duration = 30, onComplete }) => {
  const autoProgress = motionValue(0);

  useEffect(() => {
    const controls = animate(autoProgress, 1, {
      duration: duration,
      ease: "linear",
      onComplete: () => onComplete?.(),
    });

    return () => controls.stop();
  }, [chapters, duration, onComplete]);

  return autoProgress;
};
