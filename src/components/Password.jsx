import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const letterSequence = ["W", "A", "M", "E"];

const Password = ({ onUnlock }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputsRef = useRef([]);

  /* ---------------- PARALLAX ---------------- */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      rotateX.set(-y);
      rotateY.set(x);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  /* ---------------- FLOATING PARTICLES ---------------- */
  const particles = useMemo(() => {
    return [...Array(20)].map((_, i) => {
      // Cycle letters every 4 particles: 0=W, 1=A, 2=M, 3=E, 4=W, 5=A...
      const letterIndex = i % 4;
      // First 8 particles are letters, rest are hearts (or mix 50/50)
      const isLetter = i < 10 && i % 2 === 0;
      
      return {
        id: i,
        left: Math.random() * 100,
        duration: 10 + Math.random() * 6,
        delay: i * 0.6,
        type: isLetter ? "letter" : "heart",
        letter: letterSequence[letterIndex],
      };
    });
  }, []);

  /* ---------------- PIN LOGIC ---------------- */
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) inputsRef.current[index + 1].focus();

    const fullPin = newPin.join("");

    if (fullPin.length === 4) {
      if (fullPin === "0107") {
        setSuccess(true);
        setTimeout(() => onUnlock(), 1200);
      } else {
        setError(true);
        setTimeout(() => {
          setPin(["", "", "", ""]);
          inputsRef.current[0].focus();
          setError(false);
        }, 900);
      }
    }
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden font-romantic">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#2b0f16] to-black" />

      {/* Floating SVG Hearts + Letters */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: -1000,
            opacity: [0, 0.7, 0],
            rotate: [0, 15, -15, 0], // slight rotation
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          className="absolute bottom-0"
          style={{ left: `${p.left}%` }}
        >
          {p.type === "heart" ? (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="opacity-40"
            >
              <path
                d="M12 21s-6-4.35-9-8.28C-1 7.5 3 3 7.5 6 9 7 12 10 12 10s3-3 4.5-4C21 3 25 7.5 21 12.72 18 16.65 12 21 12 21z"
                fill="#ff4d6d"
              />
            </svg>
          ) : (
            <span className="text-[#d4af37]/30 text-3xl font-bold tracking-widest">
              {p.letter}
            </span>
          )}
        </motion.div>
      ))}

      {/* Main Card with Parallax */}
      <motion.div
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl px-6 sm:px-12 py-10 sm:py-14 shadow-2xl shadow-black/60 text-center">

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl mb-10 tracking-[0.3em] uppercase font-bold">
            <span className="bg-gradient-to-r from-[#d4af37] via-white to-[#d4af37] bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">
              Our Code
            </span>
          </h2>

          {/* PIN Boxes */}
          <div className="flex justify-center gap-4 sm:gap-6">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className={`
                  w-14 h-16 sm:w-16 sm:h-20
                  text-3xl sm:text-4xl
                  text-center rounded-xl
                  bg-white/5 backdrop-blur-md
                  border transition-all duration-300
                  focus:outline-none
                  ${
                    error
                      ? "border-red-500 text-red-500 animate-shake"
                      : "border-[#d4af37] text-[#d4af37]"
                  }
                `}
              />
            ))}
          </div>

          {/* Heartbeat Pulse on Success */}
          {success && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.8, repeat: 2 }}
              className="mt-8 text-4xl text-pink-500"
            >
              ❤️
            </motion.div>
          )}

          <p className="text-[#d4af37]/40 mt-10 text-sm sm:text-lg italic tracking-wider">
            The day our love began...
          </p>
        </div>
      </motion.div>

      {/* Animations */}
      <style jsx>{`
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
};

export default Password;
