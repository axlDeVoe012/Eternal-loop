import { useEffect } from "react";

export const useImagePreload = (src) => {
  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
  }, [src]);
};
