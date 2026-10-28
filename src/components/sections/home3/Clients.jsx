import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const logos = [
  '/assets/images/clients/d3.webp',
  '/assets/images/clients/kayool.webp',
  '/assets/images/clients/novizco.webp',
  '/assets/images/clients/softnotions.webp',
  '/assets/images/clients/summit.png',
  '/assets/images/clients/techgeum.webp',
  '/assets/images/clients/zecser.webp',
]


const SPEED = 60; // pixels per second, raise to go faster

const Clients = () => {
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let tween;

    const build = () => {
      const items = track.querySelectorAll(".tj-client-item");
      const half = items.length / 2;
      if (!half) return;

      // exact width of one full set of logos (includes any gap/padding)
      const distance = items[half].offsetLeft - items[0].offsetLeft;
      if (distance <= 0) return;

      const progress = tween ? tween.progress() : 0;
      tween?.kill();
      gsap.set(track, { x: 0 });

      tween = gsap.to(track, {
        x: -distance,
        duration: distance / SPEED,
        ease: "none",
        repeat: -1,
      });
      tween.progress(progress);
    };

    build();

    // logos load after mount and change the width, so rebuild when it changes
    const observer = new ResizeObserver(build);
    observer.observe(track);

    return () => {
      observer.disconnect();
      tween?.kill();
      gsap.set(track, { clearProps: "transform" });
    };
  }, []);

  return (
    <div className="tj-client-section tj-client-section-3 tj-fade-anim section-gap fix">
      <div className="bg-noise bg-noise-2"></div>
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col">
            <div className="tj-client-heading tj-fs-h2">
              {" Our Prominent Recruiters"}
            </div>

            <div
              className="tj-client-marquee-wrapper"
              style={{ overflow: "hidden" }}
            >
              <div
                ref={trackRef}
                className="tj-client-marquee tj-client-marquee-3"
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  alignItems: "center",
                  width: "max-content",
                  willChange: "transform",
                }}
              >
                {[...logos, ...logos].map((src, i) => (
                  <div
                    className="tj-client-item"
                    key={i}
                    style={{ flex: "0 0 auto" }}
                  >
                    <span>
                      <img src={src} alt="Client" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tj-client-blur-shape">
        <img src="/assets/images/shapes/h3-clients-shape.png" alt="" />
      </div>
    </div>
  );
};

export default Clients;