import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,

  title: {
    default: "18334 Hiawatha | Palmer & Krisel Modern",
    template: "%s | 18334 Hiawatha",
  },

  description:
    "Explore 18334 Hiawatha Street, a 1958 Palmer & Krisel modern home in Porter Ranch with a private pool and creative studio.",

  applicationName: "18334 Hiawatha",

  authors: [
    {
      name: "18334 Hiawatha",
    },
  ],

  creator: "18334 Hiawatha",

  keywords: [
    "18334 Hiawatha",
    "18334 Hiawatha Street",
    "Palmer Krisel",
    "Palmer & Krisel",
    "mid-century modern",
    "mid-century modern home",
    "Porter Ranch",
    "Los Angeles",
    "Living-Conditioned Homes",
    "California modern architecture",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    siteName: "18334 Hiawatha",
    title: "18334 Hiawatha | Palmer & Krisel Modern",
    description:
      "Explore a 1958 Palmer & Krisel modern home in Porter Ranch with a private pool and creative studio.",
    images: [
      {
        url: "/images/Hero Section.webp",
        alt: "18334 Hiawatha mid-century modern home",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "18334 Hiawatha | Palmer & Krisel Modern",
    description:
      "Explore a 1958 Palmer & Krisel modern home in Porter Ranch with a private pool and creative studio.",
    images: ["/images/Hero Section.webp"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}