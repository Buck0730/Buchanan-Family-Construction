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
  metadataBase: new URL("https://buchananfamilyconstruction.com"),
  title: {
    default: "Buchanan Family Construction — Built Right, Built to Last",
    template: "%s · Buchanan Family Construction",
  },
  description:
    "Family-owned home remodeling — kitchens, bathrooms, and additions built with craft, grit, and a straight answer. Serving Pennsylvania homeowners.",
  keywords: [
    "home remodeling",
    "kitchen remodel",
    "bathroom remodel",
    "home additions",
    "general contractor",
    "Pennsylvania",
  ],
  openGraph: {
    title: "Buchanan Family Construction",
    description:
      "Family-owned home remodeling — kitchens, bathrooms, and additions built to last.",
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
