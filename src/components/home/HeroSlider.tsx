import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { SlideItem } from "../../types";

interface HeroSliderProps {
  slides: SlideItem[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  const [active, setActive] = useState(0);
  const ordered = [...slides].sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (ordered.length <= 1) return;
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % ordered.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [ordered.length]);

  if (ordered.length === 0) return null;
  const slide = ordered[active];

  return (
    <section className="relative w-full h-[62vh] md:h-[78vh] overflow-hidden bg-navy">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/10" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-content mx-auto h-full flex flex-col items-center justify-center text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + "-text"}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-bold text-white text-3xl md:text-5xl leading-tight max-w-3xl mx-auto drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-primary font-semibold text-lg md:text-xl mt-4">{slide.subtitle}</p>
            {slide.buttonText && (
              <Link
                to={slide.buttonLink || "/contact"}
                className="inline-block mt-8 bg-primary hover:bg-primary-hover text-white font-semibold px-7 py-3 rounded-md transition-colors shadow-cardHover"
              >
                {slide.buttonText}
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {ordered.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {ordered.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-7 bg-primary" : "w-3 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Wave divider at bottom */}
      <div className="absolute -bottom-1 left-0 w-full leading-[0] z-10">
        <svg viewBox="0 0 1440 90" className="w-full h-[50px] md:h-[80px]" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSlider;
