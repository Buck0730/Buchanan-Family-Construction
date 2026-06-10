import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/site";

const PHONE_DISPLAY = COMPANY.phoneDisplay;
const PHONE_E164 = COMPANY.phoneE164;
const EMAIL = COMPANY.email;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-steel bg-ink">
      {/* CTA band */}
      <div className="border-b border-steel">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 lg:flex-row lg:items-center lg:px-10">
          <h2 className="max-w-xl font-display text-4xl leading-none text-bone sm:text-5xl">
            Ready to build something <span className="text-hazard">solid?</span>
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
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-16 lg:grid-cols-4 lg:px-10">
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center bg-hazard font-display text-xl text-ink">
              B
            </span>
            <span className="font-display text-lg tracking-tight text-bone">
              Buchanan
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-fog">
            Family-owned home remodeling. Kitchens, bathrooms, decks,
            basements, and additions built with craft, grit, and a straight
            answer.
          </p>
        </div>

        <FooterCol
          title="Explore"
          links={[
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
            { href: "/projects", label: "Projects" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ]}
        />

        <FooterCol
          title="Services"
          links={[
            { href: "/services#kitchens", label: "Kitchens" },
            { href: "/services#bathrooms", label: "Bathrooms" },
            { href: "/services#decks", label: "Decks" },
            { href: "/services#basements", label: "Basements" },
            { href: "/services#additions", label: "Additions" },
          ]}
        />

        <div>
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-fog">
            Get in touch
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-bone">
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
          <p>PA HIC #PA000000 · Licensed &amp; Insured</p>
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
            <Link className="text-bone hover:text-hazard" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
