// Generates on-brand industrial SVG placeholders for the project galleries and
// the hero. Run with: node scripts/gen-placeholders.mjs
// Swap these out for real photography later (same paths, .svg or .jpg).

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const COLORS = {
  ink: "#0a0a0a",
  concrete: "#1a1a1a",
  concrete2: "#161616",
  steel: "#2e2e2e",
  fog: "#9a9a9a",
  bone: "#f4f2ed",
  hazard: "#ff5c00",
};

const SERVICES = [
  { slug: "kitchens", prefix: "kitchen", label: "Kitchens", index: "01" },
  { slug: "bathrooms", prefix: "bathroom", label: "Bathrooms", index: "02" },
  { slug: "additions", prefix: "addition", label: "Additions", index: "03" },
];

function grid(w, h, step, color, opacity) {
  let lines = "";
  for (let x = step; x < w; x += step) {
    lines += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" />`;
  }
  for (let y = step; y < h; y += step) {
    lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" />`;
  }
  return `<g stroke="${color}" stroke-width="1" opacity="${opacity}">${lines}</g>`;
}

// A few abstract "construction" compositions, varied per photo number.
function composition(n, w, h) {
  const { steel, fog, bone, hazard } = COLORS;
  switch (n % 4) {
    case 1: // stacked cabinetry / shelving
      return `
        <rect x="${w * 0.12}" y="${h * 0.3}" width="${w * 0.32}" height="${h * 0.5}" fill="${steel}"/>
        <rect x="${w * 0.12}" y="${h * 0.3}" width="${w * 0.32}" height="${h * 0.16}" fill="${fog}" opacity="0.5"/>
        <rect x="${w * 0.5}" y="${h * 0.18}" width="${w * 0.36}" height="${h * 0.62}" fill="${COLORS.concrete}" stroke="${steel}" stroke-width="2"/>
        <line x1="${w * 0.5}" y1="${h * 0.49}" x2="${w * 0.86}" y2="${h * 0.49}" stroke="${steel}" stroke-width="2"/>
        <rect x="${w * 0.66}" y="${h * 0.42}" width="${w * 0.04}" height="${h * 0.06}" fill="${hazard}"/>`;
    case 2: // tile field
      return `
        <g opacity="0.85">${tileField(w, h)}</g>
        <rect x="${w * 0.62}" y="${h * 0.22}" width="${w * 0.26}" height="${h * 0.56}" fill="none" stroke="${hazard}" stroke-width="3"/>`;
    case 3: // framing / structure
      return `
        <g stroke="${steel}" stroke-width="10">
          <line x1="${w * 0.18}" y1="${h * 0.85}" x2="${w * 0.18}" y2="${h * 0.2}"/>
          <line x1="${w * 0.4}" y1="${h * 0.85}" x2="${w * 0.4}" y2="${h * 0.2}"/>
          <line x1="${w * 0.62}" y1="${h * 0.85}" x2="${w * 0.62}" y2="${h * 0.2}"/>
          <line x1="${w * 0.84}" y1="${h * 0.85}" x2="${w * 0.84}" y2="${h * 0.2}"/>
          <line x1="${w * 0.12}" y1="${h * 0.28}" x2="${w * 0.9}" y2="${h * 0.28}"/>
        </g>
        <polygon points="${w * 0.18},${h * 0.2} ${w * 0.51},${h * 0.08} ${w * 0.84},${h * 0.2}" fill="none" stroke="${hazard}" stroke-width="6"/>`;
    default: // counter + window
      return `
        <rect x="${w * 0.12}" y="${h * 0.6}" width="${w * 0.76}" height="${h * 0.08}" fill="${bone}" opacity="0.85"/>
        <rect x="${w * 0.12}" y="${h * 0.68}" width="${w * 0.76}" height="${h * 0.16}" fill="${steel}"/>
        <rect x="${w * 0.3}" y="${h * 0.2}" width="${w * 0.4}" height="${h * 0.3}" fill="${COLORS.ink}" stroke="${fog}" stroke-width="2"/>
        <line x1="${w * 0.5}" y1="${h * 0.2}" x2="${w * 0.5}" y2="${h * 0.5}" stroke="${fog}" stroke-width="2"/>
        <rect x="${w * 0.12}" y="${h * 0.6}" width="${w * 0.05}" height="${h * 0.24}" fill="${hazard}"/>`;
  }
}

function tileField(w, h) {
  let r = "";
  const cols = 8;
  const rows = 6;
  const tw = (w * 0.42) / cols;
  const th = (h * 0.56) / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const shade = (i + j) % 2 === 0 ? COLORS.steel : COLORS.concrete;
      r += `<rect x="${w * 0.12 + i * tw}" y="${h * 0.22 + j * th}" width="${tw - 2}" height="${th - 2}" fill="${shade}"/>`;
    }
  }
  return r;
}

function projectSvg({ label, index, n }) {
  const w = 1200;
  const h = 900;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${COLORS.concrete2}"/>
  ${grid(w, h, 60, COLORS.steel, 0.4)}
  ${composition(n, w, h)}
  <rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="${COLORS.steel}" stroke-width="2"/>
  <text x="48" y="120" font-family="Arial Black, Arial, sans-serif" font-size="120" fill="none" stroke="${COLORS.hazard}" stroke-width="2" opacity="0.9">${index}</text>
  <text x="50" y="${h - 60}" font-family="Arial Black, Arial, sans-serif" font-size="64" fill="${COLORS.bone}" letter-spacing="2">${label.toUpperCase()}</text>
  <text x="52" y="${h - 30}" font-family="Arial, sans-serif" font-size="20" fill="${COLORS.fog}" letter-spacing="6">BUCHANAN FAMILY CONSTRUCTION · ${n} / 4</text>
  <g fill="${COLORS.hazard}"><rect x="${w - 70}" y="40" width="30" height="6"/><rect x="${w - 46}" y="40" width="6" height="30"/></g>
</svg>`;
}

function heroSvg() {
  const w = 1920;
  const h = 1080;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${COLORS.concrete}"/>
      <stop offset="1" stop-color="${COLORS.ink}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  ${grid(w, h, 80, COLORS.steel, 0.35)}
  <g stroke="${COLORS.steel}" stroke-width="14" opacity="0.8">
    <line x1="300" y1="${h}" x2="300" y2="280"/>
    <line x1="680" y1="${h}" x2="680" y2="180"/>
    <line x1="1060" y1="${h}" x2="1060" y2="280"/>
    <line x1="1440" y1="${h}" x2="1440" y2="180"/>
    <line x1="220" y1="300" x2="1520" y2="300"/>
  </g>
  <polygon points="680,180 1060,80 1440,180" fill="none" stroke="${COLORS.hazard}" stroke-width="10" opacity="0.9"/>
  <text x="120" y="900" font-family="Arial Black, Arial, sans-serif" font-size="240" fill="none" stroke="${COLORS.steel}" stroke-width="2" opacity="0.5">BUILD</text>
  <g fill="${COLORS.hazard}"><rect x="${w - 120}" y="80" width="60" height="10"/><rect x="${w - 70}" y="80" width="10" height="60"/></g>
</svg>`;
}

async function main() {
  // Project galleries
  for (const service of SERVICES) {
    const dir = join(ROOT, "public", "images", "projects", service.slug);
    await mkdir(dir, { recursive: true });
    for (let n = 1; n <= 4; n++) {
      const svg = projectSvg({ label: service.label, index: service.index, n });
      await writeFile(join(dir, `${service.prefix}-${n}.svg`), svg, "utf8");
    }
  }

  // Hero
  const heroDir = join(ROOT, "public", "images");
  await mkdir(heroDir, { recursive: true });
  await writeFile(join(heroDir, "hero.svg"), heroSvg(), "utf8");

  console.log("✓ Generated hero + 12 project placeholders in public/images");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
