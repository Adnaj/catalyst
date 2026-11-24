import { useEffect } from "react";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Same options as the original main.js. Add new sliders here.
const sliders = [
  {
  el: ".tj-testimonial-slider-3",
  options: {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 1000,
    autoplay: { delay: 3000 },
    navigation: { nextEl: ".slider-next-1", prevEl: ".slider-prev-1" },
  },
},
  {
    el: ".tj-course-slider",
    options: {
      slidesPerView: 1,
      spaceBetween: 15,
      loop: true,
      speed: 1000,
      autoplay: { delay: 3000 },
      navigation: { nextEl: ".slider-next-1", prevEl: ".slider-prev-1" },
      pagination: { el: ".course-pagination-1", clickable: true },
      breakpoints: {
        768: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 3, spaceBetween: 20 },
        1200: { slidesPerView: 3, spaceBetween: 30 },
      },
    },
  },
  {
    el: ".tj-categories-slider",
    options: {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      speed: 1000,
      navigation: { nextEl: ".slider-next-cat", prevEl: ".slider-prev-cat" },
      pagination: { el: ".categories-pagination", clickable: true },
      breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1200: { slidesPerView: 4, spaceBetween: 30 },
      },
    },
  },
  // {
  //   el: ".tj-testimonial-slider-2",
  //   options: {
  //     slidesPerView: 1.15,
  //     spaceBetween: 15,
  //     loop: true,
  //     speed: 1000,
  //     loopAdditionalSlides: 2,
  //     autoplay: { delay: 3000 },
  //     navigation: { nextEl: ".slider-next-1", prevEl: ".slider-prev-1" },
  //     pagination: { el: ".testimonial-pagination-2", clickable: true },
  //     breakpoints: {
  //       576: { slidesPerView: 1.25, spaceBetween: 20, centeredSlides: true },
  //       1200: { slidesPerView: 2, spaceBetween: 30 },
  //     },
  //   },
  // },
];

export default function useSwipers() {
  useEffect(() => {
    // A slider marked data-no-auto-swiper is a React <Swiper> (its slides come from an API),
    // so it must not be started a second time here.
    const target = (s) => `${s.el}:not([data-no-auto-swiper])`;
    const instances = sliders
      .filter((s) => document.querySelector(target(s)))
      .map(
        (s) =>
          new Swiper(target(s), {
            modules: [Navigation, Pagination, Autoplay],
            ...s.options,
          }),
      );
    return () => instances.forEach((i) => i.destroy(true, true));
  }, []);
}