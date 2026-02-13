import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const FinalReveal = () => {
    const [revealed, setRevealed] = useState(false);

    const handleReveal = () => {
        setRevealed(true);

        // Custom gold, white, burgundy confetti
        confetti({
            particleCount: 250,
            spread: 120,
            origin: { y: 0.7 },
            colors: ["#D4AF37", "#F4E4B1", "#ffffff", "#1A0505"],
            ticks: 300,
            gravity: 0.8,
            scalar: 1.2,
        });
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 font-romantic bg-[#0A0A0A]">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#2b0f16] to-black" />

            <AnimatePresence mode="wait">
                {!revealed ? (
                    <motion.div
                        key="button"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <button
                            onClick={handleReveal}
                            className="px-8 sm:px-12 py-4 sm:py-6 border-2 border-gold text-gold text-2xl sm:text-4xl italic rounded-lg hover:bg-gold hover:text-black transition-all duration-700 shadow-[0_0_30px_rgba(212,175,55,0.2)] active:scale-95"
                        >
                            Open My Heart
                        </button>

                        <p className="mt-6 sm:mt-8 text-gold/40 text-lg sm:text-2xl italic animate-pulse tracking-widest max-w-xs sm:max-w-md">
                            A final note for Wame...
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="message"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative z-10 max-w-full sm:max-w-3xl space-y-6 sm:space-y-8 bg-black/40 p-6 sm:p-12 rounded-2xl backdrop-blur-md border border-gold/10"
                    >
                        <h2 className="text-3xl sm:text-5xl md:text-6xl text-gold tracking-widest leading-tight">
                            To My Wame,
                        </h2>

                        <div className="space-y-4 sm:space-y-6 text-white text-base sm:text-lg md:text-xl leading-relaxed italic opacity-90">
                            <p>
                                Hey babe, I hope you are doing well and that you’ll enjoy this gift from me to you.
                                It took me four days of sneaking around to create this, trying my best to hide it from you
                                since you usually know every single project I’m working on!
                            </p>

                            <p>
                                To me, this isn't just a website; it’s a <strong>symbol</strong> of where we come from, where we are today,
                                and where we are going together. It’s a way of showing how much I love and appreciate you,
                                and how far I’m willing to go just to make you feel as special and loved as you truly are.
                            </p>
                        </div>

                        <div className="h-px w-24 sm:w-32 bg-gold/30 mx-auto" />

                        <p className="text-2xl sm:text-4xl text-gold font-bold">
                            Happy Valentine's Day
                        </p>

                        <p className="text-base sm:text-xl text-gold/40 tracking-[0.3em] sm:tracking-[0.5em] uppercase font-light">
                            Shaun & Wame ∞
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default FinalReveal;
