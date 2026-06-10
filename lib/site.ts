// Single source of truth for marketing copy + business details.
// Edit here and every section/page updates.

export const COMPANY = {
  name: "Buchanan Home Remodeling",
  shortName: "Buchanan",
  phoneDisplay: "(412) 498-2865",
  phoneE164: "+14124982865",
  email: "build@buchananhomeremodeling.com",
  area: "Greater Pittsburgh, PA",
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
  /** photo paths under /public — first four show on the services page */
  photos: string[];
};

/** Real project photography (bathrooms shot so far; other trades pending). */
const BATHROOM_PHOTOS = Array.from(
  { length: 18 },
  (_, i) => `/images/projects/bathrooms/bathroom-${i + 1}.jpg`,
);

function placeholderPhotos(slug: string, stem: string): string[] {
  return Array.from(
    { length: 4 },
    (_, i) => `/images/projects/${slug}/${stem}-${i + 1}.svg`,
  );
}

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
    photos: placeholderPhotos("kitchens", "kitchen"),
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
    photos: BATHROOM_PHOTOS,
  },
  {
    slug: "decks",
    index: "03",
    title: "Decks",
    tagline: "Outdoor living, built solid.",
    description:
      "Decks and outdoor spaces framed straight, flashed right, and finished to handle Pittsburgh weather year after year.",
    features: [
      "Composite & pressure-treated builds",
      "Railings, stairs & lighting",
      "Covered porches & pergolas",
      "Tear-offs & rebuilds",
    ],
    photos: placeholderPhotos("decks", "deck"),
  },
  {
    slug: "basements",
    index: "04",
    title: "Basements",
    tagline: "Square footage you already own.",
    description:
      "Finished basements that feel like part of the house — dry, warm, and ready for movie nights, home gyms, or guests.",
    features: [
      "Full finishing & framing",
      "Moisture control & insulation",
      "Home theaters & bars",
      "Egress windows & bathrooms",
    ],
    photos: placeholderPhotos("basements", "basement"),
  },
  {
    slug: "additions",
    index: "05",
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
    photos: placeholderPhotos("additions", "addition"),
  },
];

export function servicePhotos(service: Service): string[] {
  return service.photos;
}

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
    location: "Wexford, PA",
    project: "Kitchen remodel",
  },
  {
    quote:
      "The quote was the price. No surprise change orders, no games. The tilework in our master bath is dead straight — you can tell these people care.",
    name: "Priya S.",
    location: "Mt. Lebanon, PA",
    project: "Primary bathroom",
  },
  {
    quote:
      "Our addition ties into the original house so cleanly that guests can't tell where the old ends and the new begins. Exactly what we hoped for.",
    name: "The Calloways",
    location: "Cranberry Township, PA",
    project: "Two-story addition",
  },
];
