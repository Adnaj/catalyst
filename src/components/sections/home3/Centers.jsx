import React from "react";
import { Link } from "react-router-dom";
import { getCampus, campusPath } from "../../../data/campuses";

// Every Kerala district in display order.
// A district with a `slug` that exists in data/campuses.js is LIVE
// (linked + real centre count). Any other district shows "Coming Soon".
// To launch a district: add it to campuses.js and give it a `slug` here.
const districts = [
  { name: "Kasaragod", image: "/assets/images/cities/kasargod.jpg" },
  { name: "Kannur", slug: "kannur", image: "/assets/images/cities/kannur.jpg" },
  { name: "Wayanad", image: "/assets/images/cities/wayanad.jpg" },
  { name: "Kozhikode", slug: "kozhikode", image: "/assets/images/cities/kozhikode.jpg" },
  { name: "Malappuram", slug: "malappuram", image: "/assets/images/cities/malappuram.jpg" },
  { name: "Palakkad", image: "/assets/images/cities/palakkad.jpg" },
  { name: "Thrissur", slug: "thrissur", image: "/assets/images/cities/thrissur.jpg" },
  { name: "Ernakulam", slug: "ernakulam", image: "/assets/images/cities/ernakulam.jpg" },
  { name: "Idukki", image: "/assets/images/cities/kasargod.jpg" },
  { name: "Kottayam", image: "/assets/images/cities/KOTTAYAM.png" },
  { name: "Alappuzha", image: "/assets/images/cities/ALAPPUZHA.png" },
  { name: "Kollam", image: "/assets/images/cities/KOLLAM.png" },
  { name: "Thiruvananthapuram", image: "/assets/images/cities/THIRUVANANTHAPURAM.png" },
];

const cities = districts.map((d) => {
  const campus = d.slug ? getCampus(d.slug) : null;
  return campus
    ? {
        ...d,
        comingSoon: false,
        centres: campus.locations.length,
        link: campusPath(campus.slug),
      }
    : { ...d, comingSoon: true };
});

const Centres = () => {

  return (
    <section className="about-section-4 tj-centres-section tj-theme-bg section-gap-bottom fix">
      <style>{`
        .tj-centres-grid {
          margin-top: 48px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px 18px;
          
        }
          

        .tj-centre-item {
          display: flex;
          align-items: center;
          gap: 20px;
          text-decoration: none;
          color: inherit;
          min-width: 0;
          padding: 15px 8px;
          border-radius:15px;
                  }

        .tj-centre-item.is-soon {
          cursor: default;
        }

        a.tj-centre-item:hover,
        a.tj-centre-item:focus-visible {
        background-color: #ffffff;
        border-color: #313085;
        box-shadow: 0 8px 24px rgba(49, 48, 133, 0.08);
        }

        .tj-centre-item .tj-centre-img {
          flex: 0 0 84px;
          width: 84px;
          height: 84px;
          border-radius: 12px;
          overflow: hidden;
          background: #e9e9ef;
        }

        .tj-centre-item .tj-centre-img img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .tj-centre-item .tj-centre-name {
          margin: 0 0 8px;
          font-size: 20px;
          font-weight: 500;
          line-height: 1.2;
          color: #2b2b2b;
        }

        .tj-centre-item .tj-centre-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.3;
          color: #6a6a6d;
        }
          a.tj-centre-item:hover .tj-centre-meta{
          color: #313085;
          }

        .tj-centre-item .tj-centre-status {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 20px;
          background: rgba(66, 197, 228, 0.15);
          color: #313085;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }

        .tj-centre-item .tj-centre-arrow {
          width: 20px;
          height: 20px;
          flex: 0 0 20px;
          transition: transform 0.2s ease;
        }

        a.tj-centre-item:hover .tj-centre-arrow,
        a.tj-centre-item:focus-visible .tj-centre-arrow {
          transform: translate(2px, -2px);
        }

        .tj-centre-item:focus-visible {
          outline: 2px solid #313085;
          outline-offset: 6px;
          border-radius: 12px;
        }

        @media (max-width: 1199px) {
          .tj-centres-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 991px) {
          .tj-centres-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 36px 24px;
          }
        }

        @media (max-width: 575px) {
          .tj-centres-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .tj-centre-item .tj-centre-img {
            flex-basis: 72px;
            width: 72px;
            height: 72px;
          }

          .tj-centre-item .tj-centre-name {
            font-size: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tj-centre-item .tj-centre-arrow {
            transition: none;
          }
        }
      `}</style>

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="sec-heading sec-heading-center about-4-heading">
              <span
                className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                data-direction="top"
              >
                <i className="tji-subtitle-2"></i>
                {" Our centres "}
              </span>

              <h2 className="sec-title sec-title-2 tj-fade-anim">
                Explore Our Centres
              </h2>
            </div>
          </div>
        </div>

        <div className="tj-centres-grid">
          {cities.map((city) => {
            const body = (
              <>
                <div className="tj-centre-img">
                  <img
                    src={city.image}
                    alt={`${city.name} landmark`}
                    loading="lazy"
                  />
                </div>

                <div>
                  <h4 className="tj-centre-name">{city.name}</h4>

                  <div className="tj-centre-meta">
                    {city.comingSoon ? (
                      <span className="tj-centre-status">Coming Soon</span>
                    ) : (
                      <>
                        <span>
                          {city.centres}{" "}
                          {city.centres === 1 ? "Centre" : "Centres"}
                        </span>

                        <svg
                          className="tj-centre-arrow"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M3 17L17 3" />
                          <path d="M6 3h11v11" />
                        </svg>
                      </>
                    )}
                  </div>
                </div>
              </>
            );

            return city.comingSoon ? (
              <div
                className="tj-centre-item is-soon"
                key={city.name}
                aria-label={`${city.name}: coming soon`}
              >
                {body}
              </div>
            ) : (
              <Link
                className="tj-centre-item"
                to={city.link}
                key={city.name}
                aria-label={`${city.name}: ${city.centres} ${
                  city.centres === 1 ? "centre" : "centres"
                }`}
              >
                {body}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Centres;