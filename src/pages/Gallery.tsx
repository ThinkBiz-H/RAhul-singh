import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useData } from "../context/DataContext";
import GalleryGrid from "../components/gallery/GalleryGrid";

const PAGE_SIZE = 12;

const Gallery: React.FC = () => {
  const { data } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialSearch);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setActiveCategory(searchParams.get("category") || "all");
    setQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const filtered = useMemo(() => {
    let imgs = [...data.gallery].sort((a, b) => b.createdAt - a.createdAt);
    if (activeCategory !== "all") {
      const cat = data.categories.find((c) => c.slug === activeCategory);
      imgs = imgs.filter((img) => img.categoryId === cat?.id);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      imgs = imgs.filter(
        (img) =>
          img.title.toLowerCase().includes(q) ||
          img.description.toLowerCase().includes(q) ||
          img.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return imgs;
  }, [data.gallery, data.categories, activeCategory, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(0, page * PAGE_SIZE);

  const handleCategoryClick = (slug: string) => {
    setPage(1);
    const params: Record<string, string> = {};
    if (slug !== "all") params.category = slug;
    if (query) params.search = query;
    setSearchParams(params);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    const params: Record<string, string> = {};
    if (activeCategory !== "all") params.category = activeCategory;
    if (query) params.search = query;
    setSearchParams(params);
  };

  return (
    <div>
      <section className="relative py-14 md:py-16 bg-navy text-center">
        <h1 className="font-display font-bold text-white text-3xl md:text-4xl">Photo Gallery</h1>
        <span className="block h-[3px] w-16 bg-primary rounded-full mt-4 mx-auto" />
      </section>

      <section className="max-w-content mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryClick("all")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-primary text-white"
                  : "bg-surface text-ink/70 hover:bg-line"
              }`}
            >
              All
            </button>
            {data.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.slug
                    ? "bg-primary text-white"
                    : "bg-surface text-ink/70 hover:bg-line"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearchSubmit} className="flex items-center bg-surface border border-line rounded-md px-3 shrink-0">
            <FiSearch className="text-ink/40" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search photos..."
              className="bg-transparent px-2 py-2 text-sm outline-none w-full md:w-56"
            />
          </form>
        </div>

        <p className="text-sm text-ink/50 mb-6">{filtered.length} photo{filtered.length !== 1 ? "s" : ""} found</p>

        <GalleryGrid images={paginated} categories={data.categories} />

        {page < totalPages && (
          <div className="text-center mt-10">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-7 py-2.5 rounded-md transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Gallery;
