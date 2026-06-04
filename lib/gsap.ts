// Central GSAP + ScrollTrigger registration so plugins are registered exactly
// once. Import { gsap, ScrollTrigger } from "@/lib/gsap" in client components.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
