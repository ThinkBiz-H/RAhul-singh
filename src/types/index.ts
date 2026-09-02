/**
 * Cloudinary bookkeeping attached alongside every image URL. These fields
 * are optional so nothing breaks for images seeded before this metadata
 * existed; consuming components only ever read the plain `image` URL string.
 */
export interface CloudinaryMeta {
  imagePublicId?: string;
  imageDeleteToken?: string; // short-lived (~10 min), used for best-effort delete
  imageUploadedAt?: number;
}

export interface SlideItem extends CloudinaryMeta {
  id: string;
  image: string; // Cloudinary secure_url
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  order: number;
}

export interface HeroData {
  slides: SlideItem[];
}

export interface AboutImage extends CloudinaryMeta {
  id: string;
  image: string; // Cloudinary secure_url
  alt: string;
  primary: boolean;
}

export interface BiographyData {
  aboutImages: AboutImage[];
  heading: string;
  subheading: string;
  paragraphs: string[];
}

export interface GalleryCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface GalleryImage extends CloudinaryMeta {
  id: string;
  image: string; // Cloudinary secure_url
  title: string;
  categoryId: string;
  description: string;
  tags: string[];
  featured: boolean;
  createdAt: number;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
}

export interface ContactData {
  contactBanner: string; // Cloudinary secure_url, shown at top of Contact page
  contactBannerPublicId?: string;
  contactBannerDeleteToken?: string;
  officeAddress: string;
  email: string;
  phone: string;
  mapEmbedUrl: string;
  workingHours: string;
  social: SocialLinks;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: number;
}

export interface SiteSettings {
  siteName: string;
  logo: string;
  footerText: string;
  copyrightText: string;
}

export interface AppData {
  hero: HeroData;
  biography: BiographyData;
  categories: GalleryCategory[];
  gallery: GalleryImage[];
  contact: ContactData;
  messages: ContactMessage[];
  settings: SiteSettings;
}
