import React from "react";
import { FiFacebook, FiInstagram, FiExternalLink } from "react-icons/fi";
import type { SocialLinks } from "../../types";

interface SocialSectionProps {
  social: SocialLinks;
}

const SocialSection: React.FC<SocialSectionProps> = ({ social }) => {
  return (
    <section className="bg-primary/95 py-16 md:py-20">
      <div className="max-w-content mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">Connect With Us</h2>
          <span className="block h-[3px] w-16 bg-white rounded-full mt-3 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <a
            href={social.facebook}
            target="_blank"
            rel="noreferrer"
            className="bg-white rounded-lg shadow-cardHover p-6 flex flex-col items-center text-center hover:-translate-y-1 transition-transform"
          >
            <div className="w-14 h-14 rounded-full bg-[#1877F2]/10 flex items-center justify-center mb-4">
              <FiFacebook size={26} className="text-[#1877F2]" />
            </div>
            <h3 className="font-display font-semibold text-lg text-navy">Facebook Page</h3>
            <p className="text-ink/60 text-sm mt-2">Follow official updates, campaign photos and public announcements.</p>
            <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4">
              Visit page <FiExternalLink size={13} />
            </span>
          </a>

          <a
            href={social.instagram}
            target="_blank"
            rel="noreferrer"
            className="bg-white rounded-lg shadow-cardHover p-6 flex flex-col items-center text-center hover:-translate-y-1 transition-transform"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#feda75]/20 via-[#d62976]/20 to-[#4f5bd5]/20 flex items-center justify-center mb-4">
              <FiInstagram size={26} className="text-[#d62976]" />
            </div>
            <h3 className="font-display font-semibold text-lg text-navy">Instagram</h3>
            <p className="text-ink/60 text-sm mt-2">Behind the scenes moments, events and community programs.</p>
            <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4">
              Visit profile <FiExternalLink size={13} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
