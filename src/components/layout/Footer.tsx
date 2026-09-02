import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiMail, FiPhone, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import { useData } from "../../context/DataContext";

const Footer: React.FC = () => {
  const { data } = useData();

  return (
    <footer className="bg-navy text-white/80">
      <div className="max-w-content mx-auto px-4 md:px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h4 className="text-white font-display font-semibold text-lg mb-4">Office Address</h4>
          <p className="flex gap-2 text-sm leading-relaxed">
            <FiMapPin className="shrink-0 mt-1 text-primary" />
            {data.contact.officeAddress}
          </p>
          <p className="flex gap-2 text-sm mt-3 items-center">
            <FiMail className="shrink-0 text-primary" />
            {data.contact.email}
          </p>
          <p className="flex gap-2 text-sm mt-2 items-center">
            <FiPhone className="shrink-0 text-primary" />
            {data.contact.phone}
          </p>
        </div>

        <div>
          <h4 className="text-white font-display font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/gallery" className="hover:text-primary transition-colors">Photo Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-semibold text-lg mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            {data.categories.slice(0, 5).map((cat) => (
              <li key={cat.id}>
                <Link to={`/gallery?category=${cat.slug}`} className="hover:text-primary transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-semibold text-lg mb-4">Follow</h4>
          <div className="flex gap-3">
            <a href={data.contact.social.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors">
              <FiFacebook size={15} />
            </a>
            <a href={data.contact.social.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors">
              <FiInstagram size={15} />
            </a>
            <a href={data.contact.social.twitter} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors">
              <FiTwitter size={15} />
            </a>
            <a href={data.contact.social.youtube} target="_blank" rel="noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors">
              <FiYoutube size={15} />
            </a>
          </div>
          <p className="text-sm mt-5 text-white/50">{data.settings.footerText}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-content mx-auto px-4 md:px-6 py-5 text-center text-xs text-white/50">
          {data.settings.copyrightText}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
