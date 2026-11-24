
import React from "react";

const StudentsVideos = () => {
  const videos = [
    "DaNKUk5gM_g",
    "DaS4lWKDLJZ",
    "DavJ0EtkwP6",
  ];

  return (
    <>
     <style>{`
      .students-video-section .students-category-row {
        margin-top: 0px;
      }

      .students-video-section .students-category-videos {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 18px;
        max-width: 1100px;
        margin: 0 auto;
      }

      .students-video-section .student-image {
        position: relative;
        width: 100%;
        height: 460px;
        overflow: hidden;
        border-radius: 14px;
      }

      .students-video-section iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }

      @media (max-width: 991px) {
        .students-video-section .students-category-videos {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
        }

        .students-video-section .student-image {
          height: 350px;
        }
      }

      @media (max-width: 575px) {
        .students-video-section .students-category-row {
          padding: 0 15px;
          margin-top: 28px;
        }

        .students-video-section .students-category-videos {
          grid-template-columns: 1fr;
          max-width: 340px;
          gap: 20px;
        }

        .students-video-section .student-image {
          height: 430px;
          border-radius: 10px;
        }
      }
    `}</style>
      <section className="course-tabs-wrap students-video-section section-gap fix">
        <div className="container">

          {/* Heading */}
          <div className="row">
            <div className="col-12">
              <div className="sec-heading sec-heading-center">
                <span
                  className="sec-subtitle sec-subtitle-3 tj-fade-anim"
                  data-direction="top"
                >
                  <i className="tji-subtitle-2"></i>
                  {" FROM OUR STUDENTS"}
                </span>

                <h2
                  className="sec-title tj-fade-anim"
                  data-delay=".3"
                >
                  Beyond Learning, <br /> Into Success
                </h2>
              </div>
            </div>
          </div>

          {/* Instagram Videos */}
          <div className="students-category-row">
            <div className="students-category-images students-category-videos">

              {videos.map((videoId, index) => (
                <div className="student-image student-videos" key={videoId}>
                  <iframe
                    src={`https://www.instagram.com/reel/${videoId}/embed/`}
                    title={`Student Success Video ${index + 1}`}
                    loading="lazy"
                    allowFullScreen
                    scrolling="no"
                    frameBorder="0"
                  />
                </div>
              ))}

            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default StudentsVideos;
