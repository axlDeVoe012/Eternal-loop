import React from "react";
import { ParallaxProvider } from "../parallax/ParallaxProvider";
import { StoryChapter } from "./StoryChapter";
import { storyEvents } from "../data/story";

export default function StorySection() {
  return (
    <ParallaxProvider>
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
        {storyEvents.map((event, i) => (
          <StoryChapter key={i} event={event} />
        ))}
      </div>
    </ParallaxProvider>
  );
}
