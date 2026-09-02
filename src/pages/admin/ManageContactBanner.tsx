import React from "react";
import { useData } from "../../context/DataContext";
import { ImageUpload } from "../../components/shared/ImageUpload";

const ManageContactBanner: React.FC = () => {
  const { data, replaceContactBanner, clearContactBanner } = useData();

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-navy mb-1">Contact Banner</h1>
      <p className="text-ink/50 text-sm mb-8">
        This image is shown at the top of the Contact page — stored on Cloudinary. Click the image to
        replace it — changes are saved and previewed immediately.
      </p>

      <div className="bg-white rounded-xl shadow-card p-6 max-w-xl">
        <ImageUpload
          label="Contact Page Banner"
          section="contact"
          value={data.contact.contactBanner}
          onUploaded={replaceContactBanner}
          onClear={clearContactBanner}
        />
        <p className="text-xs text-ink/40 mt-3">
          Recommended: a wide landscape photo (at least 1600px wide) for the best result on large screens.
        </p>
      </div>

      {data.contact.contactBanner && (
        <div className="mt-8 max-w-2xl">
          <p className="text-sm font-medium text-navy mb-2">Live Preview</p>
          <div className="rounded-xl overflow-hidden shadow-card">
            <div className="relative h-40 md:h-52">
              <img
                src={data.contact.contactBanner}
                alt="Contact banner preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy/50 flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl md:text-2xl">Contact Us</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageContactBanner;
