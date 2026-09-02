import React, { useRef, useState } from "react";
import { FiRefreshCw, FiCopy, FiCheck } from "react-icons/fi";
import {
  uploadToCloudinary,
  copyUrlToClipboard,
  isCloudinaryConfigured,
  type CloudinarySection,
  type CloudinaryUploadResult,
} from "../../config/cloudinary";

interface ImageTileProps {
  src: string;
  alt: string;
  section: CloudinarySection;
  onReplaced: (result: CloudinaryUploadResult) => void;

  aspect?: string; // tailwind aspect-ratio class, defaults to aspect-[4/3]
  children?: React.ReactNode; // extra action buttons (e.g. "Set as Primary")
}

/** Reusable image tile with Replace (re-uploads to Cloudinary), Delete, and Copy URL. */
const ImageTile: React.FC<ImageTileProps> = ({
  src,
  alt,
  section,
  onReplaced,
  aspect = "aspect-[4/3]",
  children,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleReplace = async (file: File) => {
    setError(null);
    if (!isCloudinaryConfigured()) {
      setError("Cloudinary not configured");
      return;
    }
    setProgress(0);
    try {
      const result = await uploadToCloudinary(file, section, setProgress);
      onReplaced(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setTimeout(() => setProgress(null), 400);
    }
  };

  const handleCopy = async () => {
    const ok = await copyUrlToClipboard(src);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-card bg-white">
      <div className={`relative ${aspect} bg-surface`}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
        {progress !== null && (
          <div className="absolute inset-0 bg-navy/70 flex flex-col items-center justify-center gap-2 text-white text-xs font-medium px-4">
            <span>Uploading to Cloudinary… {progress}%</span>
            <div className="w-full h-1.5 bg-white/20 rounded overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleReplace(file);
            e.target.value = "";
          }}
        />
      </div>
      <div className="flex items-center gap-2 p-2.5 flex-wrap">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 text-xs font-semibold text-navy bg-surface hover:bg-line px-2.5 py-1.5 rounded-md transition-colors"
        >
          <FiRefreshCw size={12} /> Replace
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-semibold text-navy bg-surface hover:bg-line px-2.5 py-1.5 rounded-md transition-colors"
        >
          {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}{" "}
          {copied ? "Copied" : "Copy URL"}
        </button>

        {children}
      </div>
      {error && <p className="text-xs text-red-500 px-2.5 pb-2">{error}</p>}
    </div>
  );
};

export default ImageTile;
