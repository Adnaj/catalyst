import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { initGsapAnimations } from "../animations/gsapAnimations";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Runs after the page (and images) are rendered, like the original on window "load".
export default function useGsap() {
  useEffect(() => {
    let ctx;
    let raf;

    const start = () => {
      // Everything created inside the context (tweens, ScrollTriggers,
      // ScrollSmoother) is reverted together on cleanup.
      ctx = gsap.context(() => {
        initGsapAnimations();
      });
    };

    const onLoad = () => {
      raf = requestAnimationFrame(start);
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      ctx?.revert(); // kills smoother/triggers/tweens and restores inline styles
    };
  }, []);
}