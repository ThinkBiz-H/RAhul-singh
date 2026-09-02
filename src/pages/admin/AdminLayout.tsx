import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiImage,
  FiUser,
  FiUsers,
  FiFolder,
  FiPhone,
  FiMail,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";

const links = [
  { to: "/admin", label: "Dashboard", icon: FiGrid, end: true },
  { to: "/admin/hero", label: "Hero Images", icon: FiImage, end: false },
  { to: "/admin/gallery", label: "Gallery Images", icon: FiFolder, end: false },
  {
    to: "/admin/about-images",
    label: "About Images",
    icon: FiUsers,
    end: false,
  },
  { to: "/admin/biography", label: "Biography Text", icon: FiUser, end: false },
  {
    to: "/admin/contact-banner",
    label: "Contact Banner",
    icon: FiImage,
    end: false,
  },
  { to: "/admin/contact", label: "Contact Info", icon: FiPhone, end: false },
  { to: "/admin/messages", label: "Messages", icon: FiMail, end: false },
];

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const { data } = useData();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const unreadCount = data.messages.filter((m) => !m.read).length;

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-display font-bold">
          RS
        </div>
        <div>
          <p className="font-display font-semibold text-white text-sm">
            Rahul Singh
          </p>
          <p className="text-white/40 text-xs">Rahul Singh</p>
        </div>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <link.icon size={17} />
            {link.label}
            {link.to === "/admin/messages" && unreadCount > 0 && (
              <span className="ml-auto bg-white text-primary text-[10px] font-bold rounded-full px-1.5 py-0.5">
                {unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="p-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <FiLogOut size={17} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-navy shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-navy flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden bg-white border-b border-line px-4 py-3 flex items-center justify-between">
          <span className="font-display font-semibold text-navy">
            Rahul Singh
          </span>
          <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
