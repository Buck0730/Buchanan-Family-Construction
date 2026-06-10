import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

// Heavy condensed uppercase display face for headlines
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

// Clean body face
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://buchananhomeremodeling.com"),
  title: {
    default: "Buchanan Home Remodeling — Built Right, Built to Last",
    template: "%s · Buchanan Home Remodeling",
  },
  description:
    "Family-owned home remodeling — kitchens, bathrooms, decks, basements, and additions built with craft, grit, and a straight answer. Serving Pennsylvania homeowners.",
  keywords: [
    "home remodeling",
    "kitchen remodel",
    "bathroom remodel",
    "deck builder",
    "basement finishing",
    "home additions",
    "general contractor",
    "Pittsburgh",
    "Pennsylvania",
  ],
  openGraph: {
    title: "Buchanan Home Remodeling",
    description:
      "Family-owned home remodeling — kitchens, bathrooms, decks, basements, and additions built to last.",
    type: "website",
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
      className={`${anton.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full bg-ink text-bone antialiased">
        {children}
      </body>
    </html>
  );
}
