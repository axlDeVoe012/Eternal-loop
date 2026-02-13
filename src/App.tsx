import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Volume2, VolumeX } from "lucide-react";

// Components
import Password from "./components/Password";
import Ring from "./components/Ring";
import StorySection from "./components/story/StorySection";
import ResolutionsSection from "./components/ResolutionsSection";
import FinalReveal from "./components/FinalReveal";

/* ---------------------------- HERO SECTION ---------------------------- */
const HeroSection = () => {
  const [mouseX, setMouseX] = useState(0);

  useEffect(() => {
    const move = (e: MouseEvent) => setMouseX(e.clientX / window.innerWidth);
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const shimmer = `${mouseX * 100}%`;

  return (
    <section className="relative h-screen overflow-hidden flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 bg-linear-to-b from-black via-[#2b0f16] to-black" />

      <div className="absolute top-0 left-0 w-full h-[65vh] z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={1.5} />
          <Suspense fallback={null}>
            <Ring />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-20 mt-[45vh] sm:mt-[55vh] px-4 sm:px-6 font-romantic">
        <motion.h1
          className="text-3xl sm:text-5xl md:text-7xl font-light tracking-widest text-transparent bg-clip-text"
          style={{
            backgroundImage: `linear-gradient(120deg,#F4E4B1,#D4AF37,#F4E4B1)`,
            backgroundSize: "200% 200%",
            backgroundPosition: shimmer,
          }}
        >
          TO MY DEAREST WAME
        </motion.h1>

        <p className="mt-4 sm:mt-6 text-[#F4E4B1] tracking-widest text-xs sm:text-sm uppercase">
          Forever & Always
        </p>
      </div>
    </section>
  );
};

/* ---------------------------- MAIN APP ---------------------------- */
export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio - use the song from public folder
    audioRef.current = new Audio("/audio/so-amazing.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // For mobile devices: play after first interaction
    const unlockAudio = () => {
      if (isUnlocked) {
        audioRef.current?.play().catch(() => {});
        setIsPlaying(true);
      }
      window.removeEventListener("touchstart", unlockAudio);
    };
    window.addEventListener("touchstart", unlockAudio, { once: true });
  }, [isUnlocked]);

  // Play automatically after login (desktop/mobile handled)
  useEffect(() => {
    if (isUnlocked && audioRef.current) {
      audioRef.current.play().catch(() => {
        // autoplay might be blocked until user interacts
      });
      setIsPlaying(true);
    }
  }, [isUnlocked]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-white overflow-x-hidden font-romantic">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="password-screen"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
          >
            <Password onUnlock={() => setIsUnlocked(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* Hero */}
            <HeroSection />

            {/* Story */}
            <StorySection />

            {/* 2026 Vision */}
            <ResolutionsSection />

            {/* Final Reveal */}
            <FinalReveal />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music toggle - mobile friendly */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 bg-black/60 backdrop-blur-xl p-3 sm:p-4 rounded-full border border-gold/30"
        aria-label="Toggle music"
      >
        {isPlaying ? <Volume2 size={20} className="sm:w-6 sm:h-6" /> : <VolumeX size={20} className="sm:w-6 sm:h-6" />}
      </button>
    </div>
  );
}
