import React, { useState } from "react";
import { FiPlus, FiEdit2, FiSave, FiX } from "react-icons/fi";
import { useData } from "../../context/DataContext";
import { ImageUpload } from "../../components/shared/ImageUpload";
import ImageTile from "../../components/shared/ImageTile";
import type { CloudinaryUploadResult } from "../../config/cloudinary";
import type { SlideItem } from "../../types";

const emptyTextFields = { title: "", subtitle: "", buttonText: "", buttonLink: "/contact" };

const ManageHero: React.FC = () => {
  const { data, addSlide, updateSlide, replaceSlideImage, deleteSlide } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState(emptyTextFields);
  const [newSlideText, setNewSlideText] = useState(emptyTextFields);
  const [newSlideUpload, setNewSlideUpload] = useState<CloudinaryUploadResult | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const startEdit = (slide: SlideItem) => {
    setEditingId(slide.id);
    setDraft({
      title: slide.title,
      subtitle: slide.subtitle,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink,
    });
  };

  const saveEdit = (id: string) => {
    updateSlide(id, draft);
    setEditingId(null);
  };

  const handleAdd = () => {
    if (!newSlideUpload || !newSlideText.title) return;
    addSlide(newSlideText, newSlideUpload);
    setNewSlideText(emptyTextFields);
    setNewSlideUpload(null);
    setShowAdd(false);
  };

  const slides = [...data.hero.slides].sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl text-navy">Hero Images</h1>
          <p className="text-ink/50 text-sm">Manage the homepage banner slides — stored on Cloudinary</p>
        </div>
        <button
          onClick={() => setShowAdd((s) => !s)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors"
        >
          <FiPlus size={16} /> Add Slide
        </button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-xl shadow-card p-6 mb-8">
          <h2 className="font-semibold text-navy mb-4">New Slide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUpload
              label="Background Image"
              section="hero"
              value={newSlideUpload?.url}
              onUploaded={setNewSlideUpload}
              onClear={() => setNewSlideUpload(null)}
            />
            <div className="space-y-3">
              <input
                placeholder="Heading (slogan)"
                value={newSlideText.title}
                onChange={(e) => setNewSlideText((s) => ({ ...s, title: e.target.value }))}
                className="w-full border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
              <input
                placeholder="Sub heading"
                value={newSlideText.subtitle}
                onChange={(e) => setNewSlideText((s) => ({ ...s, subtitle: e.target.value }))}
                className="w-full border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
              <div className="flex gap-3">
                <input
                  placeholder="Button text"
                  value={newSlideText.buttonText}
                  onChange={(e) => setNewSlideText((s) => ({ ...s, buttonText: e.target.value }))}
                  className="w-1/2 border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
                <input
                  placeholder="Button link"
                  value={newSlideText.buttonLink}
                  onChange={(e) => setNewSlideText((s) => ({ ...s, buttonLink: e.target.value }))}
                  className="w-1/2 border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-5">
            <button
              onClick={() => {
                setShowAdd(false);
                setNewSlideUpload(null);
                setNewSlideText(emptyTextFields);
              }}
              className="text-sm text-ink/60 px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!newSlideUpload || !newSlideText.title}
              className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors disabled:opacity-50"
            >
              Save Slide
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white rounded-xl shadow-card p-4 flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-52 shrink-0">
              <ImageTile
                src={slide.image}
                alt={slide.title}
                section="hero"
                aspect="aspect-[4/3]"
                onReplaced={(result) => replaceSlideImage(slide.id, result)}
                onDelete={() => deleteSlide(slide.id)}
              />
            </div>

            {editingId === slide.id ? (
              <div className="flex-1 space-y-3">
                <input
                  value={draft.title}
                  onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                  className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <input
                  value={draft.subtitle}
                  onChange={(e) => setDraft((d) => ({ ...d, subtitle: e.target.value }))}
                  className="w-full border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <div className="flex gap-3">
                  <input
                    value={draft.buttonText}
                    onChange={(e) => setDraft((d) => ({ ...d, buttonText: e.target.value }))}
                    className="w-1/2 border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                  <input
                    value={draft.buttonLink}
                    onChange={(e) => setDraft((d) => ({ ...d, buttonLink: e.target.value }))}
                    className="w-1/2 border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => saveEdit(slide.id)}
                    className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
                  >
                    <FiSave size={14} /> Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex items-center gap-1.5 text-ink/60 text-sm px-4 py-2"
                  >
                    <FiX size={14} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="font-semibold text-navy">{slide.title}</p>
                  <p className="text-sm text-ink/60 mt-1">{slide.subtitle}</p>
                  <p className="text-xs text-ink/40 mt-1">
                    Button: {slide.buttonText || "—"} → {slide.buttonLink}
                  </p>
                </div>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => startEdit(slide)}
                    className="flex items-center gap-1.5 text-sm text-navy hover:text-primary"
                  >
                    <FiEdit2 size={14} /> Edit Text
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {slides.length === 0 && <p className="text-ink/50 text-sm">No slides yet. Add your first slide above.</p>}
      </div>
    </div>
  );
};

export default ManageHero;
