import React, { useState } from "react";
import { FiSave } from "react-icons/fi";
import { useData } from "../../context/DataContext";

const ManageContact: React.FC = () => {
  const { data, updateContact } = useData();
  const [form, setForm] = useState(data.contact);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateContact(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-navy mb-1">Contact & Social Links</h1>
      <p className="text-ink/50 text-sm mb-8">Update office details and social media links</p>

      <div className="bg-white rounded-xl shadow-card p-6 max-w-2xl space-y-5">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Office Address</label>
          <textarea
            value={form.officeAddress}
            onChange={(e) => setForm((f) => ({ ...f, officeAddress: e.target.value }))}
            rows={2}
            className="w-full border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Working Hours</label>
          <input
            value={form.workingHours}
            onChange={(e) => setForm((f) => ({ ...f, workingHours: e.target.value }))}
            className="w-full border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Google Map Embed URL</label>
          <input
            value={form.mapEmbedUrl}
            onChange={(e) => setForm((f) => ({ ...f, mapEmbedUrl: e.target.value }))}
            className="w-full border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <hr className="border-line" />
        <h2 className="font-semibold text-navy">Social Links</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Facebook</label>
            <input
              value={form.social.facebook}
              onChange={(e) => setForm((f) => ({ ...f, social: { ...f.social, facebook: e.target.value } }))}
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Instagram</label>
            <input
              value={form.social.instagram}
              onChange={(e) => setForm((f) => ({ ...f, social: { ...f.social, instagram: e.target.value } }))}
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Twitter / X</label>
            <input
              value={form.social.twitter}
              onChange={(e) => setForm((f) => ({ ...f, social: { ...f.social, twitter: e.target.value } }))}
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">YouTube</label>
            <input
              value={form.social.youtube}
              onChange={(e) => setForm((f) => ({ ...f, social: { ...f.social, youtube: e.target.value } }))}
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
          >
            <FiSave size={15} /> Save Changes
          </button>
          {saved && <span className="text-emerald-600 text-sm font-medium">Saved!</span>}
        </div>
      </div>
    </div>
  );
};

export default ManageContact;
