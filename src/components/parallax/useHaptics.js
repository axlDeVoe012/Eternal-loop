import { useEffect } from "react";

export const useHaptics = (progress, beats = []) => {
  useEffect(() => {
    if (!navigator || !navigator.vibrate) return;

    const fired = new Set();

    const unsubscribe = progress.on("change", (v) => {
      beats.forEach((beat) => {
        if (v >= beat && !fired.has(beat)) {
          navigator.vibrate(10);
          fired.add(beat);
        }
      });
    });

    return () => {
      unsubscribe();
      fired.clear();
    };
  }, []);
};
