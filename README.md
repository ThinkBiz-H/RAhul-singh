# Rahul Singh — Political Portfolio Website (React + TypeScript + Tailwind + Cloudinary)

A React + TypeScript + Tailwind CSS website whose entire image pipeline runs
through **Cloudinary** — no local image files, no base64 blobs in
LocalStorage, and no backend server. Page content (text, links, categories,
messages) still lives in the browser's LocalStorage; only the actual image
**files** live on Cloudinary, and only their URLs are stored locally.

**No backend, no database, no Firebase/Supabase/Node/Express/MongoDB.**
Uploads go straight from the browser to Cloudinary using an **unsigned
upload preset**.

## Stack

React 18 · TypeScript · Vite · Tailwind CSS · React Router · Framer Motion ·
React Icons · React Hook Form · Cloudinary (unsigned uploads)

## 1. Set up Cloudinary (one-time, ~2 minutes)

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. Copy your **Cloud Name** from the Dashboard.
3. Go to **Settings → Upload → Upload presets → Add upload preset**.
   - Set **Signing Mode** to **Unsigned**.
   - (Optional) Set a folder or restrictions as you like.
   - Save it and copy its **name**.
4. Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
VITE_CLOUDINARY_FOLDER=tjs-site
```

The app ships with a working `.env` pointed at Cloudinary's public **demo**
cloud so all the seed/placeholder images load out of the box — but that demo
account isn't yours, so **uploading** won't work until you add your own
cloud name and unsigned preset above.

## 2. Run the app

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build
```

## Cloudinary integration — where everything lives

- `src/config/cloudinary.ts` — the **single, centralized** place for
  Cloudinary config and logic: reads `cloudName` / `uploadPreset` / `folder`
  from environment variables, and exposes `uploadToCloudinary`,
  `uploadMultipleToCloudinary`, `deleteFromCloudinary`, and
  `copyUrlToClipboard`.
- Uploads are **unsigned** — sent directly from the browser via
  `XMLHttpRequest` straight to `https://api.cloudinary.com/v1_1/<cloud>/image/upload`
  with progress reporting. No API secret ever touches this codebase.
- Images are organized into Cloudinary folders by section:
  `{folder}/hero`, `{folder}/gallery`, `{folder}/about`, `{folder}/contact`.
- Every image record in the app (`SlideItem`, `AboutImage`, `GalleryImage`,
  the contact banner) stores the Cloudinary `secure_url` as its `image`
  field — exactly what existing components already expect, so **no UI
  component had to change** to consume Cloudinary images instead of
  base64. A few optional fields (`imagePublicId`, `imageDeleteToken`,
  `imageUploadedAt`) ride alongside purely so the Rahul Singh can offer
  Replace/Delete — the frontend pages never read them.

### A note on "Delete"

Cloudinary does not allow deleting arbitrary existing assets from an
unsigned, backend-less browser — real deletion requires a signed request
with your API secret, which must never be shipped to a browser. To still
offer a genuine **Delete** button without a backend, this app requests a
short-lived **delete token** at upload time (`return_delete_token`) and
uses Cloudinary's `delete_by_token` endpoint — this only works for
~10 minutes after that specific upload.

In every case, clicking **Delete** in the Rahul Singh immediately removes
the image from the website (it's dropped from the local data store), so the
site always reflects what you deleted. If the 10-minute window has passed,
the underlying file may still exist in your Cloudinary Media Library —
remove it there, or wire up the Admin API from a backend if you need
guaranteed deletion of old assets.

## Public site

- `/` — Home: hero slider, biography (about image), social section, gallery previews
- `/about` — About page: banner + biography + extra about photos + office details
- `/gallery` — Dynamic gallery: category filter, search, "Load more" pagination, lightbox
- `/contact` — Contact banner, validated form (React Hook Form), toast, map embed

## Rahul Singh — `/admin`

Protected by a simple hardcoded password check (no auth server). Default login:

```
Username: admin
Password: admin123
```

Change these in `src/context/AuthContext.tsx` (`ADMIN_USERNAME` /
`ADMIN_PASSWORD` constants near the top) — that's the only place the
password lives.

### Sidebar sections

- **Dashboard** — overview cards + recent uploads
- **Hero Images** — Add Slide (uploads to Cloudinary `/hero`), Replace,
  Delete, Copy URL, edit heading/subheading/button
- **Gallery Images** — create/delete categories, multi-upload to Cloudinary
  `/gallery`, Replace, Delete, Copy URL, Feature toggle, rename,
  recategorize, search, bulk-delete
- **About Images** — Add Image (Cloudinary `/about`), Replace, Delete, Copy
  URL, Set Primary (the primary photo is the circular profile picture on
  Home & About; others show as a photo strip on the About page)
- **Biography Text** — heading, sub-heading, biography paragraphs
- **Contact Banner** — single image (Cloudinary `/contact`) with live
  preview, Replace, Delete, Copy URL
- **Contact Info** — office address, email, phone, working hours, map embed
  URL, social links
- **Messages** — contact form submissions: search, mark read/unread, delete

Every image control shows an upload progress bar and an instant preview —
as soon as Cloudinary responds, the new URL is saved to the shared data
context and every public page re-renders with it immediately.

## Data & persistence

- All data types live in `src/types/index.ts`
- Seed/default content lives in `src/data/defaultData.ts` (images point at
  Cloudinary's public `demo` cloud so the app looks complete out of the box)
- All state, LocalStorage sync, and CRUD operations live in
  `src/context/DataContext.tsx` (`useData()` hook)
- Text/metadata persists in LocalStorage across reloads in the same
  browser; the actual image files persist on Cloudinary regardless of
  LocalStorage. To reset everything back to the seeded defaults, clear the
  site's LocalStorage (or call `resetAll()` exposed by `useData()`).

## Notes on content

The seeded biography text and contact details are placeholder content
written to match the structure and tone of a political portfolio site, and
the seeded photos are Cloudinary's public demo images — replace all of it
from the Rahul Singh, or edit `src/data/defaultData.ts` directly, with your
own real content once your Cloudinary account is configured.
