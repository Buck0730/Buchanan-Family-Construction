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
    "Honest quotes, clean job sites, and work we stand behind. Family-owned home remodeling based in Upper Darby, PA, serving the Greater Philadelphia area.",
  keywords: [
    "home remodeling",
    "remodeling contractor",
    "renovation",
    "custom cabinets",
    "general contractor",
    "Upper Darby",
    "Delaware County",
    "Philadelphia",
    "Pennsylvania",
  ],
  openGraph: {
    title: "Buchanan Home Remodeling",
    description:
      "Honest quotes, clean job sites, and work we stand behind. See our work and get a free quote.",
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
      <body className="min-h-full bg-cloud text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
