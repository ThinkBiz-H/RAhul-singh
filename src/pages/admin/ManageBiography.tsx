import React, { useState } from "react";
import { FiPlus, FiTrash2, FiSave } from "react-icons/fi";
import { useData } from "../../context/DataContext";

const ManageBiography: React.FC = () => {
  const { data, updateBiography } = useData();
  const [heading, setHeading] = useState(data.biography.heading);
  const [subheading, setSubheading] = useState(data.biography.subheading);
  const [paragraphs, setParagraphs] = useState<string[]>(data.biography.paragraphs);
  const [saved, setSaved] = useState(false);

  const handleParagraphChange = (i: number, value: string) => {
    setParagraphs((prev) => prev.map((p, idx) => (idx === i ? value : p)));
  };

  const addParagraph = () => setParagraphs((prev) => [...prev, ""]);
  const removeParagraph = (i: number) => setParagraphs((prev) => prev.filter((_, idx) => idx !== i));

  const handleSave = () => {
    updateBiography({ heading, subheading, paragraphs: paragraphs.filter((p) => p.trim()) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-navy mb-1">Biography Text</h1>
      <p className="text-ink/50 text-sm mb-8">
        Update the biography heading and paragraphs. Manage photos on the{" "}
        <span className="text-primary font-medium">About Images</span> page.
      </p>

      <div className="bg-white rounded-xl shadow-card p-6 max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Heading</label>
            <input
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Sub Heading</label>
            <input
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        <label className="block text-sm font-medium text-navy mb-2">Biography Paragraphs</label>
        <div className="space-y-3">
          {paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2 items-start">
              <textarea
                value={p}
                onChange={(e) => handleParagraphChange(i, e.target.value)}
                rows={3}
                className="w-full border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary resize-none"
              />
              <button
                onClick={() => removeParagraph(i)}
                className="text-red-500 hover:text-red-600 p-2"
                aria-label="Remove paragraph"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addParagraph}
          className="flex items-center gap-1.5 text-sm text-primary font-medium mt-3"
        >
          <FiPlus size={14} /> Add Paragraph
        </button>

        <div className="flex items-center gap-4 mt-6">
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

export default ManageBiography;
