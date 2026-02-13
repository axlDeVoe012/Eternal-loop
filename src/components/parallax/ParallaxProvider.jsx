import React, { createContext, useContext } from "react";
import { useScroll, useSpring } from "framer-motion";
import { APPLE_SPRING } from "./constants";

const ParallaxContext = createContext(null);

export const useParallax = () => {
  const ctx = useContext(ParallaxContext);
  if (!ctx) throw new Error("useParallax must be used inside ParallaxProvider");
  return ctx;
};

export const ParallaxProvider = ({ children, autoProgress }) => {
  // If autoProgress exists, use it; otherwise scroll-driven
  const { scrollYProgress } = useScroll();
  const source = autoProgress || scrollYProgress;

  const smooth = useSpring(source, APPLE_SPRING);

  return (
    <ParallaxContext.Provider value={{ progress: smooth }}>
      {children}
    </ParallaxContext.Provider>
  );
};
