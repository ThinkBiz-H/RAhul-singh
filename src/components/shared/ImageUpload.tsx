import React, { useRef, useState } from "react";
import { FiUploadCloud, FiX, FiCopy, FiCheck } from "react-icons/fi";
import {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  copyUrlToClipboard,
  isCloudinaryConfigured,
  type CloudinarySection,
  type CloudinaryUploadResult,
} from "../../config/cloudinary";

interface ImageUploadProps {
  value?: string;
  onUploaded: (result: CloudinaryUploadResult) => void;
  onClear?: () => void;
  label?: string;
  section: CloudinarySection;
}

/** Single-image uploader: pick a file, it uploads straight to Cloudinary and previews immediately. */
export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onUploaded, onClear, label, section }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFile = async (file: File) => {
    setError(null);
    if (!isCloudinaryConfigured()) {
      setError("Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env");
      return;
    }
    setProgress(0);
    try {
      const result = await uploadToCloudinary(file, section, setProgress);
      onUploaded(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setTimeout(() => setProgress(null), 400);
    }
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!value) return;
    const ok = await copyUrlToClipboard(value);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-navy mb-2">{label}</label>}
      <div
        className="relative border-2 border-dashed border-line rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors bg-surface"
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          <div className="relative w-full">
            <img src={value} alt="preview" className="w-full h-40 object-cover rounded" />
            <div className="absolute top-1 right-1 flex gap-1">
              <button
                type="button"
                onClick={handleCopy}
                title="Copy image URL"
                className="bg-navy/70 text-white rounded-full p-1.5 hover:bg-navy"
              >
                {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
              </button>
              {onClear && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear();
                  }}
                  title="Remove image"
                  className="bg-navy/70 text-white rounded-full p-1.5 hover:bg-red-600"
                >
                  <FiX size={13} />
                </button>
              )}
            </div>
            <p className="text-center text-xs text-ink/40 mt-1.5">Click to replace</p>
          </div>
        ) : (
          <>
            <FiUploadCloud className="text-primary" size={28} />
            <p className="text-sm text-ink/60">Click to upload to Cloudinary</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>
      {progress !== null && (
        <div className="w-full h-1.5 bg-line rounded mt-2 overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      )}
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
};

interface MultiImageUploadProps {
  section: CloudinarySection;
  onUploaded: (results: CloudinaryUploadResult[]) => void;
  label?: string;
}

/** Multi-image uploader: pick several files, each uploads straight to Cloudinary. */
export const MultiImageUpload: React.FC<MultiImageUploadProps> = ({ section, onUploaded, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList) => {
    setError(null);
    if (!isCloudinaryConfigured()) {
      setError("Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env");
      return;
    }
    setProgress(0);
    try {
      const results = await uploadMultipleToCloudinary(Array.from(files), section, setProgress);
      onUploaded(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setTimeout(() => setProgress(null), 400);
    }
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-navy mb-2">{label}</label>}
      <div
        className="border-2 border-dashed border-line rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors bg-surface"
        onClick={() => inputRef.current?.click()}
      >
        <FiUploadCloud className="text-primary" size={30} />
        <p className="text-sm text-ink/60">Click to upload one or more images to Cloudinary</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
      {progress !== null && (
        <div className="w-full h-1.5 bg-line rounded mt-2 overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      )}
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
};
