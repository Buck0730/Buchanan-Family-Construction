/* eslint-disable @next/next/no-img-element -- static logo asset */

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/site";

const PHONE_DISPLAY = COMPANY.phoneDisplay;
const PHONE_E164 = COMPANY.phoneE164;
const EMAIL = COMPANY.email;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-steel bg-mist">
      {/* CTA band */}
      <div className="border-b border-steel">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 lg:flex-row lg:items-center lg:px-10">
          <h2 className="max-w-xl font-display text-4xl leading-none text-ink sm:text-5xl">
            Got a project in <span className="text-hazard">mind?</span>
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact">Get a Quote</Button>
            <Button href={`tel:${PHONE_E164}`} variant="outline">
              {PHONE_DISPLAY}
            </Button>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-16 lg:grid-cols-3 lg:px-10">
        <div className="col-span-2 lg:col-span-1">
          <img
            src="/images/logo.png"
            alt="Buchanan Home Remodeling"
            className="h-32 w-auto"
            draggable={false}
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-fog">
            Honest quotes, clean job sites, and work we stand behind.
            Family-owned, based in Upper Darby, PA.
          </p>
        </div>

        <FooterCol
          title="Explore"
          links={[
            { href: "/", label: "Home" },
            { href: "/projects", label: "Work" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ]}
        />

        <div>
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-fog">
            Get in touch
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-ink">
            <li>
              <a className="hover:text-hazard" href={`tel:${PHONE_E164}`}>
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a className="hover:text-hazard" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </li>
            <li className="text-fog">Serving {COMPANY.area}</li>
            <li className="text-fog">Mon–Fri · 7am–6pm</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-steel">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs uppercase tracking-[0.16em] text-fog sm:flex-row lg:px-10">
          <p>© {year} {COMPANY.name}</p>
          <p>Licensed &amp; Insured</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-sm uppercase tracking-[0.2em] text-fog">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link className="text-ink hover:text-hazard" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
