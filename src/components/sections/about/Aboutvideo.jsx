import { useEffect, useState } from "react";

const VIDEO_ID = "MLpWrANjFbI";

const AboutVideo = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <section className="about-video-section section-gap-bottom fix">
        <div className="container">
          <div className="row flex-xl-row flex-column-reverse">
            <div className="col-12">
              <div className="about-video-img">
                <img src="/assets/images/about/video-img.webp" alt="" />
                <a
                  className="video-btn video-popup"
                  href={`https://www.youtube.com/watch?v=${VIDEO_ID}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                >
                  <span><i className="tji-play" /></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 100000,
            background: "rgba(0,0,0,.85)", display: "flex",
            alignItems: "center", justifyContent: "center", padding: 16,
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 1200, aspectRatio: "16 / 9", position: "relative" }}>
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setOpen(false)}
              style={{ position: "absolute", top: -36, right: 0, background: "none", border: 0, color: "#fff", fontSize: 28, lineHeight: 1, cursor: "pointer" }}
            >
              &times;
            </button>
            <iframe
              title="About video"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: 0 }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AboutVideo;