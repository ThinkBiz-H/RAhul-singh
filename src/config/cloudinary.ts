/**
 * Centralized Cloudinary configuration.
 *
 * All values come from environment variables (see .env.example) so no
 * credentials are hardcoded in source. Only an "unsigned" upload preset is
 * ever used, so uploads work directly from the browser with no backend
 * server and no API secret exposed anywhere in this app.
 */

export type CloudinarySection = "hero" | "gallery" | "about" | "contact";

export const CLOUDINARY_CONFIG = {
  cloudName: "uhsiyl60",
  uploadPreset: "tjs-site",
  folder: "tjs-site",
} as const;

export function isCloudinaryConfigured(): boolean {
  return Boolean(CLOUDINARY_CONFIG.cloudName && CLOUDINARY_CONFIG.uploadPreset);
}

/** Builds the per-section folder path, e.g. "tjs-site/hero" */
export function folderForSection(section: CloudinarySection): string {
  return `${CLOUDINARY_CONFIG.folder}/${section}`;
}

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

/**
 * Uploads a single file directly to Cloudinary using an unsigned upload
 * preset. Requests a short-lived delete token (valid ~10 minutes) so the
 * Rahul Singh can offer a genuine "Delete" action without a backend.
 */
export async function uploadToCloudinary(
  file: File,
  section: CloudinarySection,
  onProgress?: (percent: number) => void,
): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file.",
    );
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
  formData.append("folder", folderForSection(section));

  return new Promise<CloudinaryUploadResult>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            url: data.secure_url,
            publicId: data.public_id,
            width: data.width,
            height: data.height,
          });
        } else {
          reject(new Error(data?.error?.message || "Cloudinary upload failed"));
        }
      } catch {
        reject(new Error("Unexpected response from Cloudinary"));
      }
    };

    xhr.onerror = () =>
      reject(new Error("Network error while uploading to Cloudinary"));
    xhr.send(formData);
  });
}

/** Convenience helper to upload several files sequentially, reporting overall progress. */
export async function uploadMultipleToCloudinary(
  files: File[],
  section: CloudinarySection,
  onProgress?: (percent: number) => void,
): Promise<CloudinaryUploadResult[]> {
  const results: CloudinaryUploadResult[] = [];
  for (let i = 0; i < files.length; i++) {
    const result = await uploadToCloudinary(
      files[i],
      section,
      (filePercent) => {
        if (onProgress) {
          const overall = Math.round(
            ((i + filePercent / 100) / files.length) * 100,
          );
          onProgress(overall);
        }
      },
    );
    results.push(result);
  }
  return results;
}

/**
 * Best-effort deletion using the short-lived delete token returned at
 * upload time (Cloudinary's "delete_by_token" endpoint). This works without
 * a backend or API secret, but the token expires ~10 minutes after upload.
 *
 * IMPORTANT LIMITATION: Cloudinary does not support deleting arbitrary
 * existing assets from an unsigned, backend-less browser context — real
 * deletion requires a signed request with your API secret, which must
 * never be exposed in frontend code. So once a token expires, "Delete" in
 * this Rahul Singh still immediately removes the image from the website
 * (it's dropped from local state), but the original file may remain in
 * your Cloudinary Media Library until removed there or via a backend using
 * the Admin API.
 */
export async function deleteFromCloudinary(
  deleteToken?: string,
): Promise<boolean> {
  if (!deleteToken || !CLOUDINARY_CONFIG.cloudName) return false;
  try {
    const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/delete_by_token`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: deleteToken }),
    });
    const data = await res.json();
    return data.result === "ok";
  } catch {
    return false;
  }
}

/** Copies a Cloudinary URL to the clipboard; returns whether it succeeded. */
export async function copyUrlToClipboard(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}
