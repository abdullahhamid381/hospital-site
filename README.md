# Azhar Mehboob Memorial Hospital — Website

A premium, animated hospital website built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Structure

- `src/app/` — all 29 routes (App Router), including dynamic detail pages for services, departments, doctors, facilities, health packages, and blog posts
- `src/components/layout/` — navbar, footer, mobile menu, search, announcement bar, theme toggle
- `src/components/sections/` — homepage/inner-page sections (hero, stats, appointment form, emergency, FAQ, etc.)
- `src/components/cards/` — reusable card components
- `src/components/ui/` — button, container, section heading, motion reveal primitives
- `src/lib/data/` — all structured content (doctors, services, departments, facilities, packages, blog, etc.) — edit these files to update site content
- `public/images/logo.png` — hospital logo (swap this file to update branding everywhere)

## Notes

- Light/dark mode is fully implemented, persisted to `localStorage`, and respects system preference on first visit.
- Photography uses Unsplash placeholder images via `next/image` — swap URLs in `src/lib/data/*.ts` and `src/lib/unsplash.ts` for real hospital photography.
- The appointment and contact forms include client-side validation; wire up the `onSubmit` handlers to your backend/email service to receive real submissions.
- `sitemap.xml` and `robots.txt` are generated dynamically from the same data files.
