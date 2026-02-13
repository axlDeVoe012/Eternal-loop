import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { resolutions2026 } from "../data/story";

// --- Helper component for each timeline item ---
const TimelineItem = ({ item, index, isEven }) => {
  const Icon = item.icon;
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: false });

  return (
    <div
      ref={ref}
      className={`relative flex items-center justify-between mb-48 ${
        isEven ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Text content – dim when out of view */}
      <motion.div
        initial={{ opacity: 0.3, x: isEven ? 120 : -120 }}
        animate={{
          opacity: isInView ? 1 : 0.3,
          x: isInView ? 0 : isEven ? 120 : -120,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-[42%] ${isEven ? "text-right" : "text-left"}`}
      >
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white tracking-wide">
          {item.goal}
        </h3>
        <div
          className={`h-[1px] w-14 bg-gold my-4 ${
            isEven ? "ml-auto" : "mr-auto"
          }`}
        />
        <p className="text-sm sm:text-base text-gray-400 italic font-light leading-relaxed">
          {item.desc}
        </p>
      </motion.div>

      {/* Central node */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isInView ? 1 : 0,
            opacity: isInView ? 1 : 0,
            rotate: isInView ? 360 : 0,
          }}
          transition={{ type: "spring", stiffness: 160, damping: 18, duration: 1 }}
          className="relative w-16 h-16 sm:w-20 sm:h-20 
                     bg-black/70 border-2 sm:border-4 border-gold 
                     rounded-full flex items-center justify-center 
                     backdrop-blur-md z-30
                     shadow-[0_0_30px_rgba(212,175,55,0.8)]"
        >
          <div className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-20" />
          <div className="text-gold">
            <Icon size={22} className="sm:w-7 sm:h-7" strokeWidth={1.5} />
          </div>
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="w-[42%]" />
    </div>
  );
};

// --- Main section component ---
const ResolutionsSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Floating dust particles
  const dustParticles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 20,
  }));

  return (
    <section id="resolutions-section" className="relative min-h-screen py-40 font-romantic bg-[#0A0A0A] overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#2b0f16] to-black" />

      {/* Gold Glow Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_70%)]" />

      {/* Vignette fades */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent pointer-events-none z-10" />

      {/* Floating gold dust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {dustParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-gold rounded-full opacity-20"
            style={{ left: p.x, top: p.y }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, -15, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-20 text-4xl sm:text-6xl text-gold mb-32 tracking-widest italic text-center"
      >
        Chapter 2026 — Our Vision
      </motion.h2>

      {/* Timeline Container – now with extra top/bottom padding to make the line longer */}
      <div ref={containerRef} className="relative max-w-6xl mx-auto px-6 z-10">
        {/* Static Spine – extends full height of container */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gray-700 to-transparent rounded-full" />

        {/* Animated Gold Spine */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] bg-gradient-to-b 
                     from-gold via-white to-gold 
                     rounded-full z-10 origin-top 
                     shadow-[0_0_18px_rgba(212,175,55,0.9)]"
        />

        {/* Spark at the tip */}
        <motion.div
          style={{ top: lineHeight }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-20 pointer-events-none"
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gold rounded-full blur-md opacity-90 animate-pulse" />
            <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-50" />
          </div>
        </motion.div>

        {/* Top spacer – adds extra line length above first item */}
        <div className="h-32" />

        {/* Timeline Items */}
        <div className="relative z-20">
          {resolutions2026.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isEven={isEven}
              />
            );
          })}
        </div>

        {/* Bottom spacer – adds extra line length below last item */}
        <div className="h-32" />
      </div>
    </section>
  );
};

export default ResolutionsSection;