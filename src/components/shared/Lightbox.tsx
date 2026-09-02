import React, { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface LightboxImage {
  src: string;
  title?: string;
  caption?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, index, onClose, onNavigate }) => {
  const total = images.length;

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + total) % total);
  }, [index, total, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % total);
  }, [index, total, onNavigate]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [goPrev, goNext, onClose]);

  if (total === 0) return null;
  const current = images[index];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111417]/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button
          aria-label="Close"
          className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-primary transition-colors p-2"
          onClick={onClose}
        >
          <FiX size={30} />
        </button>

        {total > 1 && (
          <button
            aria-label="Previous image"
            className="absolute left-2 md:left-6 text-white/80 hover:text-primary transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            <FiChevronLeft size={38} />
          </button>
        )}

        <motion.div
          key={current.src}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="max-w-[92vw] max-h-[86vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={current.src}
            alt={current.title || "gallery image"}
            className="max-w-[92vw] max-h-[76vh] object-contain rounded shadow-2xl"
          />
          {(current.title || current.caption) && (
            <div className="text-center mt-4 text-white/90 px-4">
              {current.title && <p className="font-display font-semibold text-lg">{current.title}</p>}
              {current.caption && <p className="text-sm text-white/60 mt-1">{current.caption}</p>}
            </div>
          )}
          {total > 1 && (
            <p className="text-white/40 text-xs mt-3 tracking-wide">
              {index + 1} / {total}
            </p>
          )}
        </motion.div>

        {total > 1 && (
          <button
            aria-label="Next image"
            className="absolute right-2 md:right-6 text-white/80 hover:text-primary transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            <FiChevronRight size={38} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
