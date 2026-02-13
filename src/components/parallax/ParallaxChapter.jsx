import React, { useRef, useEffect, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { useParallax } from "./ParallaxProvider";
import { CrossfadeImage } from "./CrossfadeImage";

export const ParallaxChapter = ({ event, index, totalChapters, audioTrigger }) => {
  const ref = useRef(null);
  const { progress } = useParallax();
  const [triggered, setTriggered] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  // Parallax transforms
  const yImage = useTransform(progress, [0, 1], ["0%", "5%"]);

  // Haptic + audio triggers
  useEffect(() => {
    const unsubscribe = progress.onChange((v) => {
      if (v > index / totalChapters && !triggered) {
        navigator.vibrate?.(10);
        if (audioTrigger) audioTrigger(index);
        setTriggered(true);
      }

      // Hide secret message when scrolling
      if (showSecret) setShowSecret(false);
    });
    return () => unsubscribe();
  }, [progress, triggered, index, audioTrigger, totalChapters, showSecret]);

  return (
    <section
      ref={ref}
      className="h-screen snap-start snap-always flex flex-col items-center justify-start relative overflow-visible py-12"
    >
      {/* Vertical timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gold/30 z-0" />

      {/* Image */}
      <motion.div
        style={{ y: yImage }}
        className="w-full max-w-4xl relative cursor-pointer"
        onClick={() => setShowSecret(true)}
      >
        <CrossfadeImage src={event.img} alt={event.title} />

        {/* Secret Message Overlay */}
        {showSecret && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-8 text-center z-50 pointer-events-none">
            <p className="text-gold text-3xl italic leading-relaxed">{event.secretNote}</p>
          </div>
        )}
      </motion.div>

      {/* Text below image with scroll animation */}
      <motion.div
        className="relative z-10 max-w-4xl text-center text-white mt-6 px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span className="text-gold text-3xl block mb-2">{event.date}</motion.span>
        <motion.h2 className="text-4xl sm:text-6xl font-light mb-4">{event.title}</motion.h2>
        <motion.p className="text-gray-300 text-xl sm:text-2xl leading-relaxed italic font-light">
          "{event.message}"
        </motion.p>
      </motion.div>

      {/* Timeline connector below text */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[calc(100%+20px)] w-1 h-20 bg-gold/30 z-0" />
    </section>
  );
};
