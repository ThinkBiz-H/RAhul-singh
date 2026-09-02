import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/shared/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

import Login from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManageHero from "./pages/admin/ManageHero";
import ManageBiography from "./pages/admin/ManageBiography";
import ManageAboutImages from "./pages/admin/ManageAboutImages";
import ManageGallery from "./pages/admin/ManageGallery";
import ManageContact from "./pages/admin/ManageContact";
import ManageContactBanner from "./pages/admin/ManageContactBanner";
import Messages from "./pages/admin/Messages";

const App: React.FC = () => {
  return (
    <DataProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public site */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Admin */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="hero" element={<ManageHero />} />
              <Route path="gallery" element={<ManageGallery />} />
              <Route path="about-images" element={<ManageAboutImages />} />
              <Route path="biography" element={<ManageBiography />} />
              <Route path="contact-banner" element={<ManageContactBanner />} />
              <Route path="contact" element={<ManageContact />} />
              <Route path="messages" element={<Messages />} />
            </Route>

            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </DataProvider>
  );
};

export default App;
