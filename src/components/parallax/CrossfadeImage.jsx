import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const CrossfadeImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
      setLoaded(true);
    };
  }, [src]);

  if (!loaded) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={currentSrc}
        src={currentSrc}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        className="w-full h-full object-cover rounded-3xl"
      />
    </AnimatePresence>
  );
};
