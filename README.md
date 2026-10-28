# Edunex (index-3) – React

    npm install
    npm run dev      # http://localhost:5173
    npm run build

- `public/assets/` – original CSS, fonts, images (loaded from `index.html`, unchanged)
- `src/components/layout/` – shared: PageLayout, HamburgerMenu, MainMenu, MobileMenu; per-page `home2/`, `home3/` (Header, StickyHeader, Footer)
- `src/components/sections/home2|home3/` – one file per section
- `src/components/common/` – Preloader, BackToTop, PriceSwitcher
- `src/pages/Home3.jsx` (`/`), `src/pages/Home2.jsx` (`/home-2`) – compose sections; routes live in `src/App.jsx`
- `src/hooks/` – Swiper, sticky header/offcanvas, GSAP init
- `src/animations/gsapAnimations.js` – original GSAP code (ScrollSmoother, SplitText, ScrollTrigger)
- `src/data/navigation.js` + `src/services/http.js` – data/API layer starting point
