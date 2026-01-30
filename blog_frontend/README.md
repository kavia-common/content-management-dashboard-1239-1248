# AI Blog CMS companion — Frontend (Next.js)

This is the frontend container for the project, branded as "AI Blog CMS companion".

Branding status:
- Application name: AI Blog CMS companion
- Configuration files and UI components will need to reference this exact name.
- At the moment, the source files (Next.js pages/app config) are not present in this folder. When added, ensure:
  - Title/metadata uses "AI Blog CMS companion".
  - Any header/logo text uses "AI Blog CMS companion".
  - package.json "name" reflects a suitable npm name (e.g., "ai-blog-cms-companion").
  - next-seo or Head metadata, manifest.json, and sitemap metadata use the new name.
  - The browser tab title and Open Graph siteName are updated.

Current updates in this container:
- package-lock.json "name" set to: ai-blog-cms-companion

Notes for future integration:
- Update package.json "name" and description accordingly.
- If using the App Router, update app/layout.tsx metadata.title and metadata.applicationName.
- If using the Pages Router, update pages/_app.tsx or pages/_document.tsx Head tags.
- Update public/manifest.json "name" and "short_name" to "AI Blog CMS companion".
- Update any SEO configuration (next-seo.config.ts) siteName/titleTemplate.
