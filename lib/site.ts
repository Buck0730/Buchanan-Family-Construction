// Single source of truth for marketing copy + business details.
// Edit here and every section/page updates.

export const COMPANY = {
  name: "Buchanan Home Remodeling",
  shortName: "Buchanan",
  phoneDisplay: "(412) 498-2865",
  phoneE164: "+14124982865",
  email: "build@buchananhomeremodeling.com",
  area: "Greater Philadelphia",
  base: "Upper Darby, PA",
  hours: "Mon–Fri · 7am–6pm",
  // license: PA HIC number pending — see GitHub issue "Get PA HIC license number"
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

/**
 * A single completed job. Photos live in
 * `/public/images/projects/<service>/<slug>/photo-N.jpg`, ordered so photo-1
 * is the cover. To add a job: drop a new folder of photos, then add an entry
 * here — everything on the site (galleries, homepage rail) reads from this.
 */
export type Job = {
  slug: string;
  /** service slug this job belongs to (matches a Service.slug) */
  service: string;
  title: string;
  location: string;
  /** full photo paths under /public, cover first */
  photos: string[];
  /** optional caption shown beneath a specific photo, keyed by its path */
  captions?: Record<string, string>;
};

/** Build the photo paths for a job folder holding photo-1…photo-count. */
function jobPhotos(service: string, slug: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/images/projects/${service}/${slug}/photo-${i + 1}.jpg`,
  );
}

/**
 * Real project photography, organized by job. Bathrooms shot so far; other
 * trades pending. Add new jobs here as they wrap.
 */
export const JOBS: Job[] = [
  {
    slug: "emerald-green-bath",
    service: "bathrooms",
    title: "Emerald green tile bath",
    location: "Greater Philadelphia",
    photos: jobPhotos("bathrooms", "emerald-green-bath", 11),
    captions: {
      "/images/projects/bathrooms/emerald-green-bath/photo-9.jpg":
        "Handmade by our team — this cabinet was custom-built to order.",
    },
  },
  {
    slug: "wraparound-composite-deck",
    service: "decks",
    title: "Wraparound composite deck",
    location: "Greater Philadelphia",
    photos: jobPhotos("decks", "wraparound-composite-deck", 5),
  },
  {
    slug: "built-in-storage",
    service: "cabinets",
    title: "Custom built-in cabinets",
    location: "Greater Philadelphia",
    photos: jobPhotos("cabinets", "built-in-storage", 2),
    captions: {
      "/images/projects/cabinets/built-in-storage/photo-1.jpg":
        "Built from scratch by our team — cabinets, shiplap, and a lift-top storage bench.",
    },
  },
  {
    slug: "marble-attic-bath",
    service: "bathrooms",
    title: "Marble attic bath",
    location: "Greater Philadelphia",
    photos: jobPhotos("bathrooms", "marble-attic-bath", 7),
  },
  {
    slug: "gray-composite-porch",
    service: "decks",
    title: "Composite porch & steps",
    location: "Greater Philadelphia",
    photos: jobPhotos("decks", "gray-composite-porch", 3),
  },
  {
    slug: "charcoal-marble-bath",
    service: "bathrooms",
    title: "Charcoal marble bath",
    location: "Greater Philadelphia",
    photos: jobPhotos("bathrooms", "charcoal-marble-bath", 8),
  },
  {
    slug: "carrara-marble-master",
    service: "bathrooms",
    title: "Carrara marble master bath",
    location: "Greater Philadelphia",
    photos: jobPhotos("bathrooms", "carrara-marble-master", 10),
  },
];

/** All jobs for a service, in manifest order. */
export function jobsForService(slug: string): Job[] {
  return JOBS.filter((j) => j.service === slug);
}

/** Every bathroom photo, flattened across jobs (cover-first per job). */
const BATHROOM_PHOTOS = jobsForService("bathrooms").flatMap((j) => j.photos);

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
      "Decks and outdoor spaces framed straight, flashed right, and finished to handle the weather year after year.",
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
      "We walk the space, listen to what you want, and give you an honest read on budget and timeline. No pressure, no obligation.",
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
      "We walk every detail together. If something's not right, we fix it before we call the job done.",
  },
];

// NOTE: Testimonials were removed 2026-07-09 — the placeholder quotes were
// invented. When real customer quotes exist, re-add a TESTIMONIALS list and a
// section component to render it.
