import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiZoomIn } from "react-icons/fi";
import type { GalleryImage, GalleryCategory } from "../../types";
import Lightbox from "../shared/Lightbox";

interface GalleryGridProps {
  images: GalleryImage[];
  categories: GalleryCategory[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, categories }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categoryName = (id: string) => categories.find((c) => c.id === id)?.name || "";

  if (images.length === 0) {
    return <p className="text-center text-ink/50 py-10">No images found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {images.map((img, i) => (
          <motion.button
            key={img.id}
            type="button"
            onClick={() => setLightboxIndex(i)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: (i % 8) * 0.03 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-card bg-surface"
          >
            <img
              src={img.image}
              alt={img.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/50 transition-colors duration-300 flex items-center justify-center">
              <FiZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={26} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/80 to-transparent px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs font-medium truncate text-left">{img.title}</p>
              <p className="text-primary text-[10px] text-left">{categoryName(img.categoryId)}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images.map((img) => ({
            src: img.image,
            title: img.title,
            caption: categoryName(img.categoryId),
          }))}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(i) => setLightboxIndex(i)}
        />
      )}
    </>
  );
};

export default GalleryGrid;
