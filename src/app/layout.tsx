import AnnouncementBar from "@/components/home/AnnouncementBar";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { storeConfig } from "@/lib/store-config";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(storeConfig.siteUrl),
  title: {
    default: `${storeConfig.name} — Demo Storefront`,
    template: `%s | ${storeConfig.name}`,
  },
  description: storeConfig.description,
  openGraph: {
    type: "website",
    siteName: storeConfig.name,
    title: `${storeConfig.name} — Demo Storefront`,
    description: storeConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:p-4"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <Navbar />
          <div id="main-content" className="flex-1">
            {children}
          </div>
          <Footer />
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
