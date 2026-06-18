import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apex Detailers | Premium Auto Detailing & Paint Protection",
  description: "Transforming everyday vehicles into showroom-quality masterpieces. Apex Detailers offers premium auto detailing, ceramic coating, and paint correction.",
  keywords: ["auto detailing", "car detailing", "ceramic coating", "paint correction", "premium detailing"],
  openGraph: {
    title: "Apex Detailers | Premium Auto Detailing",
    description: "Premium Auto Detailing & Paint Protection Specialists",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth no-scrollbar">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoBodyShop",
              "name": "Apex Detailers",
              "image": "https://apexdetailers.com/logo.png",
              "description": "Premium Auto Detailing & Paint Protection Specialists",
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "100 Luxury Lane",
                "addressLocality": "Beverly Hills",
                "addressRegion": "CA",
                "postalCode": "90210",
                "addressCountry": "US"
              },
              "telephone": "+15551234567"
            })
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${inter.variable} antialiased bg-black text-white font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
