import React from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { useData } from "../context/DataContext";

const About: React.FC = () => {
  const { data } = useData();
  const { biography, contact } = data;

  const primaryImage =
    biography.aboutImages.find((img) => img.primary)?.image ||
    biography.aboutImages[0]?.image ||
    "";
  const otherImages = biography.aboutImages.filter(
    (img) => img.image !== primaryImage,
  );

  return (
    <div>
      <section className="relative h-[38vh] md:h-[46vh] bg-navy overflow-hidden flex items-center justify-center">
        <img
          src={primaryImage}
          alt="About banner"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-white text-3xl md:text-5xl"
          >
            About Us
          </motion.h1>
          <span className="block h-[3px] w-16 bg-primary rounded-full mt-4 mx-auto" />
        </div>
      </section>

      <section className="max-w-content mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-12 items-start">
          <div className="w-64 h-64 md:w-full md:h-auto md:aspect-square rounded-2xl overflow-hidden shadow-cardHover mx-auto md:mx-0">
            <img
              src={primaryImage}
              alt={biography.heading}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-navy">
              {biography.heading}
            </h2>
            <span className="block h-[3px] w-16 bg-primary rounded-full mt-3 mb-2" />
            <p className="text-primary font-semibold mb-5">
              {biography.subheading}
            </p>
            <div className="space-y-4 text-ink/80 leading-relaxed text-[15px] md:text-base">
              {biography.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-10 border-t border-line">
          <div className="flex gap-3 items-start">
            <FiMapPin className="text-primary shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-navy text-sm">Office Address</p>
              <p className="text-ink/60 text-sm mt-1">
                {contact.officeAddress}
              </p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <FiMail className="text-primary shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-navy text-sm">Email</p>
              <p className="text-ink/60 text-sm mt-1">{contact.email}</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <FiPhone className="text-primary shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-navy text-sm">Phone</p>
              <p className="text-ink/60 text-sm mt-1">{contact.phone}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
