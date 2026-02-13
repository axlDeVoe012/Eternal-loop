import React from "react";
import { motion } from "framer-motion";
import { ParallaxChapter } from "../parallax/ParallaxChapter";
import { useLabels } from "../parallax/useLabels";
import { useScrollAudio } from "../parallax/useScrollAudio";
import { useHaptics } from "../parallax/useHaptics";
import { useImagePreload } from "../parallax/useImagePreload";
import { CrossfadeImage } from "../parallax/CrossfadeImage";
import { useParallax } from "../parallax/ParallaxProvider";
import { generateTimelineFromEvent } from "./generateTimeline";

export const StoryChapter = ({ event }) => {
  const { progress } = useParallax();

  useScrollAudio(event.audio || "/audio/ambient-love.mp3");
  useImagePreload(event.img);
  useHaptics(progress, [0.25, 0.5, 0.75]);

  const labels = generateTimelineFromEvent(event);
  const at = useLabels(labels);

  return (
    <ParallaxChapter>
      <div className="absolute inset-0 bg-linear-to-b from-black via-[#2b0f16] to-black" />

      <div className="relative z-10 max-w-6xl grid md:grid-cols-2 gap-24">

        <motion.div {...at("image")}>
          <CrossfadeImage src={event.img} alt={event.title} />
        </motion.div>

        <div>
          <motion.span {...at("date")} className="text-gold text-3xl block mb-4">
            {event.date}
          </motion.span>

          <motion.h2 {...at("title")} className="text-6xl text-white mb-6">
            {event.title}
          </motion.h2>

          <motion.p {...at("message")} className="text-xl italic text-gray-300">
            “{event.message}”
          </motion.p>

          <motion.div {...at("secret")} className="mt-12 pt-8 border-t border-gold/20">
            <p className="text-gold/60 italic text-xl">
              {event.secretNote}
            </p>
          </motion.div>
        </div>

      </div>
    </ParallaxChapter>
  );
};
