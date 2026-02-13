import React from "react";
import { ParallaxProvider } from "../parallax/ParallaxProvider.jsx";
import { ParallaxChapter } from "../parallax/ParallaxChapter.jsx";
import { storyEvents } from "../../data/story.js";

export default function StorySection({ autoPlay = false }) {
  return (
    <div className="relative">
      <ParallaxProvider>
        <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
          {storyEvents.map((event, index) => (
            <ParallaxChapter
              key={index}
              event={event}
              index={index}
              totalChapters={storyEvents.length}
            />
          ))}
        </div>
      </ParallaxProvider>
    </div>
  );
}
