import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Marquee from "@/components/ui/Marquee";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee
        items={[
          "Kitchens",
          "Bathrooms",
          "Additions",
          "Licensed & Insured",
          "Family-Owned",
          "On Time",
          "On Budget",
        ]}
      />
      <Services />
      <Stats />
      <Projects />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
}
