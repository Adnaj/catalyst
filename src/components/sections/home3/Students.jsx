
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Students = () => {
  const sectionRef = useRef(null);
  const topMarqueeRef = useRef(null);
  const bottomMarqueeRef = useRef(null);

  const topImages = [
    "/assets/images/placements/Agna-P-P.webp",
    "/assets/images/placements/Anjana-Krishna.webp",
    "/assets/images/placements/Fadiya.webp",
    "/assets/images/placements/Fathima-Fidha.webp",
    "/assets/images/placements/Hamna-Abdul-Kamal.webp",
    
  ];

  const bottomImages = [
    "/assets/images/placements/MUHAMMED-SHAMIL.webp",
    "/assets/images/placements/Muhammed-Unais.webp",
    "/assets/images/placements/Thahira.webp",
    "/assets/images/placements/Vismaya.webp",
    "/assets/images/placements/Hamna-Abdul-Kamal.webp",
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const top = topMarqueeRef.current;
      const bottom = bottomMarqueeRef.current;

      // Top: Right -> Left
      gsap.to(top, {
        xPercent: -50,
        duration: 25,
        ease: "none",
        repeat: -1,
      });

      // Bottom: Left -> Right
      gsap.fromTo(
        bottom,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: 25,
          ease: "none",
          repeat: -1,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="tj-features-section section-gap fix"
    >
      <div className="container-fluid p-0">

        {/* Heading */}
        <div className="row">
          <div className="col-12">
            <div className="sec-heading sec-heading-center">
              <span
                className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                data-direction="top"
              >
                <i className="tji-subtitle-2"></i>
                {" success stories"}
              </span>

              <h2
                className="sec-title tj-fade-anim"
                data-delay=".3"
              >
                Discover our students success stories
              </h2>
            </div>
          </div>
        </div>

        {/* ================= TOP MARQUEE ================= */}
        <div className="students-marquee">
          <div
            ref={topMarqueeRef}
            className="students-marquee-track"
          >
            {[...topImages, ...topImages].map((image, index) => (
              <div className="student-image" key={`top-${index}`}>
                <img
                  src={image}
                  alt={`Student ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ================= BOTTOM MARQUEE ================= */}
        <div className="students-marquee">
          <div
            ref={bottomMarqueeRef}
            className="students-marquee-track"
          >
            {[...bottomImages, ...bottomImages].map((image, index) => (
              <div className="student-image" key={`bottom-${index}`}>
                <img
                  src={image}
                  alt={`Student ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Students;
