import React, { useRef, useEffect, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { useParallax } from "./ParallaxProvider";
import { CrossfadeImage } from "./CrossfadeImage";
import { ChevronDown } from "lucide-react";

export const ParallaxChapter = ({ event, index, totalChapters, audioTrigger, isLastChapter }) => {
  const ref = useRef(null);
  const { progress } = useParallax();
  const [triggered, setTriggered] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

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
      
      // Hide scroll indicator when approaching the end (leaving last chapter)
      if (isLastChapter && v > 0.85) {
        setShowScrollIndicator(false);
      } else if (isLastChapter && v <= 0.85) {
        setShowScrollIndicator(true);
      }
    });
    return () => unsubscribe();
  }, [progress, triggered, index, audioTrigger, totalChapters, showSecret, isLastChapter]);

  return (
    <section
      ref={ref}
      className="h-screen sm:h-screen snap-start snap-always flex flex-col items-center justify-start relative overflow-visible py-8 sm:py-12"
    >
      {/* Vertical timeline line - hidden on mobile */}
      <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gold/30 z-0" />

      {/* Image */}
      <motion.div
        style={{ y: yImage }}
        className="w-full max-w-4xl px-4 sm:px-0 relative cursor-pointer"
        onClick={() => setShowSecret(true)}
      >
        <CrossfadeImage src={event.img} alt={event.title} />

        {/* Secret Message Overlay */}
        {showSecret && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 text-center z-50 pointer-events-none">
            <p className="text-gold text-xl sm:text-3xl italic leading-relaxed">{event.secretNote}</p>
          </div>
        )}
      </motion.div>

      {/* Text below image with scroll animation */}
      <motion.div
        className="relative z-10 max-w-4xl text-center text-white mt-4 sm:mt-6 px-4 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span className="text-gold text-xl sm:text-3xl block mb-1 sm:mb-2">{event.date}</motion.span>
        <motion.h2 className="text-2xl sm:text-4xl md:text-6xl font-light mb-3 sm:mb-4">{event.title}</motion.h2>
        <motion.p className="text-gray-300 text-base sm:text-xl md:text-2xl leading-relaxed italic font-light">
          "{event.message}"
        </motion.p>
      </motion.div>

      {/* Scroll to Resolutions Indicator - Only on last chapter */}
      {isLastChapter && showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-30 cursor-pointer"
          onClick={() => {
            const resolutionsSection = document.getElementById('resolutions-section');
            if (resolutionsSection) {
              resolutionsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-gold text-sm sm:text-base tracking-widest uppercase">
              See Our 2026 Vision
            </span>
            <div className="w-12 h-12 rounded-full border-2 border-gold/60 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <ChevronDown className="text-gold w-6 h-6" strokeWidth={2} />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Timeline connector below text - hidden on mobile */}
      <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 top-[calc(100%+20px)] w-1 h-20 bg-gold/30 z-0" />
    </section>
  );
};
