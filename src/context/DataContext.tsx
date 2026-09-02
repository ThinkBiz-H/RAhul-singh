import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type {
  AppData,
  SlideItem,
  BiographyData,
  AboutImage,
  GalleryCategory,
  GalleryImage,
  ContactData,
  ContactMessage,
  SiteSettings,
  CloudinaryMeta,
} from "../types";
import { defaultData } from "../data/defaultData";
import { loadJSON, saveJSON, STORAGE_KEYS, uid } from "../utils/storage";
import { deleteFromCloudinary, type CloudinaryUploadResult } from "../config/cloudinary";

/** Shape returned by the admin upload components; used to patch image + metadata together. */
export interface ImagePatch extends CloudinaryMeta {
  image: string;
}

function toImagePatch(result: CloudinaryUploadResult): ImagePatch {
  return {
    image: result.url,
    imagePublicId: result.publicId,
    imageDeleteToken: result.deleteToken,
    imageUploadedAt: Date.now(),
  };
}

interface DataContextValue {
  data: AppData;
  // hero
  addSlide: (slide: Omit<SlideItem, "id" | "order" | "image" | keyof CloudinaryMeta>, upload: CloudinaryUploadResult) => void;
  updateSlide: (id: string, patch: Partial<Omit<SlideItem, keyof CloudinaryMeta>>) => void;
  replaceSlideImage: (id: string, upload: CloudinaryUploadResult) => void;
  deleteSlide: (id: string) => void;
  reorderSlides: (orderedIds: string[]) => void;
  // biography / about images
  updateBiography: (patch: Partial<Omit<BiographyData, "aboutImages">>) => void;
  addAboutImage: (alt: string, upload: CloudinaryUploadResult) => void;
  replaceAboutImage: (id: string, upload: CloudinaryUploadResult) => void;
  deleteAboutImage: (id: string) => void;
  setPrimaryAboutImage: (id: string) => void;
  // categories
  addCategory: (name: string) => void;
  updateCategory: (id: string, patch: Partial<GalleryCategory>) => void;
  deleteCategory: (id: string) => void;
  // gallery
  addImages: (
    uploads: CloudinaryUploadResult[],
    common: Omit<GalleryImage, "id" | "createdAt" | "image" | keyof CloudinaryMeta>
  ) => void;
  updateImage: (id: string, patch: Partial<Omit<GalleryImage, keyof CloudinaryMeta>>) => void;
  replaceImage: (id: string, upload: CloudinaryUploadResult) => void;
  deleteImage: (id: string) => void;
  bulkDeleteImages: (ids: string[]) => void;
  // contact
  updateContact: (patch: Partial<Omit<ContactData, "contactBanner" | "contactBannerPublicId" | "contactBannerDeleteToken">>) => void;
  replaceContactBanner: (upload: CloudinaryUploadResult) => void;
  clearContactBanner: () => void;
  addMessage: (msg: Omit<ContactMessage, "id" | "createdAt" | "read">) => void;
  markMessageRead: (id: string, read: boolean) => void;
  deleteMessage: (id: string) => void;
  // settings
  updateSettings: (patch: Partial<SiteSettings>) => void;
  resetAll: () => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(() => loadJSON(STORAGE_KEYS.APP, defaultData));

  useEffect(() => {
    saveJSON(STORAGE_KEYS.APP, data);
  }, [data]);

  // ---------- Hero slides ----------

  const addSlide: DataContextValue["addSlide"] = useCallback((slide, upload) => {
    setData((prev) => ({
      ...prev,
      hero: {
        slides: [
          ...prev.hero.slides,
          { ...slide, ...toImagePatch(upload), id: uid(), order: prev.hero.slides.length },
        ],
      },
    }));
  }, []);

  const updateSlide: DataContextValue["updateSlide"] = useCallback((id, patch) => {
    setData((prev) => ({
      ...prev,
      hero: { slides: prev.hero.slides.map((s) => (s.id === id ? { ...s, ...patch } : s)) },
    }));
  }, []);

  const replaceSlideImage: DataContextValue["replaceSlideImage"] = useCallback((id, upload) => {
    setData((prev) => ({
      ...prev,
      hero: {
        slides: prev.hero.slides.map((s) => (s.id === id ? { ...s, ...toImagePatch(upload) } : s)),
      },
    }));
  }, []);

  const deleteSlide: DataContextValue["deleteSlide"] = useCallback((id) => {
    setData((prev) => {
      const target = prev.hero.slides.find((s) => s.id === id);
      if (target?.imageDeleteToken) void deleteFromCloudinary(target.imageDeleteToken);
      return { ...prev, hero: { slides: prev.hero.slides.filter((s) => s.id !== id) } };
    });
  }, []);

  const reorderSlides: DataContextValue["reorderSlides"] = useCallback((orderedIds) => {
    setData((prev) => ({
      ...prev,
      hero: {
        slides: orderedIds
          .map((id, idx) => {
            const slide = prev.hero.slides.find((s) => s.id === id);
            return slide ? { ...slide, order: idx } : null;
          })
          .filter((s): s is SlideItem => !!s),
      },
    }));
  }, []);

  // ---------- Biography / About images ----------

  const updateBiography: DataContextValue["updateBiography"] = useCallback((patch) => {
    setData((prev) => ({ ...prev, biography: { ...prev.biography, ...patch } }));
  }, []);

  const addAboutImage: DataContextValue["addAboutImage"] = useCallback((alt, upload) => {
    setData((prev) => ({
      ...prev,
      biography: {
        ...prev.biography,
        aboutImages: [
          ...prev.biography.aboutImages,
          {
            ...toImagePatch(upload),
            id: uid(),
            alt,
            primary: prev.biography.aboutImages.length === 0,
          } as AboutImage,
        ],
      },
    }));
  }, []);

  const replaceAboutImage: DataContextValue["replaceAboutImage"] = useCallback((id, upload) => {
    setData((prev) => ({
      ...prev,
      biography: {
        ...prev.biography,
        aboutImages: prev.biography.aboutImages.map((a) =>
          a.id === id ? { ...a, ...toImagePatch(upload) } : a
        ),
      },
    }));
  }, []);

  const deleteAboutImage: DataContextValue["deleteAboutImage"] = useCallback((id) => {
    setData((prev) => {
      const target = prev.biography.aboutImages.find((a) => a.id === id);
      if (target?.imageDeleteToken) void deleteFromCloudinary(target.imageDeleteToken);

      const remaining = prev.biography.aboutImages.filter((a) => a.id !== id);
      if (target?.primary && remaining.length > 0 && !remaining.some((a) => a.primary)) {
        remaining[0] = { ...remaining[0], primary: true };
      }
      return { ...prev, biography: { ...prev.biography, aboutImages: remaining } };
    });
  }, []);

  const setPrimaryAboutImage: DataContextValue["setPrimaryAboutImage"] = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      biography: {
        ...prev.biography,
        aboutImages: prev.biography.aboutImages.map((a) => ({ ...a, primary: a.id === id })),
      },
    }));
  }, []);

  // ---------- Categories ----------

  const addCategory: DataContextValue["addCategory"] = useCallback((name) => {
    setData((prev) => ({
      ...prev,
      categories: [
        ...prev.categories,
        {
          id: uid(),
          name,
          slug: name.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-"),
          order: prev.categories.length,
        },
      ],
    }));
  }, []);

  const updateCategory: DataContextValue["updateCategory"] = useCallback((id, patch) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  }, []);

  const deleteCategory: DataContextValue["deleteCategory"] = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== id),
      gallery: prev.gallery.filter((g) => g.categoryId !== id),
    }));
  }, []);

  // ---------- Gallery images ----------

  const addImages: DataContextValue["addImages"] = useCallback((uploads, common) => {
    setData((prev) => ({
      ...prev,
      gallery: [
        ...uploads.map((upload, i) => ({
          ...common,
          ...toImagePatch(upload),
          id: uid(),
          createdAt: Date.now() - i, // keep upload order stable when sorted by createdAt
          title: common.title || `Photo ${prev.gallery.length + i + 1}`,
        })),
        ...prev.gallery,
      ],
    }));
  }, []);

  const updateImage: DataContextValue["updateImage"] = useCallback((id, patch) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) => (g.id === id ? { ...g, ...patch } : g)),
    }));
  }, []);

  const replaceImage: DataContextValue["replaceImage"] = useCallback((id, upload) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) => (g.id === id ? { ...g, ...toImagePatch(upload) } : g)),
    }));
  }, []);

  const deleteImage: DataContextValue["deleteImage"] = useCallback((id) => {
    setData((prev) => {
      const target = prev.gallery.find((g) => g.id === id);
      if (target?.imageDeleteToken) void deleteFromCloudinary(target.imageDeleteToken);
      return { ...prev, gallery: prev.gallery.filter((g) => g.id !== id) };
    });
  }, []);

  const bulkDeleteImages: DataContextValue["bulkDeleteImages"] = useCallback((ids) => {
    const idSet = new Set(ids);
    setData((prev) => {
      prev.gallery
        .filter((g) => idSet.has(g.id) && g.imageDeleteToken)
        .forEach((g) => void deleteFromCloudinary(g.imageDeleteToken));
      return { ...prev, gallery: prev.gallery.filter((g) => !idSet.has(g.id)) };
    });
  }, []);

  // ---------- Contact ----------

  const updateContact: DataContextValue["updateContact"] = useCallback((patch) => {
    setData((prev) => ({ ...prev, contact: { ...prev.contact, ...patch } }));
  }, []);

  const replaceContactBanner: DataContextValue["replaceContactBanner"] = useCallback((upload) => {
    setData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        contactBanner: upload.url,
        contactBannerPublicId: upload.publicId,
        contactBannerDeleteToken: upload.deleteToken,
      },
    }));
  }, []);

  const clearContactBanner: DataContextValue["clearContactBanner"] = useCallback(() => {
    setData((prev) => {
      if (prev.contact.contactBannerDeleteToken) void deleteFromCloudinary(prev.contact.contactBannerDeleteToken);
      return {
        ...prev,
        contact: { ...prev.contact, contactBanner: "", contactBannerPublicId: undefined, contactBannerDeleteToken: undefined },
      };
    });
  }, []);

  const addMessage: DataContextValue["addMessage"] = useCallback((msg) => {
    setData((prev) => ({
      ...prev,
      messages: [{ ...msg, id: uid(), createdAt: Date.now(), read: false }, ...prev.messages],
    }));
  }, []);

  const markMessageRead: DataContextValue["markMessageRead"] = useCallback((id, read) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((m) => (m.id === id ? { ...m, read } : m)),
    }));
  }, []);

  const deleteMessage: DataContextValue["deleteMessage"] = useCallback((id) => {
    setData((prev) => ({ ...prev, messages: prev.messages.filter((m) => m.id !== id) }));
  }, []);

  const updateSettings: DataContextValue["updateSettings"] = useCallback((patch) => {
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  }, []);

  const resetAll = useCallback(() => {
    setData(defaultData);
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        addSlide,
        updateSlide,
        replaceSlideImage,
        deleteSlide,
        reorderSlides,
        updateBiography,
        addAboutImage,
        replaceAboutImage,
        deleteAboutImage,
        setPrimaryAboutImage,
        addCategory,
        updateCategory,
        deleteCategory,
        addImages,
        updateImage,
        replaceImage,
        deleteImage,
        bulkDeleteImages,
        updateContact,
        replaceContactBanner,
        clearContactBanner,
        addMessage,
        markMessageRead,
        deleteMessage,
        updateSettings,
        resetAll,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
