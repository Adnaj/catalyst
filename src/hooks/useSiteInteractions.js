import { useEffect } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Sticky header + hamburger/offcanvas (replaces the jQuery code in main.js).
export default function useSiteInteractions(alwaysSticky = false) {
  useEffect(() => {
    const $ = (s) => document.querySelector(s);

    // original main.js: [data-bg-image] / [data-mask-image] -> inline CSS
    document.querySelectorAll("[data-bg-image]").forEach((el) => {
      el.style.backgroundImage = `url(${el.dataset.bgImage})`;
    });
    document.querySelectorAll("[data-mask-image]").forEach((el) => {
      el.style.maskImage = `url(${el.dataset.maskImage})`;
    });

    const sticky = $(".header-sticky");
    const absolute = $(".header-absolute");
    if (alwaysSticky && absolute) absolute.style.display = "none"; // sticky header replaces it

    const onScroll = () =>
      sticky?.classList.toggle("sticky", alwaysSticky || window.scrollY >= 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = (open) => {
      $(".hamburger-area")?.classList.toggle("opened", open);
      $(".body-overlay")?.classList.toggle("opened", open);

      // Pause ScrollSmoother instead of using overflow:hidden on body,
      // which causes scroll jumps/flicker with a smooth scroller.
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.paused(open);
      else document.body.classList.toggle("overflow-hidden", open);
    };

    const onClick = (e) => {
      if (e.target.closest(".mobile_menu_bar")) {
        toggle(true);
        return;
      }

      const link = e.target.closest(".hamburger_menu a[href]:not(.mean-expand)");
      const isRealLink = link && link.getAttribute("href") !== "#";

      if (
        e.target.closest(".hamburger_close_btn") ||
        e.target.closest(".body-overlay") ||
        isRealLink
      ) {
        toggle(false);
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      toggle(false);
      if (absolute) absolute.style.display = "";
    };
  }, [alwaysSticky]);
}