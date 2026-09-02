import React from "react";
import { motion } from "framer-motion";
import type { BiographyData } from "../../types";

interface BiographyProps {
  data: BiographyData;
}

const Biography: React.FC<BiographyProps> = ({ data }) => {
  const primaryImage =
    data.aboutImages.find((img) => img.primary)?.image || data.aboutImages[0]?.image || "";

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-content mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-[380px_1fr] gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto md:mx-0"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden ring-8 ring-surface shadow-cardHover mx-auto">
            <img src={primaryImage} alt={data.heading} className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-navy">{data.heading}</h2>
          <span className="block h-[3px] w-16 bg-primary rounded-full mt-3 mb-2" />
          <p className="text-primary font-semibold mb-5">{data.subheading}</p>
          <div className="space-y-4 text-ink/80 leading-relaxed text-[15px] md:text-base">
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Biography;
