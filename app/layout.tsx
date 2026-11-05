import type { Metadata } from "next";
import Script from "next/script";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { HotelJsonLd, OrganizationJsonLd } from "@/components/seo/StructuredData";
import { getOptions } from "@/lib/content";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const GTM_ID = "GTM-MKFC6M";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ilalalodge.com"),
  icons: {
    icon: "/images/il-favicon.png",
  },
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
  verification: {
    google: "E6Lj2p-b0owfZ18mI1kqIry8QyiidQrkHtq6TEmXlxc",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const options = await getOptions();

  return (
    <html lang="en" className={`scroll-smooth ${poppins.variable}`}>
      <head>
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "@id": "https://www.ilalalodge.co.zw/#hotel",
              name: "Ilala Lodge Hotel",
              description:
                "Ilala Lodge Hotel is a family-run luxury hotel offering accommodation in the heart of Victoria Falls, Zimbabwe. Just an 8-minute walk from the Falls, one of the Seven Natural Wonders of the World.",
              url: "https://www.ilalalodge.co.zw",
              telephone: "+263 719 384 920",
              email: "onlinereservations@ilalalodge.com",
              image: [
                "https://www.ilalalodge.co.zw/images/HERO.png",
                "https://www.ilalalodge.co.zw/images/il-logo.svg",
              ],
              logo: "https://www.ilalalodge.co.zw/images/il-logo.svg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "413 Livingstone Way",
                addressLocality: "Victoria Falls",
                addressCountry: "ZW",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -17.9243,
                longitude: 25.8572,
              },
              numberOfRooms: 73,
              starRating: {
                "@type": "Rating",
                ratingValue: "4",
              },
              amenityFeature: [
                { "@type": "LocationFeatureSpecification", name: "Free WiFi" },
                { "@type": "LocationFeatureSpecification", name: "Restaurant" },
                { "@type": "LocationFeatureSpecification", name: "Swimming Pool" },
                { "@type": "LocationFeatureSpecification", name: "Spa" },
                { "@type": "LocationFeatureSpecification", name: "Room Service" },
                { "@type": "LocationFeatureSpecification", name: "Airport Shuttle" },
                { "@type": "LocationFeatureSpecification", name: "Concierge" },
              ],
              sameAs: [
                "https://facebook.com/ilalalodge",
                "https://www.instagram.com/ilalalodgevicfalls/",
                "https://twitter.com/ilalalodge",
              ],
              priceRange: "$$$",
              checkinTime: "14:00",
              checkoutTime: "10:00",
              currenciesAccepted: "USD, ZWL",
              paymentAccepted: "Cash, Credit Card",
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <OrganizationJsonLd options={options} />
        <HotelJsonLd options={options} />
        <Header navItems={options.header.nav_items} />
        <main className="pb-16 lg:pb-0">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileBottomNav />
      </body>
    </html>
  );
}
