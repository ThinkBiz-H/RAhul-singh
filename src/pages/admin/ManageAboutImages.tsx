import React from "react";
import { FiStar } from "react-icons/fi";
import { useData } from "../../context/DataContext";
import { MultiImageUpload } from "../../components/shared/ImageUpload";
import ImageTile from "../../components/shared/ImageTile";
import type { CloudinaryUploadResult } from "../../config/cloudinary";

const ManageAboutImages: React.FC = () => {
  const {
    data,
    addAboutImage,
    replaceAboutImage,

    setPrimaryAboutImage,
  } = useData();

  const handleUpload = (results: CloudinaryUploadResult[]) => {
    results.forEach((result, i) => {
      addAboutImage(
        `About photo ${data.biography.aboutImages.length + i + 1}`,
        result,
      );
    });
  };

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-navy mb-1">
        About Images
      </h1>
      <p className="text-ink/50 text-sm mb-8">
        Manage the photos shown on the Home and About pages — stored on
        Cloudinary. The photo marked
        <span className="text-primary font-medium"> Primary</span> is used as
        the main circular profile image.
      </p>

      <div className="bg-white rounded-xl shadow-card p-6 mb-8">
        <h2 className="font-semibold text-navy mb-4">Add Image</h2>
        <MultiImageUpload
          section="about"
          label="Upload one or more About photos"
          onUploaded={handleUpload}
        />
      </div>

      {data.biography.aboutImages.length === 0 ? (
        <p className="text-ink/50 text-sm">
          No about images yet. Upload one above.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.biography.aboutImages.map((img) => (
            <div key={img.id} className="relative">
              {img.primary && (
                <span className="absolute top-2 left-2 z-10 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <FiStar size={10} /> Primary
                </span>
              )}
              <ImageTile
                src={img.image}
                alt={img.alt}
                section="about"
                aspect="aspect-square"
                onReplaced={(result) => replaceAboutImage(img.id, result)}
              >
                {!img.primary && (
                  <button
                    type="button"
                    onClick={() => setPrimaryAboutImage(img.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary hover:text-white px-2.5 py-1.5 rounded-md transition-colors"
                  >
                    <FiStar size={12} /> Set Primary
                  </button>
                )}
              </ImageTile>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageAboutImages;
