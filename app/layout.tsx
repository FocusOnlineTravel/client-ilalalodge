import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Ilala Lodge Hotel | The Closest Hotel to Victoria Falls",
  description:
    "Ilala Lodge Hotel is a family-run luxury hotel offering accommodation in the heart of Victoria Falls, Zimbabwe. Just an 8-minute walk from the Falls, one of the Seven Natural Wonders of the World.",
  keywords: [
    "Ilala Lodge",
    "Victoria Falls Hotel",
    "Zimbabwe Hotel",
    "Victoria Falls Accommodation",
    "Luxury Hotel Zimbabwe",
    "Victoria Falls Safari",
    "African Hotel",
  ],
  authors: [{ name: "Ilala Lodge Hotel" }],
  openGraph: {
    title: "Ilala Lodge Hotel | The Closest Hotel to Victoria Falls",
    description:
      "Experience luxury accommodation at the closest hotel to Victoria Falls. Family-run hotel with exceptional service, award-winning dining, and breathtaking views.",
    images: [
      {
        url: "/images/HERO.png",
        width: 1920,
        height: 1080,
        alt: "Ilala Lodge Hotel Victoria Falls",
      },
    ],
    type: "website",
    siteName: "Ilala Lodge Hotel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilala Lodge Hotel | The Closest Hotel to Victoria Falls",
    description:
      "Experience luxury accommodation at the closest hotel to Victoria Falls.",
    images: ["/images/HERO.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <Header />
        <main className="pb-16 lg:pb-0">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileBottomNav />
      </body>
    </html>
  );
}
