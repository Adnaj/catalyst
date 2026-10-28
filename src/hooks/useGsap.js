import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { initGsapAnimations } from "../animations/gsapAnimations";

// Runs after the page (and images) are rendered, like the original on window "load".
export default function useGsap() {
  useEffect(() => {
    let cancelled = false;
    const start = () => !cancelled && initGsapAnimations();
    if (document.readyState === "complete") requestAnimationFrame(start);
    else window.addEventListener("load", start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
      ScrollSmoother.get()?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
