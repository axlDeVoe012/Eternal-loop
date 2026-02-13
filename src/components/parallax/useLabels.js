import { useTransform } from "framer-motion";
import { useParallax } from "./ParallaxProvider";

export const useLabels = (labels) => {
  const { progress } = useParallax();

  return (name, from = 40) => {
    const range = labels[name];

    return {
      style: {
        opacity: useTransform(progress, range, [0, 1]),
        y: useTransform(progress, range, [from, 0]),
      },
    };
  };
};
