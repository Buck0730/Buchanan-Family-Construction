// Single source of truth for marketing copy + business details.
// Edit here and every section/page updates.

export const COMPANY = {
  name: "Buchanan Family Construction",
  shortName: "Buchanan",
  phoneDisplay: "(215) 555-0142",
  phoneE164: "+12155550142",
  email: "build@buchananfamilyconstruction.com",
  area: "Greater Philadelphia, PA",
  hours: "Mon–Fri · 7am–6pm",
  license: "PA HIC #PA000000",
  established: 1998,
} as const;

export type Service = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  /** filename stem for photos, e.g. "kitchen" -> kitchen-1.svg */
  photoPrefix: string;
};

export const SERVICES: Service[] = [
  {
    slug: "kitchens",
    index: "01",
    title: "Kitchens",
    tagline: "The heart of the house, rebuilt.",
    description:
      "Full gut-and-rebuild kitchens, custom cabinetry, and layouts that actually work the way you cook and gather.",
    features: [
      "Custom & semi-custom cabinetry",
      "Quartz, granite & butcher block",
      "Islands, lighting & ventilation",
      "Walls-out layout reworks",
    ],
    photoPrefix: "kitchen",
  },
  {
    slug: "bathrooms",
    index: "02",
    title: "Bathrooms",
    tagline: "Tile-to-ceiling craftsmanship.",
    description:
      "Spa-grade bathrooms with waterproof builds, heated floors, and tilework that's set straight and sealed right.",
    features: [
      "Curbless & walk-in showers",
      "Heated tile floors",
      "Custom vanities & storage",
      "Full waterproofing systems",
    ],
    photoPrefix: "bathroom",
  },
  {
    slug: "additions",
    index: "03",
    title: "Additions",
    tagline: "More house, seamlessly.",
    description:
      "Additions and bump-outs that look like they were always there — framed true, tied in clean, built to code.",
    features: [
      "In-law & primary suites",
      "Bump-outs & second stories",
      "Garages & sunrooms",
      "Permits & structural engineering",
    ],
    photoPrefix: "addition",
  },
];

export function servicePhotos(service: Service): string[] {
  return Array.from(
    { length: 4 },
    (_, i) => `/images/projects/${service.slug}/${service.photoPrefix}-${i + 1}.svg`,
  );
}

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
};

export const STATS: Stat[] = [
  { value: 27, suffix: "+", label: "Years building" },
  { value: 480, suffix: "+", label: "Projects completed" },
  { value: 100, suffix: "%", label: "Licensed & insured" },
  { value: 4.9, suffix: "/5", decimals: 1, label: "Average client rating" },
];

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export const PROCESS: ProcessStep[] = [
  {
    index: "01",
    title: "Consultation",
    description:
      "We walk your space, talk through what you want, and give you an honest read on budget and timeline — no pressure, no sales theater.",
  },
  {
    index: "02",
    title: "Design & Quote",
    description:
      "You get a fixed-scope plan and a clear, itemized price. The number you sign is the number you pay.",
  },
  {
    index: "03",
    title: "Build",
    description:
      "One dedicated crew, a clean and protected job site, and weekly updates so you're never wondering what's happening.",
  },
  {
    index: "04",
    title: "Walkthrough",
    description:
      "We walk every detail together and don't call it done until you're standing in it and it's right.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  project: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They tore our kitchen down to the studs and handed it back better than we pictured. Crew showed up on time every single day and cleaned up before they left.",
    name: "Dana & Mark R.",
    location: "Doylestown, PA",
    project: "Kitchen remodel",
  },
  {
    quote:
      "The quote was the price. No surprise change orders, no games. The tilework in our master bath is dead straight — you can tell these people care.",
    name: "Priya S.",
    location: "Ardmore, PA",
    project: "Primary bathroom",
  },
  {
    quote:
      "Our addition ties into the original house so cleanly that guests can't tell where the old ends and the new begins. Exactly what we hoped for.",
    name: "The Calloways",
    location: "Newtown, PA",
    project: "Two-story addition",
  },
];
