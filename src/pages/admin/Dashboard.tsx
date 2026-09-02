import React from "react";
import { FiFolder, FiImage, FiMail, FiLayers } from "react-icons/fi";
import { useData } from "../../context/DataContext";

const Dashboard: React.FC = () => {
  const { data } = useData();

  const cards = [
    { label: "Total Categories", value: data.categories.length, icon: FiFolder, color: "bg-blue-500" },
    { label: "Total Images", value: data.gallery.length, icon: FiImage, color: "bg-primary" },
    { label: "Total Messages", value: data.messages.length, icon: FiMail, color: "bg-emerald-500" },
    { label: "Hero Slides", value: data.hero.slides.length, icon: FiLayers, color: "bg-purple-500" },
  ];

  const recentUploads = [...data.gallery].sort((a, b) => b.createdAt - a.createdAt).slice(0, 8);

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-navy mb-1">Dashboard</h1>
      <p className="text-ink/50 text-sm mb-8">Overview of your website content</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-xl shadow-card p-5 flex items-center gap-4">
            <span className={`w-12 h-12 rounded-lg ${c.color} text-white flex items-center justify-center`}>
              <c.icon size={20} />
            </span>
            <div>
              <p className="text-2xl font-bold text-navy">{c.value}</p>
              <p className="text-xs text-ink/50">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="font-display font-semibold text-lg text-navy mb-5">Recent Uploads</h2>
        {recentUploads.length === 0 ? (
          <p className="text-ink/50 text-sm">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {recentUploads.map((img) => (
              <div key={img.id} className="aspect-square rounded-lg overflow-hidden shadow-card">
                <img src={img.image} alt={img.title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
