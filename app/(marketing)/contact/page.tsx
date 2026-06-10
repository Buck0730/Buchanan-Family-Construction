import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get a free, no-pressure remodeling estimate from Buchanan Home Remodeling.",
};

export default function ContactPage() {
  return (
    <section className="px-6 pb-24 pt-40 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
        {/* Left: pitch + details */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-hazard">
            Get a quote
          </p>
          <h1 className="mt-5 font-display text-6xl leading-[0.9] text-bone sm:text-7xl">
            Let&apos;s talk about your project.
          </h1>
          <p className="mt-6 max-w-md leading-relaxed text-fog">
            Fill out the form or call us directly. We&apos;ll get you a clear,
            itemized estimate — no pressure, no obligation.
          </p>

          <dl className="mt-12 space-y-px border border-steel">
            <ContactRow label="Call">
              <a
                href={`tel:${COMPANY.phoneE164}`}
                className="text-bone hover:text-hazard"
              >
                {COMPANY.phoneDisplay}
              </a>
            </ContactRow>
            <ContactRow label="Email">
              <a
                href={`mailto:${COMPANY.email}`}
                className="break-all text-bone hover:text-hazard"
              >
                {COMPANY.email}
              </a>
            </ContactRow>
            <ContactRow label="Area">
              <span className="text-bone">{COMPANY.area}</span>
            </ContactRow>
            <ContactRow label="Hours">
              <span className="text-bone">{COMPANY.hours}</span>
            </ContactRow>
          </dl>

          <p className="mt-8 max-w-md border-l-2 border-hazard pl-4 text-sm leading-relaxed text-fog">
            Call after hours? Our assistant answers, takes a detailed message,
            and makes sure the owner gets it — so your project never sits in a
            voicemail box.
          </p>
        </div>

        {/* Right: form */}
        <div className="border border-steel bg-concrete/40 p-8 lg:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-6 bg-concrete px-6 py-5">
      <dt className="w-16 shrink-0 text-xs uppercase tracking-[0.18em] text-fog">
        {label}
      </dt>
      <dd className="text-lg">{children}</dd>
    </div>
  );
}
