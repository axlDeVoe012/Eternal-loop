export const generateTimelineFromEvent = (event) => {
  const messageWeight = Math.min(event.message.length / 120, 1.2);

  return {
    image: [0.08, 0.28],
    date: [0.2, 0.32],
    title: [0.32, 0.6],
    message: [0.48, 0.48 + messageWeight * 0.35],
    secret: [0.8, 0.95],
  };
};
