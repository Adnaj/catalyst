
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ArrowUpRight } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "/assets/images/gallery/gallery1.png",
    title: "Celebrating Success",
  },
  
  {
    id: 2,
    src: "/assets/images/gallery/gallery2.png",
    title: "Celebrating Success",
  },
  {
    id: 3,
    src: "/assets/images/gallery/gallery3.png",
    title: "Celebrating Success",
  },
  
  {
    id: 4,
    src: "/assets/images/gallery/gallery4.webp",
    title: "Celebrating Success",
  },
  {
    id: 5,
    src: "/assets/images/gallery/gallery5.webp",
    title: "Celebrating Success",
  },
  {
    id: 6,
    src: "/assets/images/gallery/gallery6.webp",
    title: "Student Activities",
  },
  {
    id: 7,
    src: "/assets/images/gallery/gallery7.webp",
    title: "Campus Moments",
  },
  {
    id: 8,
    src: "/assets/images/gallery/gallery9.webp",
    title: "Learning Together",
  },
  {
    id: 9,
    src: "/assets/images/gallery/gallery10.webp",
    title: "Life at Catalyst",
  },
];

const LifeAtCatalyst = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = galleryImages.map((item) => ({
    src: item.src,
    alt: item.title,
    title: item.title,
  }));

  const openGallery = (imageIndex) => {
    setIndex(imageIndex);
    setOpen(true);
  };

  return (
    <>
      <section className="life-catalyst-section section-gap fix">
        <div className="container">

          <div className="row">
            <div className="col-12">
              <div className="sec-heading sec-heading-center">

                <span
                  className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                  data-direction="top"
                >
                  <i className="tji-subtitle-2"></i>
                  Life at CatalystSkillHub
                </span>

                <h2
                  className="sec-title tj-fade-anim"
                  data-delay=".3"
                >
                  Experience Life Beyond the Classroom
                </h2>

              </div>
            </div>
          </div>

          <div className="life-gallery-grid">
            {galleryImages.map((item, imageIndex) => (
              <div
                className="life-gallery-item"
                key={item.id}
                onClick={() => openGallery(imageIndex)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openGallery(imageIndex);
                  }
                }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                />

               <div className="life-gallery-overlay">
  <span className="life-gallery-icon">
    <ArrowUpRight size={22} strokeWidth={2} />
  </span>
</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        on={{
          view: ({ index }) => setIndex(index),
        }}
        carousel={{
          finite: false,
        }}
        animation={{
          fade: 300,
        }}
        controller={{
          closeOnBackdropClick: true,
        }}
      />
    </>
  );
};

export default LifeAtCatalyst;
