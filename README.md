# Hiawatha — Next.js

Standalone Next.js 16 App Router implementation for the 18334 Hiawatha property site.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Supabase (optional, for enquiry persistence)

## Routes

- `/`
- `/architecture`
- `/studio`
- `/details`
- `/api/enquiry`

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm start
```

The enquiry endpoint intentionally returns a temporary-unavailable response until the required Supabase environment variables are configured.

## Updated property photography

The `public/images` directory contains the full property photography set, including the MLS images and the original archival/studio assets. Image assignments are centralized in `src/lib/property.ts`, and the reusable full-property gallery lives in `src/components/property-gallery.tsx`.
