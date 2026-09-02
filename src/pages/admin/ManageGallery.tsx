import React, { useMemo, useState } from "react";
import {
  FiPlus,
  FiTrash2,
  FiSearch,
  FiStar,
  FiCheckSquare,
  FiSquare,
  FiX,
} from "react-icons/fi";
import { useData } from "../../context/DataContext";
import { MultiImageUpload } from "../../components/shared/ImageUpload";
import ImageTile from "../../components/shared/ImageTile";
import type { CloudinaryUploadResult } from "../../config/cloudinary";

const ManageGallery: React.FC = () => {
  const {
    data,
    addImages,
    updateImage,
    replaceImage,
    addCategory,
    deleteCategory,
    bulkDeleteImages,
  } = useData();

  const [newCategory, setNewCategory] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [uploadCategory, setUploadCategory] = useState(
    data.categories[0]?.id || "",
  );
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;

  const filtered = useMemo(() => {
    let imgs = [...data.gallery].sort((a, b) => b.createdAt - a.createdAt);
    if (activeCategory !== "all")
      imgs = imgs.filter((g) => g.categoryId === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      imgs = imgs.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return imgs;
  }, [data.gallery, activeCategory, query]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    addCategory(newCategory.trim());
    setNewCategory("");
  };

  const handleUpload = (results: CloudinaryUploadResult[]) => {
    if (!uploadCategory) return;
    addImages(results, {
      title: "",
      categoryId: uploadCategory,
      description: "",
      tags: [],
      featured: false,
    });
  };

  const handleBulkDelete = () => {
    bulkDeleteImages(Array.from(selected));
    setSelected(new Set());
  };

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-navy mb-1">
        Gallery Management
      </h1>
      <p className="text-ink/50 text-sm mb-8">
        Manage categories and images shown in the photo gallery
      </p>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-card p-6 mb-8">
        <h2 className="font-semibold text-navy mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {data.categories.map((cat) => (
            <span
              key={cat.id}
              className="flex items-center gap-2 bg-surface border border-line rounded-full px-3 py-1.5 text-sm text-navy"
            >
              {cat.name}
              <button
                onClick={() => deleteCategory(cat.id)}
                className="text-ink/40 hover:text-red-500"
                aria-label={`Delete ${cat.name}`}
              >
                <FiX size={13} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2 max-w-md">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-1 border border-line rounded-md px-3 py-2 text-sm outline-none focus:border-primary"
            onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
          />
          <button
            onClick={handleAddCategory}
            className="flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
          >
            <FiPlus size={15} /> Add
          </button>
        </div>
      </div>

      {/* Upload */}
      <div className="bg-white rounded-xl shadow-card p-6 mb-8">
        <h2 className="font-semibold text-navy mb-4">Upload Images</h2>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="w-full md:w-56">
            <label className="block text-sm font-medium text-navy mb-1.5">
              Category
            </label>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary bg-white"
            >
              {data.categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 w-full">
            <MultiImageUpload
              section="gallery"
              label="Images (multiple allowed)"
              onUploaded={handleUpload}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              activeCategory === "all"
                ? "bg-primary text-white"
                : "bg-surface text-ink/70"
            }`}
          >
            All
          </button>
          {data.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                activeCategory === cat.id
                  ? "bg-primary text-white"
                  : "bg-surface text-ink/70"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-surface border border-line rounded-md px-2">
            <FiSearch className="text-ink/40" size={14} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="bg-transparent px-2 py-1.5 text-sm outline-none w-40"
            />
          </div>
          {selected.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-3 py-1.5 rounded-md"
            >
              <FiTrash2 size={14} /> Delete ({selected.size})
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-ink/50 mb-4">
        {filtered.length} image{filtered.length !== 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginated.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-lg shadow-card overflow-hidden"
          >
            <div className="relative">
              <ImageTile
                src={img.image}
                alt={img.title}
                section="gallery"
                aspect="aspect-[4/3]"
                onReplaced={(result) => replaceImage(img.id, result)}
              >
                <button
                  type="button"
                  onClick={() =>
                    updateImage(img.id, { featured: !img.featured })
                  }
                  className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md transition-colors ${
                    img.featured
                      ? "bg-primary text-white"
                      : "bg-surface text-ink/60 hover:bg-line"
                  }`}
                >
                  <FiStar size={12} /> {img.featured ? "Featured" : "Feature"}
                </button>
              </ImageTile>
              <button
                onClick={() => toggleSelect(img.id)}
                className="absolute top-2 left-2 bg-white/90 rounded p-1 text-navy z-10"
                aria-label="Select image"
              >
                {selected.has(img.id) ? (
                  <FiCheckSquare size={16} />
                ) : (
                  <FiSquare size={16} />
                )}
              </button>
            </div>
            <div className="p-3">
              <input
                value={img.title}
                onChange={(e) => updateImage(img.id, { title: e.target.value })}
                className="w-full text-sm font-medium text-navy border-0 outline-none focus:ring-1 focus:ring-primary rounded px-1 -mx-1"
              />
              <select
                value={img.categoryId}
                onChange={(e) =>
                  updateImage(img.id, { categoryId: e.target.value })
                }
                className="w-full text-xs text-ink/60 mt-1 border-0 outline-none bg-transparent"
              >
                {data.categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-ink/50 text-sm mt-6">No images found.</p>
      )}

      {page * PAGE_SIZE < filtered.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-2 rounded-md transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
