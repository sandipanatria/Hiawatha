import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://18334hiawatha.site"),
  title: "18334 Hiawatha | A Palmer & Krisel Modern",
  description: "Explore 18334 Hiawatha Street, a 1958 Palmer & Krisel modern home in Porter Ranch with a private pool and creative studio.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "18334 Hiawatha | A Palmer & Krisel Modern",
    description: "A 1958 Palmer & Krisel modern home in Porter Ranch. Explore the home, architecture, studio, and property details.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
