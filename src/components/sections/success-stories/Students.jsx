
import React from "react";

const Students = () => {
  const categories = [
    {
      name: "Marketing",
      className: "marketing",
      images: [
        "/assets/images/placements/Agna-P-P.webp",
        "/assets/images/placements/Anjana-Krishna.webp",
        "/assets/images/placements/Fadiya.webp",
        "/assets/images/placements/Fathima-Fidha.webp",
        "/assets/images/placements/Hamna-Abdul-Kamal.webp",
        "/assets/images/placements/MUHAMMED-SHAMIL.webp",
        "/assets/images/placements/Muhammed-Unais.webp",
        "/assets/images/placements/Thahira.webp",
        "/assets/images/placements/Vismaya.webp",
        "/assets/images/placements/Hamna-Abdul-Kamal.webp",
      ],
    },
    {
      name: "Accounting",
      className: "accounting",
      images: [
        "/assets/images/placements/Agna-P-P.webp",
        "/assets/images/placements/Anjana-Krishna.webp",
        "/assets/images/placements/Fadiya.webp",
        "/assets/images/placements/Fathima-Fidha.webp",
        "/assets/images/placements/Hamna-Abdul-Kamal.webp",
        "/assets/images/placements/MUHAMMED-SHAMIL.webp",
        "/assets/images/placements/Muhammed-Unais.webp",
        "/assets/images/placements/Thahira.webp",
        "/assets/images/placements/Vismaya.webp",
        "/assets/images/placements/Hamna-Abdul-Kamal.webp",
      ],
    },
    {
      name: "Technology",
      className: "technology",
      images: [
        "/assets/images/placements/Agna-P-P.webp",
        "/assets/images/placements/Anjana-Krishna.webp",
        "/assets/images/placements/Fadiya.webp",
        "/assets/images/placements/Fathima-Fidha.webp",
        "/assets/images/placements/Hamna-Abdul-Kamal.webp",
        "/assets/images/placements/MUHAMMED-SHAMIL.webp",
        "/assets/images/placements/Muhammed-Unais.webp",
        "/assets/images/placements/Thahira.webp",
        "/assets/images/placements/Vismaya.webp",
        "/assets/images/placements/Hamna-Abdul-Kamal.webp",
      ],
    },
  ];

  return (
    <>
      <style>{`
        .tj-features-section .students-category-row {
          margin-top: 35px;
          padding: 0 30px;
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

        .tj-features-section .students-category-images .student-image {
          position: relative;
          width: 100%;
          height: 250px;
          overflow: hidden;
          border-radius: 14px;
          background: #f3f3f8;
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
        <div className="container-fluid p-0">
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

          {/* Marketing */}
          {categories.map((category) => (
            <div
              className={`students-category-row ${category.className}`}
              key={category.name}
            >
              <h3 className="students-category-title">
                {category.name}
              </h3>

              <div className="students-category-images">
                {category.images.map((image, index) => (
                  <div
                    className="student-image"
                    key={`${category.className}-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${category.name} student success story`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Students;
