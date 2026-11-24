
import React from "react";

const Students = () => {
  const stories = [
    { type: "image", src: "/assets/images/placements/Agna-P-P.webp" },
    { type: "image", src: "/assets/images/placements/Anjana-Krishna.webp" },

    { type: "image", src: "/assets/images/placements/Fadiya.webp" },
    { type: "image", src: "/assets/images/placements/Fathima-Fidha.webp" },

    { type: "image", src: "/assets/images/placements/Hamna-Abdul-Kamal.webp" },
    { type: "image", src: "/assets/images/placements/MUHAMMED-SHAMIL.webp" },

    { type: "image", src: "/assets/images/placements/Muhammed-Unais.webp" },
    { type: "image", src: "/assets/images/placements/Thahira.webp" },
    { type: "image", src: "/assets/images/placements/Vismaya.webp" },
  ];

  return (
    <>
      <style>{`
      
        .tj-features-section .students-category-row {
          margin-top: 0px;
        }

        .tj-features-section .students-category-title {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          color: #fff;
          font-size: 27px;
          font-weight: 700;
          line-height: 1.4;
        }

        .tj-features-section .students-category-title::after {
          content: "";
          display: block;
          width: 100%;
          height: 3px;
          border-radius: 5px;
          background: #42C5E4;
          flex-shrink: 0;
        }

        .tj-features-section .accounting .students-category-title::after {
          background: #8179E8;
        }

        .tj-features-section .technology .students-category-title::after {
          background: #232350;
        }

        .tj-features-section .students-category-images {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          align-items: start;
        }
          .tj-features-section .students-category-videos {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            max-width: 1100px;
            margin: 0 auto;
          }

        .tj-features-section .students-category-images .student-image {
          position: relative;
          width: 100%;
          height: 250px;
          overflow: hidden;
          border-radius: 14px;
          
        }
       
          .tj-features-section iframe{
          width:100%;
          height:100%;
          }

        .tj-features-section .students-category-images .student-image img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .tj-features-section .students-category-images .student-image:hover img {
          transform: scale(1.05);
        }

        @media (min-width: 1400px) {
          .tj-features-section .students-category-images .student-image {
            height: 100%;
          }
          .tj-features-section .students-category-images .student-videos {
            height: 460px;
          }
        }

        @media (max-width: 991px) {
          .tj-features-section .students-category-images {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 15px;
          }

          .tj-features-section .students-category-images .student-image {
            height: 230px;
          }
        }

        @media (max-width: 575px) {
          .tj-features-section .students-category-row {
            padding: 0 15px;
            margin-top: 28px;
          }

          .tj-features-section .students-category-title {
            font-size: 19px;
            margin-bottom: 15px;
          }

          .tj-features-section .students-category-images {
            gap: 10px;
          }

          .tj-features-section .students-category-images .student-image {
            height: 180px;
            border-radius: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tj-features-section .students-category-images .student-image img {
            transition: none;
          }
        }
      `}</style>

      <section className="tj-features-section section-gap fix">
        <div className="container">

          {/* Heading - unchanged */}
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

          {/* Student Images and Instagram Videos */}
          <div className="students-category-row">
            <div className="students-category-images">

              {stories.map((story, index) => (
                <div className="student-image" key={index}>

                  {story.type === "instagram" ? (
                    <iframe
                      src={`https://www.instagram.com/reel/${story.src}/embed/`}
                      title={`Student Success Story ${index + 1}`}
                      loading="lazy"
                      allowFullScreen
                      scrolling="no"
                      frameBorder="0"
                    />
                  ) : (
                    <img
                      src={story.src}
                      alt="Student success story"
                      loading="lazy"
                    />
                  )}

                </div>
              ))}

            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Students;
