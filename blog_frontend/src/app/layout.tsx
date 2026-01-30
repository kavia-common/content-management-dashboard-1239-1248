import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { SITE } from "@/lib/theme";

export const metadata: Metadata = {
  title: {
    template: "%s | Blog CMS",
    default: SITE.title,
  },
  description: SITE.description,
  applicationName: "Blog CMS",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
    siteName: "Blog CMS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"),
};

export const viewport: Viewport = {
  themeColor: "#3B82F6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen" suppressHydrationWarning>
        <Header />
        <main id="main" className="container py-6" role="main">
          {children}
        </main>
        <footer className="border-t mt-10 py-6 text-sm text-center text-gray-500">
          © {new Date().getFullYear()} Blog CMS
        </footer>
      </body>
    </html>
  );
}
