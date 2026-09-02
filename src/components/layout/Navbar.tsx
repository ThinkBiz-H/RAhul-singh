import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiSearch,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useData } from "../../context/DataContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Photo Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const Navbar: React.FC = () => {
  const { data } = useData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/gallery?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-card">
      {/* Top white bar */}
      <div className="bg-white">
        <div className="max-w-content mx-auto px-4 md:px-6 flex items-center justify-between py-3">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-display font-bold text-lg">
              RS
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold text-navy text-lg md:text-xl">
                Rahul Singh
              </p>
              <p className="text-[11px] text-ink/50 tracking-wide">
                Public Representative
              </p>
            </div>
          </NavLink>

          <div className="hidden md:flex items-center gap-4 text-navy/70">
            <a
              href={data.contact.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <FiFacebook size={17} />
            </a>
            <a
              href={data.contact.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <FiInstagram size={17} />
            </a>
            <a
              href={data.contact.social.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <FiTwitter size={17} />
            </a>
            <a
              href={data.contact.social.youtube}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <FiYoutube size={17} />
            </a>
          </div>
        </div>
      </div>

      {/* Dark nav bar */}
      <nav className={`bg-navy transition-all ${scrolled ? "py-2" : "py-3"}`}>
        <div className="max-w-content mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? "text-primary"
                      : "text-white/85 hover:text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            {searchOpen ? (
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-white/10 rounded px-2"
              >
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onBlur={() => !query && setSearchOpen(false)}
                  placeholder="Search gallery..."
                  className="bg-transparent text-white placeholder-white/50 text-sm px-2 py-1.5 outline-none w-40"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="text-white/80 hover:text-primary p-1"
                >
                  <FiSearch size={16} />
                </button>
              </form>
            ) : (
              <button
                aria-label="Open search"
                onClick={() => setSearchOpen(true)}
                className="text-white/85 hover:text-primary transition-colors"
              >
                <FiSearch size={17} />
              </button>
            )}
          </div>

          <button
            className="md:hidden text-white"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-navy border-t border-white/10 px-4 pb-4 pt-2 flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium py-1 ${isActive ? "text-primary" : "text-white/85"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-white/10 rounded px-2 mt-1"
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search gallery..."
                className="bg-transparent text-white placeholder-white/50 text-sm px-2 py-2 outline-none w-full"
              />
              <button
                type="submit"
                aria-label="Search"
                className="text-white/80 p-1"
              >
                <FiSearch size={16} />
              </button>
            </form>
            <div className="flex items-center gap-4 text-white/80 pt-1">
              <a
                href={data.contact.social.facebook}
                target="_blank"
                rel="noreferrer"
              >
                <FiFacebook size={16} />
              </a>
              <a
                href={data.contact.social.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <FiInstagram size={16} />
              </a>
              <a
                href={data.contact.social.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <FiTwitter size={16} />
              </a>
              <a
                href={data.contact.social.youtube}
                target="_blank"
                rel="noreferrer"
              >
                <FiYoutube size={16} />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
