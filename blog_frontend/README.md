# Blog Frontend (Next.js)

Modern, SEO-optimized blog platform frontend with a CMS UI.

## Features
- Header with navigation (Home, Dashboard, New Post)
- CMS Dashboard with quick stats and recent posts
- Post list with filtering sidebar (search, status, tags)
- Post editor (title, slug, tags, status, content)
- Responsive post pages at `/posts/[slug]`
- Light modern theme with accents (#3B82F6 primary, #F59E0B success)
- Uses backend API via `NEXT_PUBLIC_API_BASE`

## Getting Started

1) Copy `.env.example` to `.env.local` and adjust values:
```
cp .env.example .env.local
```

2) Install and run:
```
npm install
npm run dev
```

Open http://localhost:3000

## Environment Variables
- NEXT_PUBLIC_API_BASE: Base URL for blog backend (e.g., http://localhost:4000)
- NEXT_PUBLIC_BACKEND_URL: Optional alias to backend base
- NEXT_PUBLIC_FRONTEND_URL: Public URL of this site
- NEXT_PUBLIC_WS_URL: WebSocket base (reserved for future real-time features)
- Additional flags documented in `.env.example`

## Notes
- API calls are centralized in `src/lib/api.ts`
- Theming constants are in `src/lib/theme.ts`
- Tailwind v4 is enabled via `@tailwindcss/postcss` with custom CSS variables in `globals.css`

## Deploy
- Build: `npm run build`
- Start: `npm start`
- Output mode: standalone (supports dynamic routes and server features without static export).
  - You can switch to static export by setting `output: "export"` in `next.config.ts` and ensuring `generateStaticParams()` provides slugs at build time.
